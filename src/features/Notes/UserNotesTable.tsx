import { LinkIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { type RouterOutputs, api } from "~/utils/api";
import ChessBoardComponent from "../ChessBoard/ChessBoard";
import { Popover } from "@headlessui/react";
type NotebookData = RouterOutputs["analysis"]["grabAllAnalysisNotes"][0];

export default function UserNotesTable() {
  const { data } = api.analysis.grabAllAnalysisNotes.useQuery(undefined, {
    placeholderData: {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Testing",
    },
  });

  const columnHelper = createColumnHelper<NotebookData>();
  const columns = [
    columnHelper.accessor("title", {
      header: "title",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("updatedAt", {
      header: "Last Updated",
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("id", {
      header: "Link",
      cell: (info) => {
        return (
          <Link href={`/notes/${info.getValue()}`}>
            <LinkIcon className="h-5 w-5" />
          </Link>
        );
      },
    }),
    columnHelper.accessor("position", {
      header: "Position",
      cell: (info) => {
        return (
          <Popover className="relative">
            <Popover.Button>
              <PuzzlePieceIcon className="h-10 w-10" />
            </Popover.Button>
            <Popover.Panel className="absolute z-10">
              <ChessBoardComponent
                chessBoardWidth={300}
                startingPosition={info.getValue()}
              />
            </Popover.Panel>
          </Popover>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: data!,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex w-full"></div>
      {/*!TODO - Restrict height and do pagination*/}
      <div className="w-fit max-w-lg overflow-hidden rounded-xl border shadow-lg">
        <table className="text-md table-auto text-left text-zinc-900">
          <thead className="bg-emerald-400 text-sm uppercase">
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
              <tr key={row.id} className="divide-x divide-dashed">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-8 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center gap-2 text-zinc-900">
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
              className="w-16 rounded border-2 border-emerald-400 bg-zinc-100 p-1"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="rounded border-2 border-emerald-400 bg-zinc-100 p-1"
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
