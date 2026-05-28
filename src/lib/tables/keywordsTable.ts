import { createDataTable } from "./createDataTable";
import type { KeywordRow } from "$lib/types";

export function createKeywordsTable(data: KeywordRow[]) {
  return createDataTable(data, (table, col) => [
        col({
            header: "Label",
            accessor: "label",
            plugins: { 
              style: {
                width: "w-1/2"
              }
            }
          }),
        col({
          header: "Passages",
          accessor: "passages",
          plugins: { 
            style: {
              width: "w-1/2"
            }
          }
        }),
    ])
  }

