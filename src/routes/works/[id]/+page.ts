import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

import works from '$lib/data/processed/works.json';
import type {Work} from "$lib/types"


export const prerender = true;

export function entries() {
	return works.map((w) => ({
		id: w.loi_id.toString()
	}));
}

export const load: PageLoad = ({ params }) => {
	const work = works.find(
		(w) => w.loi_id === params.id
	);

	if (!work) {
		throw error(404, 'work not found');
	}

	return { ... work as Work };
};