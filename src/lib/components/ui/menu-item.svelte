<script lang="ts">
    let { title, link } : {
        title: string,
        link: string 
    } = $props()
</script>


    <a href={link} class="text-xl font-medium px-3 py-2 bg-brand-300
     hover:bg-brand-400 hover:text-white rounded-md self-center">
        {title}
    </a>