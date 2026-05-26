<script lang="ts">
  import DataTable from '$lib/components/DataTable.svelte';
  import { createAuthorsTable } from '$lib/tables/authorsTable';

  let { data } = $props();

  const rows = $derived(data.authors.map((author) => ({
    id: author.id,
    loi_id: author.loi_id,
    name: author.name,
    works: author.works.map(w => w.title).join(' | ')
    })));

  const tableConfig = $derived(
    createAuthorsTable(rows)
    ); 

const table = $derived(tableConfig.table);
const columns = $derived(tableConfig.columns);
  const basePath = 'authors'
</script>

    
    <DataTable {table} {columns} {basePath} />