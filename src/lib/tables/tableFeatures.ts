import { tableFeatures, 
    rowSortingFeature, 
    createSortedRowModel,
    sortFn_alphanumeric, 
    sortFn_text,
    columnFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
  filterFn_inNumberRange,
   globalFilteringFeature,
 } from '@tanstack/svelte-table'

export const features = tableFeatures({
    rowSortingFeature, // enables sorting APIs and state
    sortedRowModel: createSortedRowModel(), // client-side sorting
    sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text
},
    columnFilteringFeature,
    filteredRowModel: createFilteredRowModel(), // if using client-side filtering
    filterFns: {
        includesString: filterFn_includesString,
        inNumberRange: filterFn_inNumberRange,    
    },
     globalFilteringFeature,
})