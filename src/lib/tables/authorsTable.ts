import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";

import { addTableFilter, addPagination } from "@humanspeak/svelte-headless-table/plugins";
import type {AuthorRow} from "$lib/types"

export function createAuthorsTable(data : AuthorRow[]) {
  const table = createTable(readable(data), {
    filter: addTableFilter({
        fn: ({ filterValue, value}) =>
            String(value)
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    }),
    page: addPagination({
      initialPageSize: 20
    })
  });
// create columns to access the values of each data item
  const columns = table.createColumns([
    table.column({
      header: "id",
      accessor: "id"
    }),
    table.column({
      header: "Name",
      accessor: "name"
    }),
    table.column({
      header: "Works",
      accessor: "works"
    }),

    
  ]);

  return {
    table,
    columns
  };
}