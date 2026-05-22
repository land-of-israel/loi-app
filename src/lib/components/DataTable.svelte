<script lang="ts">
	import { goto } from "$app/navigation";
  import {
    Render
  } from "@humanspeak/svelte-headless-table";

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
  <div class="overflow-hidden rounded-md border border-secondary-800">
    <table {...$tableAttrs} class="w-full">
      <thead class="bg-secondary-600">
        {#each $headerRows as headerRow (headerRow)}
          <tr class="bg-secondary-600 text-text">
            {#each headerRow.cells as cell (cell)}
              <th class="py-2 px-4 border border-secondary-800 first:rounded-tl-sm last:rounded-tr-sm">
                <Render of={cell.render()} />
              </th>
            {/each}
          </tr>
        {/each}
      </thead>
  
      <tbody {...$tableBodyAttrs}>
        {#each $pageRows as row (row)}
          <tr class="odd:bg-white even:bg-secondary-100 hover:bg-secondary-600 cursor-pointer"
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