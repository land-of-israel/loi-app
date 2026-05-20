import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

import passages from '$lib/data/processed/passages.json';


export const prerender = true;

export function entries() {
	return passages.map((p) => ({
		id: p.loi_id.toString()
	}));
}

export const load: PageLoad = ({ params }) => {
	const passage = passages.find(
		(p) => p.loi_id === params.id
	);

	if (!passage) {
		throw error(404, 'Passage not found');
	}

	return { passage };
};