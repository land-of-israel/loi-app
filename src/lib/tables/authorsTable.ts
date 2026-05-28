import { createDataTable } from "./createDataTable";

import type {AuthorRow} from "$lib/types"


export function createAuthorsTable(data: AuthorRow[]) {
  return createDataTable(data, (table, col) => [
        col({
            header: "Name",
            accessor: "name",
            plugins: { 
              style: {
                width: "w-6/12"
              }
            }
          }),
          col({
            header: "Works",
            accessor: "works",  
            plugins: {
              style: {
                width: "w-6/12"
              }
            }         
          }),
    ])
  }


