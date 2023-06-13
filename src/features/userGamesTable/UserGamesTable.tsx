import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { api } from "~/utils/api";
import { useMemo } from "react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { CheckIcon, XMarkIcon, Bars2Icon } from "@heroicons/react/24/outline";
type ChessRouterOutput = inferRouterOutputs<AppRouter>;
type tRPCQueryGames = ChessRouterOutput["chess"]["getGamesFromChessUser"];

type UserQueriedGames = {
  url: string;
  rated: boolean | null;
  timeClass: string | null;
  timeControl: string | null;
  gameResult: string | null;
  blackUsername: string | null;
  whiteUsername: string | null;
};

export default function UserGamesTable() {
  const { user } = useUser();
  const { data } = api.chess.getGamesFromChessUser.useQuery(undefined, {
    placeholderData: [
      {
        url: "https://www.chess.com/game/live/79386659577",
        rated: true,
        timeClass: "rapid",
        timeControl: "600",
        gameResult: "white-win",
        players: [
          {
            username: "promking2000",
            rating: "1",
          },
        ],
        blackUsername: "promking2000",
        whiteUsername: "Magnus",
      },
    ],
  });

  const tableData = useMemo(() => modifyTRPCQueryData(data), [data]);

  const columnHelper = createColumnHelper<UserQueriedGames>();
  const columns = [
    columnHelper.accessor("timeClass", {
      header: "time",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("url", {
      header: "url",
      cell: (info) => <Link href={info.getValue()}> Chess.com Link </Link>,
    }),
    columnHelper.accessor("gameResult", {
      cell: (row) => {
        const result = determineGameResult(
          row.row.getValue("opponent"),
          row.row.original.whiteUsername!,
          row.row.getValue("gameResult")
        );
        switch (result) {
          case "draw":
            return <Bars2Icon className="h-6 w-6" />;
          case "won":
            return <CheckIcon className="h-6 w-6" />;
          case "lost":
            return <XMarkIcon className="h-6 w-6" />;
        }
      },
      header: "result",
    }),
    columnHelper.accessor(
      (row) =>
        row.blackUsername?.toLowerCase() === user?.publicMetadata.chessUsername
          ? row.whiteUsername
          : row.blackUsername,
      {
        header: "against",
        id: "opponent",
      }
    ),
  ];
  const table = useReactTable({
    data: tableData!,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div />
    </div>
  );
}

const determineGameResult = (
  opponentUsername: string,
  whiteUsername: string,
  gameResult: string
) => {
  if (gameResult === "draw") return "draw";
  const opponentColor = opponentUsername === whiteUsername ? "white" : "black";
  if (opponentColor === "white" && gameResult === "white-win") return "lost";
  if (opponentColor === "black" && gameResult === "black-win") return "lost";
  return "won";
};

const modifyTRPCQueryData = (
  trpcData: tRPCQueryGames
): UserQueriedGames[] | undefined => {
  if (trpcData) {
    const modifiedGamesData = trpcData.map(({ players: _, ...game }) => ({
      ...game,
    }));
    return modifiedGamesData;
  }
  return undefined;
};
