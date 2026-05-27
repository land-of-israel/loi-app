import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";
import type {PassageRow} from "$lib/types"
import { addTableFilter, addPagination, addSortBy, addColumnFilters } from "@humanspeak/svelte-headless-table/plugins";
import { textFilter } from "./helpers";

export function createPassagesTable(data: PassageRow[]) {
  const table = createTable(readable(data), {
    // plugin register
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
    sort: addSortBy({      
      initialSortKeys: [
        { id: "title",
          order: "asc"
        }
      ],
    })
  });
// create columns to access the values of each data item
  const columns = table.createColumns([
    table.column({
      header: "id",
      accessor: "id",
      plugins: {
        
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
      header: "Work",
      accessor: "workTitle",
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
    })
  ]);

  return {
    table,
    columns
  };
}