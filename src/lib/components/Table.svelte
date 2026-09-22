<script lang="ts" generics="TData extends RowData  & { loi_id: string | number }">
// use generic data type TData satisfying the Rowdata type of tanstack
// so the table remain generic and can accept any data (authros, passages etc.)
import { goto } from "$app/navigation";
import{ resolve} from "$app/paths"  
import {Button} from "$lib/components/ui/button"
import {
    SvelteURLSearchParams
  } from 'svelte/reactivity';
import type { ColumnDef, RowData, ColumnVisibilityState } from '@tanstack/svelte-table'
import {
    createTable,
    FlexRender,
  } from '@tanstack/svelte-table'
import type { Atom } from '@tanstack/svelte-store'
import {features} from "$lib/tables/tableFeatures"


import ArrowDonwUp from '@lucide/svelte/icons/arrow-down-up';
import ArrowUp from '@lucide/svelte/icons/arrow-up-narrow-wide';
import ArrowDown from '@lucide/svelte/icons/arrow-down-wide-narrow';
import * as DropdownMenu from "$lib/components/ui/dropdown-menu"

   type Props = {
      data: TData[]
      columns: ColumnDef<typeof features, TData>[]
      basePath: string
      title: string
       columnVisibility: Atom<ColumnVisibilityState>
    }

    let {
        data,
        columns,
        columnVisibility,
        basePath,
        title
    }: Props = $props()

    let filterValue = $state('')
   

    function setGlobalFilter(value: string) {
        table.setGlobalFilter(value)
        }

    // 5. Create the table instance
    const table = createTable({
        features,
        columns,
        defaultColumn: {
          size: 80, // starting column size
          minSize: 50, // enforced during column resizing
          maxSize: 500, // enforced during column resizing
        },

       atoms: {
          get columnVisibility() {
            return columnVisibility
          },
        },

        globalFilterFn: 'includesString',

        get data() {
          return data
        }
      })

// read tanstack atoms for building the URL
const unsubscribeSorting = table.atoms.sorting.subscribe(() => {
  updateUrl()
})

const unsubscribeFilters = table.atoms.columnFilters.subscribe(() => {
  updateUrl()
})

const unsubscribeGlobalFilter = table.atoms.globalFilter.subscribe(() => {
  updateUrl()
})

const unsubscribePagination = table.atoms.pagination.subscribe(() => {
  updateUrl()
})

async function updateUrl() {
  const sorting = table.atoms.sorting.get() 
  const filters = table.atoms.columnFilters.get()
  const globalFilter = table.atoms.globalFilter.get()
  const pagination = table.atoms.pagination.get()

  console.log("params:", filters)
  // build URL 

    const params = new SvelteURLSearchParams()
   if (sorting.length > 0) {
    params.set('sort', sorting[0].id)
    params.set('dir', sorting[0].desc ? 'desc' : 'asc')
  }
  if (filters.length) {
   for (const filter of filters) {
      params.set(`filter_${filter.id}`, String(filter.value))
    }
  }
  if(globalFilter) {
    console.log(globalFilter)
    params.set('filter', globalFilter)
  }
 //pagination is always present
  params.set('pageIndex', pagination.pageIndex.toString())
  params.set('pageSize', pagination.pageSize.toString())

  console.log('params:', params.toString())

  await goto(`?${params.toString()}`, {
  replaceState: true,
  noScroll: true,
  keepFocus: true,
})
}

</script>
<div class="grid gap-4 py-3 md:my-10 max-w-full mx-2 xl:max-w-4/6 xl:mx-auto">
<h1 class="text-2xl font-semibold md:text-3xl">{title}</h1>
<div class="flex justify-between">
<input
  type="text"
  class="border rounded-md p-2"
  placeholder="Filter ..."
  value={filterValue}
  oninput={(event) => {
    filterValue = event.currentTarget.value
    setGlobalFilter(filterValue)
  }}
/>
<!-- hide show columns -->
  <DropdownMenu.Root>
       <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">
            show | hide columns
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
       <DropdownMenu.Content class="w-56" align="start">
        {#each table.getAllColumns() as column (column.id)}
        <DropdownMenu.CheckboxItem
          checked={column.getIsVisible()}
          disabled={!column.getCanHide()}
          onCheckedChange={(checked) => column.toggleVisibility(checked)}
        >
          {column.id}
        </DropdownMenu.CheckboxItem>
        
      {/each}
      
       </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>
<!-- 6. Render markup from the table instance APIs -->
<table class="w-full table-fixed overflow-scroll">
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                <tr class="bg-brand-500 text-text">         

        {#each headerGroup.headers as header (header.id)}
          <th
          style:width="{header.getSize()}px"
             class="{header.column.columnDef.meta?.textAlign} p-1 md:py-2 md:px-3 text-white text-base font-medium"                  
                >
            {#if !header.isPlaceholder}
              <button
                class="cursor-pointer rounded-md flex gap-2 py-1 *:focus:outline-2 focus:outline-accent"
                disabled={!header.column.getCanSort()}
                onclick={header.column.getToggleSortingHandler()}
              >
                <FlexRender {header} />
                {#if header.column.getIsSorted() === 'asc'}
                  <ArrowDown/>
                {:else if header.column.getIsSorted() === 'desc'}
                   <ArrowUp  />
                {:else}
                    <ArrowDonwUp  />
                {/if}
              </button>
              {#if header.column.getCanFilter()}
              <input
                type="text"
                class="border rounded-md bg-brand-100 text-brand-800 px-2 text-sm w-full"
                placeholder="Filter ..."
                oninput={(event) =>
                  header.column.setFilterValue(
                    (event.currentTarget as HTMLInputElement).value
                  )
                }
              />
              {/if}
            {/if}
          </th>
        {/each}
      </tr>
    {/each}
  </thead>
  <tbody>
    {#each table.getRowModel().rows as row (row.id)}
      <tr class="odd:bg-white even:bg-brand-100 hover:bg-brand-300 cursor-pointer text-sm font-light"
          onclick={() => goto(resolve(`/${basePath}/${row.original.loi_id}`, {}))}>
        {#each row.getVisibleCells() as cell (cell.id)}
          <td class="{cell.column.columnDef.meta?.textAlign} py-2 px-4 border border-r-neutral-300"
          style:width="{cell.column.getSize()}px"
           dir={cell.column.columnDef.meta?.dir}>
            <div class="max-h-48 overflow-auto">
              <FlexRender {cell} />
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
<div class="grid md:flex justify-between gap-1 justify-items-end">
  <!-- page size selection -->
   <div class="text-sm">
        <Button variant="secondary" onclick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>First</Button>
        <Button variant="secondary" onclick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous Page</Button>
      <span class="px-2 font-semibold">
          Page {table.atoms.pagination.get().pageIndex + 1} of {table.atoms.pagination.get().pageSize}
      </span>
        <Button variant="secondary" onclick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next Page</Button>
        <Button variant="secondary" onclick={() => table.lastPage()} disabled={!table.getCanLastPage()}>Last</Button>
  </div>
   
  <select
    value={table.atoms.pagination.get().pageSize}
    onchange={(e) => table.setPageSize(Number((e.target as HTMLSelectElement).value))}
    class="rounded-md border *:focus:outline-2 focus:outline-offset-2 focus:outline-accent px-1"
  >
    {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
      <option value={pageSize}>Show {pageSize}</option>
    {/each}
  </select>
</div>
</div>