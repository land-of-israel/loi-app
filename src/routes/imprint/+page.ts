export async function load({ fetch }) {
	const url = "https://imprint.acdh.oeaw.ac.at/28231";

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		return {
			data: await response.text(),
			breadcrumbs: [{ label: "Imprint" }]
		};
	} catch (err) {
		console.error("Failed to fetch imprint:", err);

		return {
			data: "<p>The imprint is temporarily unavailable.</p>",
			breadcrumbs: [{ label: "Imprint" }]
		};
	}
}