import passages from '$lib/data/processed/passages.json';

export function load({ params }) {
	const passage = passages.find(
		(p) => p.loi_id === params.id
	);

	return {
		passage
	};
}