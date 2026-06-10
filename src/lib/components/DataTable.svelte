<script lang="ts">
	import { goto } from "$app/navigation";
  import{ resolve} from "$app/paths"
  import {
    Render, Subscribe
  } from "@humanspeak/svelte-headless-table";

  import {Button} from '$lib/components/ui/button';
  import ArrowDonwUp from '@lucide/svelte/icons/arrow-down-up';
  import ArrowUp from '@lucide/svelte/icons/arrow-up-narrow-wide';
  import ArrowDown from '@lucide/svelte/icons/arrow-down-wide-narrow';


  let { table, columns, basePath, title } = $props();

  const viewModel = $derived(
    table.createViewModel(columns)
  )

  const headerRows = $derived(viewModel.headerRows)
  const pageRows = $derived(viewModel.pageRows)
  const tableAttrs = $derived(viewModel.tableAttrs)
  const tableBodyAttrs = $derived(viewModel.tableBodyAttrs)
  const pluginStates = $derived(viewModel.pluginStates)

  const { colFilter } = pluginStates;
const { filterValues } = colFilter;

const filterValue = $derived(pluginStates?.filter?.filterValue);
const {pageIndex, pageCount, hasPreviousPage, hasNextPage, pageSize} = $derived(pluginStates?.page)



type SortState = {
  order?: 'asc' | 'desc';
  disabled: boolean;
  toggle: (event: Event) => void;
  clear: () => void;
  colFilter: () => void
};

</script>
<div class="grid gap-4 my-10 max-w-full mx-2 xl:max-w-4/6 xl:mx-auto">
<h1 class="text-2xl font-semibold md:text-3xl">{title}</h1>
<!-- table filter -->
  <div class="flex gap-4 justify-end items-center-safe">
    <h2>Search inside the table</h2>
    <input
      type="text"
      bind:value={$filterValue}
      placeholder = 'calendar'
      class="py-1 px-4 rounded-md border italic focus:outline-2 focus:outline-offset-2 focus:outline-accent"
    />
  </div>
  
  <div class="overflow-hidden rounded-md border border-brand-500">
    <table {...$tableAttrs} class="w-full overflow-scroll">
      <thead>
        {#each $headerRows as headerRow (headerRow)}
          <tr class="bg-brand-500 text-text">         
            {#each headerRow.cells as cell (cell)}
             <Subscribe props={cell.props()} let:props>
              {@const sort = (props as {sort: SortState}).sort}
                <th
                  class="py-2 px-3 border border-black text-white text-base font-medium first:rounded-tl-sm last:rounded-tr-sm"
                  
                >
                  <button class="flex gap-2 py-1 *:focus:outline-2 focus:outline-accent" onclick={sort ? sort.toggle : undefined}>
                    <Render of={cell.render()} />
                    {#if sort && !sort.disabled}
                      {#if sort.order === 'asc'}
                        <span class="cursor-pointer"><ArrowDown/></span>
                      {:else if sort.order === 'desc'}
                        <ArrowUp class="cursor-pointer" />
                      {:else}
                        <ArrowDonwUp class="cursor-pointer" />
                      {/if}
                    {/if}
                  </button>       
                 
                  {#if pluginStates.colFilter}
                
                    <input
                      class="bg-brand-200 w-full text-text font-medium px-1 py-0.5 text-sm rounded *:focus:outline-2 focus:outline-accent"
                      placeholder="Filter..."
                      
                      value={$filterValues[cell.id] ?? ''}
                      oninput={(e) => {
                        $filterValues[cell.id] = e.currentTarget.value;
                      }}
                    />
                  {/if}
                </th>
              </Subscribe>
            {/each}
          </tr>
        {/each}
      </thead>
  
      <tbody {...$tableBodyAttrs}>
        {#each $pageRows as row (row)}
          <tr class="odd:bg-white even:bg-brand-100 hover:bg-brand-300 cursor-pointer text-sm font-light"
          onclick={() => goto(resolve(`/${basePath}/${row.original.loi_id}`, {}))}>
            {#each row.cells as cell (cell)}
            <td
                class={`py-2 px-4 border border-r-neutral-300   ${cell.column.plugins?.style?.width ?? ''}
                ${cell.column.plugins?.style?.align ?? ''}`}
              >
                <Render of={cell.render()} />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>        
  </div>
  <div class="flex justify-between gap-1">
  <!-- page size selection -->
    <div class=" flex items-center gap-2 px-2 py-1 rounded-md border ">
      <label for="pages">Rows per page:</label>
      <select id="pages" bind:value={$pageSize} class="rounded-md *:focus:outline-2 focus:outline-offset-2 focus:outline-accent">
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
    <!-- pagination -->
      <div>
        <Button variant="secondary" disabled={$pageIndex == 0} onclick={() => pageIndex.set(0)}>First</Button>
        <Button variant="secondary" disabled={!$hasPreviousPage} onclick={() => pageIndex.update((n: number) => n - 1)}>Previous Page</Button>
      <span class="px-2">{$pageIndex + 1}</span>
        <Button variant="secondary" disabled={!$hasNextPage} onclick={() => pageIndex.update((n: number) => n + 1)}>Next Page</Button>
        <Button variant="secondary" disabled={$pageIndex+1 == $pageCount} onclick={() => pageIndex.set($pageCount-1)}>Last</Button>
      </div>

  </div>
</div>