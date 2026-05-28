<script lang="ts">
  import DataTable from '$lib/components/DataTable.svelte';
  import { createKeywordsTable } from '$lib/tables/keywordsTable';
  import type {Keyword} from "$lib/types"
  let { data } = $props();

  const rows = $derived(data.keywords.map((keyword: Keyword) => ({
    id: keyword.id,
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