import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";

import { addTableFilter } from "@humanspeak/svelte-headless-table/plugins";

export function createPassagesTable(data) {
  const table = createTable(readable(data), {
    filter: addTableFilter({
        fn: ({ filterValue, value}) =>
            String(value)
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    }),
  });
// create columns to access the values of each data item
  const columns = table.createColumns([
    table.column({
      header: "id",
      accessor: "id"
    }),
    table.column({
      header: "Title",
      accessor: "title"
    }),

    table.column({
      header: "Work",
      accessor: "workTitle"
    }),

    table.column({
      header: "Author",
      accessor: "author"
    })
  ]);

  return {
    table,
    columns
  };
}