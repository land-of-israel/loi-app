import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";
import type {PassageRow} from "$lib/types"
import { addTableFilter, addPagination, addSortBy } from "@humanspeak/svelte-headless-table/plugins";

export function createPassagesTable(data: PassageRow[]) {
  const table = createTable(readable(data), {
    // plugin register
    filter: addTableFilter({
        fn: ({ filterValue, value}) =>
            String(value)
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    }),
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
      plugins: 
        {sort: {
          disable: true
        }}    
    }),
    table.column({
      header: "Title",
      accessor: "title",
     
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