<script lang="ts">
  import DataTable from '$lib/components/Table.svelte';
  import { keywordsTableConfig } from '$lib/tables/keywordsTable';
  import type {Keyword} from "$lib/types"
  let { data } = $props();

  const rows = $derived(data.keywords.map((keyword: Keyword) => ({
    id: keyword.id,
    loi_id: keyword.loi_id,
    label: keyword.label,
    passages: keyword.passages.length
    })));

 
  const basePath = 'keywords'
</script>

    
    <DataTable data={rows} {...keywordsTableConfig} {basePath} title="Keywords" />