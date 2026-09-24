// here is how the columns for an Authors table look like
//  (matching the author row type)
import type { WorkRow } from "$lib/types";
import {features} from "$lib/tables/tableFeatures"
import type { ColumnDef } from '@tanstack/svelte-table'


const ColumnVisibility = {
    language: false,
    place: false
}


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
    meta: {
      mobileVisible: false
    }
  },
   {
    accessorKey: 'language',
    header: 'Language',
    meta: {
      mobileVisible: false
    }
  },
   {
    accessorKey: 'tpq',
    header: 'Date TPQ',
    filterFn: 'filterTpq',
    size: 60,
    meta: {
      mobileVisible: false
    }
  },

   {
    accessorKey: 'taq',
    header: 'Date TAQ',
    filterFn: 'filterTaq',
    meta: {
      mobileVisible: false
    }

  },
   {
    accessorKey: 'place',
    header: 'Place',
    enableSorting: true,
    meta: {
      mobileVisible: false
    }
  },
  {
    accessorKey: 'keywords',
    header: 'Keywords',
    enableSorting: true,
    meta: {
      mobileVisible: false
    }
  },
  {
    accessorKey: 'passages',
    header: 'Passages',
    enableSorting: true,
    meta: {
      mobileVisible: false
    }
    
  },
]satisfies ColumnDef<typeof features, WorkRow>[],}

