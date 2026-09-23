// here is how the columns for an Authors table look like
//  (matching the author row type)
import type { WorkRow } from "$lib/types";
import {features} from "$lib/tables/tableFeatures"
import { createAtom } from '@tanstack/svelte-store'
import type { ColumnDef, ColumnVisibilityState } from '@tanstack/svelte-table'


const ColumnVisibility = createAtom<ColumnVisibilityState>({
    language: false,
    place: false
})


export const workTableConfig = {
  columnVisibility: ColumnVisibility,
  columns:  [
  {
    accessorKey: 'title',
    header: 'Title',
  },

  {
    accessorKey: 'author',
    header: 'Author',
  },
   {
    accessorKey: 'genre',
    header: 'Genre',
  },
   {
    accessorKey: 'language',
    header: 'Language',
  },
   {
    accessorKey: 'tpq',
    header: 'Date TPQ',
    filterFn: 'filterTpq',
    size: 60
  },

   {
    accessorKey: 'taq',
    header: 'Date TAQ',
    filterFn: 'filterTaq'

  },
   {
    accessorKey: 'place',
    header: 'Place',
    enableSorting: true,
  },
  {
    accessorKey: 'keywords',
    header: 'Keywords',
    enableSorting: true,
  },
  {
    accessorKey: 'passages',
    header: 'Passages',
    enableSorting: true,
    
  },
]satisfies ColumnDef<typeof features, WorkRow>[],}

