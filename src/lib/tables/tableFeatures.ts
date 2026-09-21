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
   rowPaginationFeature,
  createPaginatedRowModel,
  columnVisibilityFeature,
  columnSizingFeature,
 } from '@tanstack/svelte-table'

//custon filter functions

const filterTaq = (
     row: { getValue: <T>(columnId: string) => T },
    columnId: string,
    filterValue: unknown
) => {
    const value = row.getValue<number>(columnId)
    const filter = Number(filterValue)

    if (Number.isNaN(filter)) return true

    return value <= filter
}

const filterTpq = (
    row: { getValue: <T>(columnId: string) => T },
    columnId: string,
    filterValue: unknown
) => {
    const value = row.getValue<number>(columnId)
    const filter = Number(filterValue)

    if (Number.isNaN(filter)) return true

    return value >= filter
}

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
        filterTaq,
        filterTpq, 
    },
     globalFilteringFeature,
     rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  columnVisibilityFeature,
  columnSizingFeature,
})

