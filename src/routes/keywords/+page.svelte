<script lang="ts">
  import DataTable from '$lib/components/DataTable.svelte';
  import { createKeywordsTable } from '$lib/tables/keywordsTable';

  let { data } = $props();

  const rows = $derived(data.keywords.map((keyword) => ({
    id: keyword.loi_id.split('__')[1],
    loi_id: keyword.loi_id,
    label: keyword.label,
    })));

  const tableConfig = $derived(
    createKeywordsTable(rows)
    );

const table = $derived(tableConfig.table);
const columns = $derived(tableConfig.columns);
  const basePath = 'keywords'
</script>

    
    <DataTable {table} {columns} {basePath} />