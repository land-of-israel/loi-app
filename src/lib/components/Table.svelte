<script lang="ts" generics="TData extends RowData  & { loi_id: string | number }">
// use generic data type TData satisfying the Rowdata type of tanstack
// so the table remain generic and can accept any data (authros, passages etc.)
import { goto } from "$app/navigation";
import{ resolve} from "$app/paths"  
import { onMount } from 'svelte'

import {Button} from "$lib/components/ui/button"
import {
    SvelteURLSearchParams
  } from 'svelte/reactivity';
import type { ColumnDef, RowData, ColumnVisibilityState, PaginationState, SortingState, ColumnFiltersState } from '@tanstack/svelte-table'
import {
    createTable,
    FlexRender,
  } from '@tanstack/svelte-table'
import { createAtom } from '@tanstack/svelte-store'
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
      columnVisibility: ColumnVisibilityState
    }

    let {
        data,
        columns,
        basePath,
        title,
        columnVisibility
    }: Props = $props()

    


// tanstack atoms are read-only. To write atom we need external ones
  // Create stable external atoms for the individual state slices we want to
  // own. The table still creates internal base atoms for everything else.
    const sortingAtom = createAtom<SortingState>([])
    const columnVisibilityAtom = createAtom<ColumnVisibilityState>(columnVisibility)
    const colFilterAtom = createAtom<ColumnFiltersState>([])
    const filterAtom = createAtom<string>('')
    const paginationAtom = createAtom<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })
   

    // Create the table instance
    const table = createTable({
        features,
        autoResetPageIndex: false,
        columns,
        defaultColumn: {
          size: 80, // starting column size
          minSize: 50, // enforced during column resizing
          maxSize: 500, // enforced during column resizing
        },
        

       atoms: {
        columnFilters: colFilterAtom, //using here the external atoms we crated
        globalFilter: filterAtom,
        sorting: sortingAtom,
        pagination: paginationAtom,
        columnVisibility: columnVisibilityAtom,
        },        

        globalFilterFn: 'includesString',

        get data() {
          return data
        }
      })
// lifecycle initialization sequence: read URL -> set created atoms -> subscribe atoms use to update URL
    let isHydrating = true // guard flag
    onMount(() => {
     
    // 2. URL → atoms
        //read urls and set the atoms sort and filters
        const searchParams = new URLSearchParams(window.location.search)
        const sort = searchParams.get('sort')
        const dir = searchParams.get('dir')
        // if sort int he url params, set the external atom we created above to that value
        if (sort) {
          sortingAtom.set([
            {
              id: sort,
              desc: dir === 'desc',
            },
          ])
        }
        
        const filter = searchParams.get('filter')
        if (filter) {
          filterAtom.set(filter)
        }

        const columnFilters: ColumnFiltersState = []
        for ( const [key, value] of searchParams.entries()) {
          if (key.startsWith('filter_')) {
            columnFilters.push({
              id: key.replace('filter_', ''),
              value
            })
          }
        }
        colFilterAtom.set(columnFilters)

        const pageIndex = searchParams.get('pageIndex')
        const pageSize = searchParams.get('pageSize')
        if (pageIndex || pageSize) {
          paginationAtom.set({
            pageIndex: pageIndex ? Number(pageIndex) : 0,
            pageSize: pageSize ? Number(pageSize) : 10,
          })
        }

    // hydration finished
      isHydrating = false

      // Reset pageIndex whenever sorting/filtering changes AFTER hydration
      const resetPageOnFilterChange = () => {
        if (isHydrating) return
        paginationAtom.set((p) => ({ ...p, pageIndex: 0 }))
      }

      const resetSubscriptions = [
        sortingAtom.subscribe(resetPageOnFilterChange),
        colFilterAtom.subscribe(resetPageOnFilterChange),
        filterAtom.subscribe(resetPageOnFilterChange),
      ]
        

// 3. atoms -> URL
// make persistent URL based on filters sorting pagination
// read / subscirbe to tanstack atoms for building the URL

        const subscriptions = [
            table.atoms.sorting,
            table.atoms.columnFilters,
            table.atoms.globalFilter,
            table.atoms.pagination
        ].map((atom) => atom.subscribe(updateUrl))
       
       
       return () => {
          subscriptions.forEach((s) => s.unsubscribe())
          resetSubscriptions.forEach((s) => s.unsubscribe())
        }

        function updateUrl() {
          const sorting = table.atoms.sorting.get() 
          const filters = table.atoms.columnFilters.get()
          const globalFilter = table.atoms.globalFilter.get()
          const pagination = table.atoms.pagination.get()

          // build URL 

          const params = new SvelteURLSearchParams()
          if (sorting.length > 0) {
            params.set('sort', sorting[0].id)
            params.set('dir', sorting[0].desc ? 'desc' : 'asc')
          }
        
          for (const filter of filters) {
              params.set(`filter_${filter.id}`, String(filter.value))
            }

          if(globalFilter) {
            params.set('filter', globalFilter)
          }
        //pagination is always present
          params.set('pageIndex', pagination.pageIndex.toString())
          params.set('pageSize', pagination.pageSize.toString())

          return goto(`?${params.toString()}`, {
          replaceState: true,
          noScroll: true,
          keepFocus: true,
        })
        }
    }
  )



</script>
<div class="grid gap-4 py-3 md:my-10 max-w-full mx-2 xl:max-w-4/6 xl:mx-auto">
<h1 class="text-2xl font-semibold md:text-3xl">{title}</h1>
<div class="grid md:flex md:justify-between gap-1 md:gap-0">
  <label class="w-full md:w-64">
    <span class="sr-only">Global Filter</span>
    <input
      name="global-filter"
      type="text"
      class="w-full border rounded-md p-2 *:focus:outline-2 focus:outline-accent"
      placeholder="Filter ..."
      value={table.atoms.globalFilter.get() ?? ''}
      oninput={(event) =>
            table.setGlobalFilter(
                (event.currentTarget as HTMLInputElement).value
            )
        }
      />
  </label>
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
<table class="w-full table-fixed ">
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                <tr class="bg-brand-500 text-text">         

        {#each headerGroup.headers as header (header.id)}
          <th scope="col"
          style:width="{header.getSize()}px"
             class="{header.column.columnDef.meta?.textAlign} p-1 md:py-2 md:px-3 text-white text-base font-semibold"                  
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
              <label>
              <span class="sr-only">Filter for column {header.column.id}</span>
                <input
                  type="text"
                  name="column filter"
                  value={header.column.getFilterValue() ?? ''}
                  class="border-2 rounded-md bg-brand-100 text-brand-800 px-2 text-sm w-full *focus:outline-2 focus-visible:outline-accent"
                  placeholder="Filter ..."
                  oninput={(event) =>
                    header.column.setFilterValue(
                      (event.currentTarget as HTMLInputElement).value
                    )
                  }
                />
              </label>
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
          Page {table.atoms.pagination.get().pageIndex + 1} of {table.getPageCount()}
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