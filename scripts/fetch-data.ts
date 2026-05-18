import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

import { request } from "@acdh-oeaw/lib";
// fetch baserow dumps from github and store them in the raw folder
// this script is meant to be run only once by build to fetch the initial data
// subsequent preprocessing of the data is done with the preprocess-data.ts script
const baseUrl: string =
	"https://raw.githubusercontent.com/land-of-israel/loi-baserow-dump/refs/heads/main/json_dumps/";

const folderPath = join(process.cwd(), "src", "lib", "data", "raw");
mkdirSync(folderPath, { recursive: true });

const fileNames: string[] = [
	"authors.json",
    "bible_ref.json",
    "corpora.json",
    "dates.json",
	"genres.json",
    "keywords.json",
    "languages.json",
    "libraries.json",
    "manuscripts.json",
    "ms_transmission.json",
    "parallel_texts.json",
    "passages.json",
	"places.json",
    "works.json"
];

async function fetchData(fileName: string): Promise<void> {
	try {
		const response = await request(new URL(fileName, baseUrl), {
			responseType: "json"
		});

		const data = response.value?.data;

		writeFileSync(
			join(folderPath, fileName),
			JSON.stringify(data, null, 2),
			"utf-8"
		);

		console.log(`✅ Saved: ${fileName}`);
	} catch (error: unknown) {
		console.error(`❌ Error fetching ${fileName}:`, error);
	}
}

async function fetchAllData(): Promise<void> {
	await Promise.all(fileNames.map(fetchData));
	console.log(`All files have been fetched and stored`);
}

fetchAllData();
