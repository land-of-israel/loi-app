<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>
<div class="min-h-screen flex flex-col">
	<Header />
	
	<main class="flex-1 max-w-6xl mx-auto">
		{@render children()}
	
	</main>
	<Footer />
</div>
