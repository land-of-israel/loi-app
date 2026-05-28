import { createDataTable } from "./createDataTable";
import type {WorkRow} from "$lib/types"

export function createWorksTable(data: WorkRow[]) {
  return createDataTable(data, (table, col) => [
        col({
            header: "Title",
            accessor: "title",
            plugins: { 
              style: {
                width: "w-3/12"
              }
            }
          }),
        col({
           header: "Author",
          accessor: "author",
          plugins: { 
            style: {
              width: "w-2/12"
            }
          }
        }),
        col({
          header: "Date TPQ",
            accessor: "tpq",
             cell: ({ value }: {value: string | undefined}) => value ?? "",
          plugins: { 
            style: {
              width: "w-1/12"
            }
          }
        }),
        col({
          header: "Date TAQ",
            accessor: "taq",
             cell: ({ value } : {value: string | undefined}) => value ?? "",
          plugins: { 
            style: {
              width: "w-1/12"
            }
          }
        }),
         col({
          header: "Place",
            accessor: "place",
          plugins: { 
            style: {
              width: "w-3/12"
            }
          }
        }),
        col({
          header: "Passages",
          accessor: "passages",
          plugins: { 
            style: {
              width: "w-2/12"
            }
          }
        }),
    ])
  }
