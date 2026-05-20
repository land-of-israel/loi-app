import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

import works from '$lib/data/processed/works.json';


export const prerender = true;

export function entries() {
	return works.map((p) => ({
		id: p.loi_id.toString()
	}));
}

export const load: PageLoad = ({ params }) => {
	const work = works.find(
		(p) => p.loi_id === params.id
	);

	if (!work) {
		throw error(404, 'work not found');
	}

	return { work };
};