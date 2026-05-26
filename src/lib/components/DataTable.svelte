<script lang="ts">
	import { goto } from "$app/navigation";
  import {
    Render
  } from "@humanspeak/svelte-headless-table";

  import {Button} from '$lib/components/ui/button'
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
const {pageIndex, pageCount, hasPreviousPage, hasNextPage} = $derived(pluginStates?.page)

</script>
<div class="grid gap-4 my-10 max-w-6xl mx-auto">
  <div class="flex gap-4 justify-end items-center-safe">
    <h2>Search inside the table</h2>
    <input
      type="text"
      bind:value={$filterValue}
      placeholder = 'calendar'
      class="py-2 px-4 rounded border italic focus:outline-2 focus:outline-offset-2 focus:outline-accent"
    />
  </div>
  <div class="flex justify-end gap-1">
    
      <Button variant="secondary" disabled={$pageIndex == 0} onclick={() => pageIndex.set(0)}>First</Button>
      <Button variant="secondary" disabled={!$hasPreviousPage} onclick={() => pageIndex.update((n: number) => n - 1)}>Previous Page</Button>    
      {#each Array($pageCount) as _ , i (i)}
        <Button
          disabled={$pageIndex === i}
          variant="ghost"
          onclick={() => pageIndex.set(i)}
        >
          {i + 1}
        </Button>
      {/each}
      <Button variant="secondary" disabled={!$hasNextPage} onclick={() => pageIndex.update((n: number) => n + 1)}>Next Page</Button>
      <Button variant="secondary" onclick={() => pageIndex.set($pageCount-1)}>Last</Button>

  </div>
  <div class="overflow-hidden rounded-md border border-secondary-800">
    <table {...$tableAttrs} class="w-full">
      <thead>
        {#each $headerRows as headerRow (headerRow)}
          <tr class="bg-brand-400 text-text">
            {#each headerRow.cells as cell (cell)}
              <th class="py-2 px-4 border border-black text-white first:rounded-tl-sm last:rounded-tr-sm">
                <Render of={cell.render()} />
              </th>
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