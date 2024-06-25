"use client";
import { ColumnType, useMutation, useStorage } from "@/app/liveblocks.config";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";
import { ReactSortable } from "react-sortablejs";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";

export default function Columns() {
  const columns = useStorage(
    (storage) => storage.columns.map((c) => ({ ...c })),
    shallow,
  );

  const updateColumns = useMutation(
    ({ storage }, columns: LiveObject<ColumnType>[]) => {
      storage.set("columns", new LiveList(columns));
    },
    [],
  );

  function setColumnsOrder(sortedColumns: ColumnType[]) {
    const newColumns: LiveObject<ColumnType>[] = [];

    sortedColumns.forEach((sortedColumn, newIndex) => {
      const newSortedColumn = { ...sortedColumn };
      newSortedColumn.index = newIndex;
      newColumns.push(new LiveObject(newSortedColumn));
    });
    updateColumns(newColumns);
  }

  if (!columns) {
    return null;
  }

  return (
    <div className="flex justify-between gap-1">
      <ReactSortable
        group={"column"}
        list={columns}
        ghostClass="opacity-40"
        className=" flex  flex-wrap gap-4"
        setList={(newState) => setColumnsOrder(newState)}
      >
        {columns.map((column) => (
          <Column key={column.id} {...column} />
        ))}
      </ReactSortable>
      <NewColumnForm />
    </div>
  );
}
