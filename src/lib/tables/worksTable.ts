import { createDataTable } from "./createDataTable";
import type {WorkRow} from "$lib/types"

export function createWorksTable(data: WorkRow[]) {
  return createDataTable(data, (table, col) => [
        col({
            header: "Title",
            accessor: "title",
            plugins: { 
              style: {
                width: "md:min-w-80"
              }
            }
          }),
        col({
           header: "Author",
          accessor: "author",
         
        }),
         col({
           header: "Genre",
          accessor: "genre",
          plugins: {
             visibility: {
              hideOnMobile: true
            }
            }
        }),
         col({
          header: "Language",
            accessor: "language",
          plugins: {
             visibility: {
              initiallyHidden: true,
              hideOnMobile: true
            }
            }
        }),
        col({
          header: "Date TPQ",
            accessor: "tpq",
             cell: ({ value }: {value: string | undefined}) => value ?? "",
          plugins: {
            visibility: {
              hideOnMobile: true
            }
            }
        }),
        col({
          header: "Date TAQ",
            accessor: "taq",
             cell: ({ value } : {value: string | undefined}) => value ?? "",
         plugins: {
             visibility: {
              hideOnMobile: true
            }
            }
        }),
         col({
          header: "Place",
            accessor: "place",
          plugins: {
             visibility: {
              hideOnMobile: true
            }
            }
        }),
         col({
          header: "Keywords",
            accessor: "keywords",
          plugins: {
             visibility: {
              initiallyHidden: true,
              hideOnMobile: true
            }
            }
        }),
        col({
          header: "Passages",
          accessor: "passages",
         plugins: { 
              style: {
                width: "max-w-16"
              },
              visibility: {
              hideOnMobile: true
            }
            }
        }),
    ])
  }
