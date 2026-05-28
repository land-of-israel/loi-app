import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";
import type {KeywordRow} from "$lib/types"
import { addTableFilter, addPagination, addColumnFilters, addSortBy } from "@humanspeak/svelte-headless-table/plugins";
import { textFilter } from "./helpers";


export function createKeywordsTable(data: KeywordRow[]) {
  const table = createTable(readable(data), {
    filter: addTableFilter({
        fn: ({ filterValue, value}) =>
            String(value)
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    }),
    colFilter: addColumnFilters(),
      page: addPagination({
              initialPageSize: 20
            }),
          sort: addSortBy()
  });
// create columns to access the values of each data item
  const columns = table.createColumns([
    table.column({
      header: "id",
      accessor: "id",
      plugins: {
        sort: {
          disable: true
        },
        colFilter: {
          fn: textFilter
        }
      }
    }),
    table.column({
      header: "Label",
      accessor: "label",
      plugins: {        
        colFilter: {
          fn: textFilter
        }
      }
    }),

    
  ]);

  return {
    table,
    columns
  };
}