import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type {Keyword} from '$lib/types'
import keywords from '$lib/data/processed/keywords.json';


export const prerender = true;

export function entries() {
	return keywords.map((p) => ({
		id: p.loi_id.toString()
	}));
}

export const load: PageLoad = ({ params }) => {
	const keyword = keywords.find(
		(p) => p.loi_id === params.id
	);

	if (!keyword) {
		throw error(404, 'keyword not found');
	}

	return { ... keyword as Keyword, breadcrumbs: [{label: "Keywords", href: "/keywords"}, {label: keyword.label}] };
};