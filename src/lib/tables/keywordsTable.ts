import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";
import type {KeywordRow} from "$lib/types"
import { addTableFilter, addPagination, addSortBy } from "@humanspeak/svelte-headless-table/plugins";

export function createKeywordsTable(data: KeywordRow[]) {
  const table = createTable(readable(data), {
    filter: addTableFilter({
        fn: ({ filterValue, value}) =>
            String(value)
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    }),
      page: addPagination({
              initialPageSize: 20
            }),
          sort: addSortBy()
  });
// create columns to access the values of each data item
  const columns = table.createColumns([
    table.column({
      header: "id",
      accessor: "id"
    }),
    table.column({
      header: "Label",
      accessor: "label"
    }),

    
  ]);

  return {
    table,
    columns
  };
}