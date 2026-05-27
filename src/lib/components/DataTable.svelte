<script lang="ts">
	import { goto } from "$app/navigation";
  import {
    Render, Subscribe
  } from "@humanspeak/svelte-headless-table";

  import {Button} from '$lib/components/ui/button';
  import ArrowDonwUp from '@lucide/svelte/icons/arrow-down-up';
  import ArrowUp from '@lucide/svelte/icons/arrow-up-narrow-wide';
  import ArrowDown from '@lucide/svelte/icons/arrow-down-wide-narrow';

  let { table, columns, basePath } = $props();

  const viewModel = $derived(
    table.createViewModel(columns)
  )

  const headerRows = $derived(viewModel.headerRows)
  const pageRows = $derived(viewModel.pageRows)
  const tableAttrs = $derived(viewModel.tableAttrs)
  const tableBodyAttrs = $derived(viewModel.tableBodyAttrs)
  const pluginStates = $derived(viewModel.pluginStates)

const filterValue = $derived(pluginStates?.filter?.filterValue);
const {pageIndex, pageCount, hasPreviousPage, hasNextPage, pageSize} = $derived(pluginStates?.page)

type SortState = {
  order?: 'asc' | 'desc';
  disabled: boolean;
  toggle: (event: Event) => void;
  clear: () => void;
};

</script>
<div class="grid gap-4 my-10 max-w-6xl mx-auto">
  <div class="flex gap-4 justify-end items-center-safe">
    <h2>Search inside the table</h2>
    <input
      type="text"
      bind:value={$filterValue}
      placeholder = 'calendar'
      class="py-1 px-4 rounded-md border italic focus:outline-2 focus:outline-offset-2 focus:outline-accent"
    />
  </div>
  <div class="flex justify-between gap-1">
    <div class=" flex items-center gap-2 px-2 py-1 rounded-md border ">
      <label for="pages">Rows per page:</label>
      <select id="pages" bind:value={$pageSize} class="rounded-md *:focus:outline-2 focus:outline-offset-2 focus:outline-accent">
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
      <div>
        <Button variant="secondary" disabled={$pageIndex == 0} onclick={() => pageIndex.set(0)}>First</Button>
        <Button variant="secondary" disabled={!$hasPreviousPage} onclick={() => pageIndex.update((n: number) => n - 1)}>Previous Page</Button>
      
        {#each Array($pageCount) as _, i (i)} <!-- eslint-disable-line @typescript-eslint/no-unused-vars -->
        
          <Button
            disabled={$pageIndex === i}
            variant="ghost"
            onclick={() => pageIndex.set(i)}
          >
            {i + 1}
          </Button>
        {/each}
        <Button variant="secondary" disabled={!$hasNextPage} onclick={() => pageIndex.update((n: number) => n + 1)}>Next Page</Button>
        <Button variant="secondary" disabled={$pageIndex+1 == $pageCount} onclick={() => pageIndex.set($pageCount-1)}>Last</Button>
      </div>

  </div>
  <div class="overflow-hidden rounded-md border border-secondary-800">
    <table {...$tableAttrs} class="w-full">
      <thead>
        {#each $headerRows as headerRow (headerRow)}
          <tr class="bg-brand-400 text-text">         
            {#each headerRow.cells as cell (cell)}
             <Subscribe props={cell.props()} let:props>
              {@const sort = (props as {sort: SortState}).sort}

                <th
                  class="py-2 px-4 border border-black text-white first:rounded-tl-sm last:rounded-tr-sm"
                  onclick={sort ? sort.toggle : undefined}
                >
                  <div class="flex gap-2">
                    <Render of={cell.render()} />
                    {#if sort && !sort.disabled}
                      {#if sort.order === 'asc'}
                        <span class="red-800"><ArrowDown/></span>
                      {:else if sort.order === 'desc'}
                        <ArrowUp />
                      {:else}
                        <ArrowDonwUp />
                      {/if}
                    {/if}
                  </div>
                </th>
              </Subscribe>
            {/each}
          </tr>
        {/each}
      </thead>
  
      <tbody {...$tableBodyAttrs}>
        {#each $pageRows as row (row)}
          <tr class="odd:bg-white even:bg-brand-100 hover:bg-brand-300 cursor-pointer"
          onclick={() => goto(`/${basePath}/${row.original.loi_id}`)}>
            {#each row.cells as cell (cell)}
              <td class="py-2 px-4 border border-r-neutral-300">
                <Render of={cell.render()} />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>        
  </div>
</div>