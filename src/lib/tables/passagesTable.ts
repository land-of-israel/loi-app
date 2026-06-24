import { createDataTable } from "./createDataTable";
import type { PassageRow } from "$lib/types";

export function createPassagesTable(data: PassageRow[]) {
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
            header: "Work",
            accessor: "workTitle",  
            plugins: {
              style: {
                width: "w-2/12"
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
            header: "Genre",
            accessor: "genre",
            plugins: {
              style: {
                width: "w-1/12"
              }
            }
          }),

          col({
              header: "Text",
              accessor: "text",
              cell: ({ value }: {value: string }) => value.substring(0, 200) + "...",
              plugins: {
                style: {
                  width: "w-4/12",
                  align: "text-right"
                }
              }
            })
    ])
  }

