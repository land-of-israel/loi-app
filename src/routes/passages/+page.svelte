<script lang="ts">
  import DataTable from '$lib/components/DataTable.svelte';
  import { createPassagesTable } from '$lib/tables/passagesTable';
import type {Passage} from '$lib/types'

  let { data } = $props();

  const rows = $derived(data.passages.filter(p => p.title || p.text || p.work.length)
  .map((p: Passage) => ({
    id: p.id,
    loi_id: p.loi_id,
    title: p.title,
    text: p.text,
    author: p.work[0]?.author?.map(a=> a.name).join(', ') ?? '',
    workTitle: p.work[0]?.title ?? '',
    genre: p.work[0]?.genre[0]?.name ?? '',
    keywords: p.keywords.map(k => k.value).join(' | ') ?? ''
  })));

  const tableConfig = $derived(
    createPassagesTable(rows)
    );

const table = $derived(tableConfig.table);
const columns = $derived(tableConfig.columns);
  const basePath = 'passages'
</script>

    
    <DataTable {table} {columns} {basePath} title="Passages" />