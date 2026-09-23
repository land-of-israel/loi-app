<script lang="ts">
  import DataTable from '$lib/components/Table.svelte';
  import { authorTableConfig } from '$lib/tables/authorsTable';

  let { data } = $props();

  const rows = $derived(data.authors.map((author) => ({
    id: author.id,
    loi_id: author.loi_id,
    name: author.name,
    works: author.works.map(w => w.title).join(' | '),
    })));


  const basePath = 'authors'
</script>

    
    <DataTable data={rows} {basePath} {...authorTableConfig} title="Authors"/>