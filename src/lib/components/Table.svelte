<script lang="ts" generics="TData extends RowData  & { loi_id: string | number }">
// use generic data type TData satisfying the Rowdata type of tanstack
// so the table remain generic and can accept any data (authros, passages etc.)
import { goto } from "$app/navigation";
  import{ resolve} from "$app/paths"  

import type { ColumnDef, RowData } from '@tanstack/svelte-table'
  import {
    createTable,
    FlexRender,
  } from '@tanstack/svelte-table'
import {features} from "$lib/tables/tableFeatures"


  import ArrowDonwUp from '@lucide/svelte/icons/arrow-down-up';
  import ArrowUp from '@lucide/svelte/icons/arrow-up-narrow-wide';
  import ArrowDown from '@lucide/svelte/icons/arrow-down-wide-narrow';

    type Props = {
        data: TData[]
        columns: ColumnDef<typeof features, TData>[]
        basePath: string
        title: string
    }

   // 3. New in v9: declare which features this table uses (none yet)

    let {
        data,
        columns,
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
        globalFilterFn: 'includesString',
        get data() {
            return data
        }
    })

</script>
<div class="grid gap-4 py-3 md:my-10 max-w-full mx-2 xl:max-w-4/6 xl:mx-auto">
<h1 class="text-2xl font-semibold md:text-3xl">{title}</h1>
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
<!-- 6. Render markup from the table instance APIs -->
<table class="w-full overflow-scroll">
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                <tr class="bg-brand-500 text-text">         

        {#each headerGroup.headers as header (header.id)}
          <th
             class="p-1 md:py-2 md:px-3 border border-black text-white text-base font-medium"                  
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
        {#each row.getAllCells() as cell (cell.id)}
          <td class="py-2 px-4 border border-r-neutral-300">
            <FlexRender {cell} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
</div>