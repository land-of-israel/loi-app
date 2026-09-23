<script lang="ts">
  import DataTable from '$lib/components/Table.svelte';
  import { passageTableConfig } from '$lib/tables/passagesTable';

import type {Passage} from '$lib/types'

  let { data } = $props();

  const rows = $derived(data.passages.filter(p => p.title || p.text || p.work.length)
  .map((p: Passage) => ({
    id: p.id,
    loi_id: p.loi_id,
    title: p.title || 'TBD',
    text: p.text,
    author: p.work[0]?.author?.map(a=> a.name).join(', ') ?? '',
    workTitle: p.work[0]?.title ?? '',
    genre: p.work[0]?.genre[0]?.sub_genre ?? '',
    keywords: p.keywords.map(k => k.value).join(' | ') ?? '',
    language: p.work[0]?.language ?? '',
    tpq: p.work[0]?.date[0]?.tpq ?? '',
    taq: p.work[0]?.date[0]?.taq ?? '',
    translation_en: p.translation ?? '',
    translation_de: p.german_translation ?? '',
    bibl_quotes: p.bibl_quotes.map(b => b.bible).join(' | ') ?? '',
    parallels: p.parallels.map(p => p.label).join(' | ')
  })));


  const basePath = 'passages'
  const title = "Passages"
</script>
<svelte:head>
  <title>LOI · {title}</title>
</svelte:head>

    
      <DataTable data={rows} {basePath}  {...passageTableConfig} {title}/>