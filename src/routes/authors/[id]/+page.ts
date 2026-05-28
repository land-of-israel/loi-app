import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type {Author} from '$lib/types'

import authors from '$lib/data/processed/authors.json';


export const prerender = true;

export function entries() {
    return authors.map((a) => ({
        id: a.loi_id.toString()
    }));
}

export const load: PageLoad = ({ params }) => {
    const author = authors.find(
        (a) => a.loi_id === params.id
    );

    if (!author) {
        throw error(404, 'Author not found');
    }

    return { ... author as Author };
};