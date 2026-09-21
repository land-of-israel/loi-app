// here is how the columns for an Authors table look like
//  (matching the author row type)
import { createAtom } from '@tanstack/svelte-store'
import type { ColumnVisibilityState } from '@tanstack/svelte-table'


const ColumnVisibility = createAtom<ColumnVisibilityState>({
    
})


export const authorTableConfig = {
  columnVisibility: ColumnVisibility,
  columns:  [
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true
  },  

  {
    accessorKey: 'works',
    header: 'Works',
    enableSorting: true,
  },

]}