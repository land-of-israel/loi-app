import type { PageLoad } from './$types';


export const load: PageLoad = () => {
   
    return { 
        breadcrumbs: [{label: "about", href: "/about"}, {label: "Technical"}]
    };
};