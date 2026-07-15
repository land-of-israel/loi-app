import { createDataTable } from "./createDataTable";
import type { PassageRow } from "$lib/types";

export function createPassagesTable(data: PassageRow[]) {
  return createDataTable(data, (table, col) => [
        col({
          id: "title",  
          header: "Title",
            accessor: "title",
            plugins: { 
              
            }
          }),
          col({
            id: "work",
            header: "Work",
            accessor: "workTitle",  
            plugins: {
             visibility: {
                  hideOnMobile: true
                }
            }         
          }),

          col({
            id: "author",
            header: "Author",
            accessor: "author",
            plugins: {
             visibility: {
                  hideOnMobile: true
                }
            }
          }),

           col({
            id: "genre",
            header: "Genre",
            accessor: "genre",
            plugins: {
             visibility: {
              hideOnMobile: true
            }
            }
          }),

          col({
            id: "text",
              header: "Text",
              accessor: "text",
              cell: ({ value }: {value: string }) => value.substring(0, 200) + "...",
              plugins: {
                style: {                  
                  align: "text-right"
                },
                visibility: {
                  hideOnMobile: true
                }
              }
            }),

           col({
            id: "language",
            header: "Language",
            accessor: "language",
            plugins: {
             visibility: {
              hideOnMobile: true,
              initiallyHidden: true
            }
            }
          }),
           col({
            id: "tpq",
            header: "Date TPQ",
            accessor: "tpq",
            plugins: {
             visibility: {
              hideOnMobile: true
            }
            }
          }),
           col({
            id: "passages-taq",
            header: "Date TAQ",
            accessor: "taq",
            plugins: {
             visibility: {
              hideOnMobile: true
            }
            }
          }),
           col({
            header: "Paralles",
            accessor: "parallels",
            plugins: {
             visibility: {
              initiallyHidden: true,
              hideOnMobile: true
            }
            }
          }),
          col({
            header: "Bible quotes",
            accessor: "bibl_quotes",
            plugins: {
             visibility: {
              hideOnMobile: true,
              initiallyHidden: true,
            }
            }
          }),
          col({
            header: "English",
            accessor: "translation_en",
            plugins: {
             visibility: {
              hideOnMobile: true,
              initiallyHidden: true,
            }
            }
          }),
          col({
            header: "German",
            accessor: "btranslation_de",
            plugins: {
             visibility: {
              hideOnMobile: true,
              initiallyHidden: true,
            }
            }
          })
    ])
  }

