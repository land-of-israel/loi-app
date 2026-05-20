export async function load({ fetch }) {
	const url = 'https://imprint.acdh.oeaw.ac.at/28231';

	const response = await fetch(url);
	const data = await response.text();

	return {
		data
	};
}