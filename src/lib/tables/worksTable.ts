import { createTable } from "@humanspeak/svelte-headless-table";
import { readable } from "svelte/store";
import type {WorkRow} from "$lib/types"
import { addTableFilter, addColumnFilters, addPagination, addSortBy } from "@humanspeak/svelte-headless-table/plugins";

export function createWorksTable(data: WorkRow[]) {
  const table = createTable(readable(data), {
    filter: addTableFilter({
        fn: ({ filterValue, value}) =>
            String(value)
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    }),
    colfilter: addColumnFilters(),
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
        }
      }
    }),
    table.column({
      header: "Title",
      accessor: "title"
    }),

    table.column({
      header: "Author",
      accessor: "author"
    }),

    table.column({
      header: "Date TPQ",
      accessor: "tpq",
      cell: ({ value }) => value ?? "",
    }),

    table.column({
      header: "Date TAQ",
      accessor: "taq",
      cell: ({ value }) => value ?? "",
    }),
    
    table.column({
      header: "Place",
      accessor: "place"
    }),

    table.column({
      header: "Passages",
      accessor: "passages"
    }),
  ]);

  return {
    table,
    columns
  };
}