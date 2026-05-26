<script lang="ts">
  import DataTable from '$lib/components/DataTable.svelte';
  import { createWorksTable } from '$lib/tables/worksTable';
import type {Work} from '$lib/types'

  let { data } = $props();

  const rows = $derived(data.works.map((w: Work) => ({
    id: w.id,
    loi_id: w.loi_id,
    title: w.title,
    author: w.author?.map(a=> a.name).join(', ') ?? '',
    tpq: w.date[0]?.tpq ?? '',
    taq: w.date[0]?.taq ?? '',
    place: w.place.map(pl => pl.name).join(' | '),
    passages: w.passages.map(p => p.loi_id.split('__')[1]).join(' | ')
  })));

  const tableConfig = $derived(
    createWorksTable(rows)
    );

const table = $derived(tableConfig.table);
const columns = $derived(tableConfig.columns);
  const basePath = 'works'
</script>

    
    <DataTable {table} {columns} {basePath} />