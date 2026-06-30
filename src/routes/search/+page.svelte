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
<div class="max-w-5xl mx-auto">
    <div id="searchbox" class="w-full rounded-lg p-8 bg-brand-200"></div>
    <div id="clearRefinements"></div>
    <div id="currentRefinements"></div>
    <div class="grid md:grid-cols-[1fr_3fr] md:gap-6 md:px-5">
        <div id="refinements">Here some the filters</div>
        <div>
            <div id="stats"></div>
            <div id="hits" ></div>
            <div id="pagination"></div>
        </div>
    
    
    </div>
</div>
