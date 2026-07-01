<script lang="ts">
 let {label, dir, lang, children} = $props<{
        label: string;
        dir?: string;
        lang?: string;
        children: import ('svelte').Snippet;}>()
 
</script>

<!-- description list item to be used for slots -->
<dt class="font-semibold pr-2 text-brand-600" >
	{label}
</dt>
<dd class="pl-5" dir={dir} lang={lang}>
	{@render children()}
</dd>
