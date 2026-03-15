"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Eye,
  Loader,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface ITanTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: TTableActions<TData>;
  emptyMessage?: string;
  isLoading?: boolean;
  queryParams: {
    [key: string]: string | string[] | undefined;
  };
  queryString: string;
}

export default function TanTable<TData>({
  columns,
  data,
  emptyMessage,
  isLoading,
  actions,
  queryParams,
  queryString,
}: ITanTableProps<TData>) {
  const tableColumns: ColumnDef<TData>[] = actions
    ? [
        {
          id: "actions",
          header: "",
          cell: ({ row }) => {
            const rowData = row.original;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={"sm"}>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-3 w-44">
                  <DropdownMenuGroup>
                    {actions?.onView && (
                      <DropdownMenuItem
                        onClick={() => actions.onView?.(rowData)}
                      >
                        <Eye /> View
                      </DropdownMenuItem>
                    )}
                    {actions?.onEdit && (
                      <DropdownMenuItem
                        onClick={() => actions.onEdit?.(rowData)}
                      >
                        <Pencil /> Edit
                      </DropdownMenuItem>
                    )}
                    {actions?.onDelete && (
                      <DropdownMenuItem
                        onClick={() => actions.onDelete?.(rowData)}
                      >
                        <Trash2 /> Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
        ...columns,
      ]
    : columns;

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="p-5 space-y-5">
        <div className="border rounded-lg py-3">
          {isLoading ? (
            <div className="flex flex-col gap-1 items-center justify-center h-50">
              <Loader className="size-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                {getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {getRowModel().rows?.length === 0 ? (
                  <TableRow className="w-full">
                    <TableCell
                      colSpan={tableColumns?.length}
                      className="h-50 text-center space-y-1"
                    >
                      <Database className="h-10 w-10 mx-auto" />
                      <p className="text-lg font-semibold">No Data Found.</p>
                      <p className="text-muted-foreground">
                        Look like you don't have any data. Add some data to get
                        started.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size={"sm"}>
              <ArrowLeft />
            </Button>
            <div className="flex items-center gap-1 px-1 py-1">
              <Button variant="ghost" size={"sm"}>
                1
              </Button>
              <Button variant="ghost" size={"sm"}>
                2
              </Button>
              <Button variant="ghost" size={"sm"}>
                3
              </Button>
              <Button variant="ghost" size={"sm"}>
                4
              </Button>
              <Button variant="ghost" size={"sm"}>
                5
              </Button>
            </div>
            <Button variant="ghost" size={"sm"}>
              <ArrowRight />
            </Button>
          </div>
          <div className="text-muted-foreground">
            Showing{" "}
            <Badge variant={"outline"} className="px-3 font-semibold">
              {getRowModel().rows.length < 9
                ? `0${getRowModel().rows.length}`
                : getRowModel().rows.length}
            </Badge>{" "}
            of{" "}
            <Badge variant={"outline"} className="px-3 font-semibold">
              {data.length < 9 ? `0${data.length}` : data.length}
            </Badge>{" "}
            results
          </div>
        </div>
      </div>
    </>
  );
}
