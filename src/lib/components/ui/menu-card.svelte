<script lang="ts">
import type {Component} from 'svelte'
	const colors = {
		sky: 'bg-sky-500 shadow-sky-500/40',
		green: 'bg-green-500 shadow-green-500/40',
		amber: 'bg-amber-500 shadow-amber-500/40',
		fuchsia: 'bg-fuchsia-600 shadow-fuchsia-600/40',
		cyan: 'bg-cyan-600 shadow-cyan-600/40',
		red: 'bg-red-600 shadow-red-600/40',
		pink: 'bg-pink-800 shadow-pink-800/40',

	};
	type Color = keyof typeof colors;
  
  let { heading, description, color = 'sky', icon: Icon, children } : {
    heading?: string,
    description: string,
    color: Color,
    icon: Component,
    children: import ('svelte').Snippet;
  }= $props();
</script>
 

    <div class="rounded-lg bg-white p-6 text-center shadow-xl border border-neutral-300 grid justify-center ">
      <div class={`mx-auto flex h-16 w-16 -translate-y-12 items-center justify-center rounded-full 
      filter saturate-60 shadow-lg ${colors[color]}`}>
        <Icon class="h-6 w-6 text-white" />
      </div> 
      {#if heading} 
      <h2 class="text-xl font-semibold pb-5 text-brand-600">{heading}</h2>   
      {/if}
      {@render children()}
      <p class="px-4 text-gray-500">{description}</p>
      
    </div>