
<script>
    import { SquareArrowUpRight} from '@lucide/svelte';
    import {Button} from '$lib/components/ui/button'
    import loidatamodel from '$lib/assets/loi-datamodel.svg'
</script>
<div class="grid justify-center gap-4 py-8">
    <h1 class="text-3xl font-semibold">Technical realisation</h1>
    <section class="grid gap-3">
        <h2 class="text-xl text-brand-700 font-semibold">Current Data Model</h2>
        <img alt="" src= {loidatamodel} class="max-w-5xl"/>
         <p>See the datamodel in 
             <Button variant="link" href="https://dbdiagram.io/d/loi-app-6a3b89e33b9b0de599620eb7">dbdiagram.io
              <SquareArrowUpRight class="inline" size="16" />
             </Button>
         </p>
    </section>
</div>