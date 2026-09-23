import type { ColumnDef, ColumnVisibilityState } from '@tanstack/svelte-table'
import { createAtom } from '@tanstack/svelte-store'
import {features} from "$lib/tables/tableFeatures"

import type { KeywordRow } from "$lib/types";


const ColumnVisibility = createAtom<ColumnVisibilityState>({
   
})


export const keywordsTableConfig = {
  columnVisibility: ColumnVisibility,
  columns:  [
  {
    accessorKey: 'label',
    header: 'Label',
  },

  {
    accessorKey: 'passages',
    header: 'Passages',
  },
  
]satisfies ColumnDef<typeof features, KeywordRow>[],}


