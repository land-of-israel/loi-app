// here is how the columns for an Authors table look like
//  (matching the author row type)


import type { ColumnDef } from '@tanstack/svelte-table'
import type {AuthorRow} from "$lib/types"
import {features} from "$lib/tables/tableFeatures"


export const authorColumns: ColumnDef<typeof features, AuthorRow>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true
  },  

  {
    accessorKey: 'works',
    header: 'Works',
    enableSorting: true
  },

]