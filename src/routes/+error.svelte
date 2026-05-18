<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error</title>
</svelte:head>

<div class="py-20 text-center">
	<h1 class="text-4xl font-bold mb-4">
		{page.status}
	</h1>

	<p class="text-lg">
		{page.error?.message ?? 'Something went wrong'}
	</p>
</div>