import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { api } from "~/utils/api";
import { useMemo } from "react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { CheckIcon, XMarkIcon, Bars2Icon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
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
  const utils = api.useContext();
  const mutation = api.chess.saveGamesToPlayer.useMutation({
    onSuccess: async () => {
      toast.success("Downloaded games from Chess.com!");
      await utils.chess.getGamesFromChessUser.invalidate();
    },
  });
  const handleDownload = () => {
    mutation.mutate();
  };

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
            return <Bars2Icon className="h-8 w-8 rounded-lg bg-gray-400 p-2" />;
          case "won":
            return (
              <CheckIcon className="h-8 w-8 rounded-lg bg-emerald-400 p-2" />
            );
          case "lost":
            return <XMarkIcon className="h-8 w-8 rounded-lg bg-rose-400 p-2" />;
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
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex w-full">
        <button
          onClick={handleDownload}
          className="text-md flex w-40 flex-row items-center justify-start gap-2 rounded-md border-b-8 border-b-cyan-900 bg-cyan-700 p-2 font-semibold text-cyan-100 active:border"
        >
          Update Games
        </button>
      </div>
      {/*!TODO - Restrict height and do pagination*/}
      <div className="overflow-hidden rounded-xl border shadow-lg">
        <table className="text-md table-auto text-left">
          <thead className=" bg-cyan-400 text-sm uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="divide-x divide-gray-600">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-8 py-2">
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
          <tbody className="divide-y divide-dashed divide-gray-300">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-8 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center gap-2">
          <button
            className="rounded border p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 rounded border p-1"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div />
      </div>
    </>
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
