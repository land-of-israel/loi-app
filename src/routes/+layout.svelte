<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>
<div class="min-h-screen grid grid-rows-[auto_1fr_auto]">
	<Header />
	
	<main>
		{@render children()}	
	</main>
	<Footer />
</div>
