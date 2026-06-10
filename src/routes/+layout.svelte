<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	 import { page } from "$app/state";
	let { children } = $props();
</script>
<div class="min-h-screen grid grid-rows-[auto_1fr_auto]">
	<Header />	
	<main>
	{#if page.data.breadcrumbs?.length}
			<Breadcrumbs breadcrumbs={page.data.breadcrumbs} />
		{/if}
		{@render children()}	
	</main>
	<Footer />
</div>
