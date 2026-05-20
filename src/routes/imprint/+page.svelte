<script>
let { data } = $props();
</script>

<div class="mx-auto w-full max-w-(--breakpoint-xl) py-16">
	<div class="prose max-w-(--breakpoint-md)">
		<h1>Imprint</h1>

		{@html data.data}
	</div>
</div>