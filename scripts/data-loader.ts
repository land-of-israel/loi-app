import {readFileSync} from "fs";
import { join } from "path";
import { z } from "zod";

import {
    RawAuthorsSchema,
    RawBiblRefsSchema,
    RawCorporaSchema,
    RawDatesSchema,
    RawGenresSchema,
    RawKeywordsSchema,
    RawLanguagesSchema,
    RawLibrariesSchema,
    RawManuscriptsSchema,
    RawMsTransmissionsSchema,
    RawParallelsSchema,
    RawPassagesSchema,
    RawPlacesSchema,
    RawWorksSchema
} from "$lib/schemas"

const rawDataDir = join(process.cwd(), "src", "lib", "data", "raw")

function loadJson<T>(filename: string, schema: z.ZodType<T>): T {
    const filePath = join(rawDataDir, filename);
    const raw = readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);

    return schema.parse(parsed);
}

export function loadAllData() {
    return {
        authors: Object.values(loadJson("authors.json", RawAuthorsSchema)),
        bible_ref: Object.values(loadJson("bible_ref.json", RawBiblRefsSchema)),
        corpora: Object.values(loadJson("corpora.json", RawCorporaSchema)),
        dates: Object.values(loadJson("dates.json", RawDatesSchema)),
        genres: Object.values(loadJson("genres.json", RawGenresSchema)),
        keywords: Object.values(loadJson("keywords.json", RawKeywordsSchema)),
        languages: Object.values(loadJson("languages.json", RawLanguagesSchema)),
        libraries: Object.values(loadJson("libraries.json", RawLibrariesSchema)),
        manuscripts: Object.values(loadJson("manuscripts.json", RawManuscriptsSchema)),
        passages: Object.values(loadJson("passages.json", RawPassagesSchema)),
        ms_transmission: Object.values(loadJson("ms_transmission.json", RawMsTransmissionsSchema)),
        parallel_texts: Object.values(loadJson("parallel_texts.json", RawParallelsSchema)),
        places: Object.values(loadJson("places.json", RawPlacesSchema)),
        works: Object.values(loadJson("works.json", RawWorksSchema))
    }
}
