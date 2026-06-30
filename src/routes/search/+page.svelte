<script lang="ts">
import { onMount } from "svelte";

let search;

onMount(() => {
    (async () => {
        const { createSearch } = await import("$lib/search/client");
        const { widgets } = await import("$lib/search/widgets");

        search = createSearch();

        search.addWidgets([
            widgets.searchBox(),
            widgets.stats(),
            widgets.hits(),
            widgets.pagination(),
        ]);

        search.start();
    })();

    return () => search.dispose();
});
</script>

<div id="searchbox" class="max-w-3xl rounded-lg p-8 bg-brand-200"></div>
<div id="clearRefinements"></div>
<div id="currentRefinements"></div>

<div id="stats"></div>
<div id="hits"></div>
<div id="pagination"></div>