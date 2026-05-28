import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";

import { addTableFilter, addColumnFilters, addPagination, addSortBy } from "@humanspeak/svelte-headless-table/plugins";
import type {AuthorRow} from "$lib/types"
import { textFilter } from "./helpers";

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
    }), 
    sort: addSortBy(),
    colFilter: addColumnFilters(),
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
      header: "Name",
      accessor: "name",
      plugins: {
        colFilter: {
          fn: textFilter      
        }
      }
    }),
    table.column({
      header: "Works",
      accessor: "works",
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