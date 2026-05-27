import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";
import type {WorkRow} from "$lib/types"
import { addTableFilter, addColumnFilters, addPagination, addSortBy } from "@humanspeak/svelte-headless-table/plugins";
import { textFilter } from "./helpers";

  

export function createWorksTable(data: WorkRow[]) {
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
      header: "Title",
      accessor: "title",
     plugins: {
        colFilter: {
          fn: textFilter      
        }
      }
    }),

    table.column({
      header: "Author",
      accessor: "author",
       plugins: {
        colFilter: {
          fn: textFilter      
        }
      }
    }),

    table.column({
      header: "Date TPQ",
      accessor: "tpq",
      cell: ({ value }) => value ?? "",
      plugins: {
        colFilter: {
          fn: textFilter      
        }
      }
    }),

    table.column({
      header: "Date TAQ",
      accessor: "taq",
      cell: ({ value }) => value ?? "",
      plugins: {
        colFilter: {
          fn: textFilter      
        }
      }
    }),
    
    table.column({
      header: "Place",
      accessor: "place",
      plugins: {
        colFilter: {
          fn: textFilter      
        }
      }
     
    }),

    table.column({
      header: "Passages",
      accessor: "passages",
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
