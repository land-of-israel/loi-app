import { log } from "@acdh-oeaw/lib";
import { createTypesenseAdminClient } from "../scripts/create-typesense-admin-client.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import type { Passage } from "$lib/types/passage.js";
import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const loadJSON = (file : string) =>
  JSON.parse(
    readFileSync(join(__dirname, "../src/lib/data/processed", file), "utf8"),
  );

const data: Passage[] = Object.values(loadJSON("passages.json")) as Passage[];
const collectionName = "LOI"

async function generate() {
  // instantiate typesense client using helpers function
  const client = createTypesenseAdminClient();

  // check if the collection exist if so delete and write anew

  try {
    // Check if the collection exists
    const collections = await client.collections().retrieve();
    const collectionExists = collections.some(
      (collection) => collection.name === collectionName,
    );

    if (collectionExists) {
      // If the collection exists, delete it
      await client.collections(collectionName).delete();
      log.success(`Deleted the existing collection: ${collectionName}`);
    }
  } catch (error) {
    log.error("Error while checking or deleting collection:\n", String(error));
  }

  // create collection
  const schema : CollectionCreateSchema = {
    name: collectionName,
    enable_nested_fields: true,
    fields: [
      { name: "id", type: "string", sort: true },
      { name: "sort_id", type: "int32", sort: true },
      { name: "rec_id", type: "string", sort: true },
      { name: "title", type: "string", sort: true, facet: true },
      {
        name: "work",
        type: "string",
        facet: true,
        optional: true,
      },
      { name: "author", type: "string", sort: true },
      { name: "language", type: "string", sort: true },
      { name: "genre", type: "string", sort: true },
      { name: "main_genre", type: "string", sort: true },
      { name: "place", type: "string", sort: true },
      { name: "text", type: "string", sort: true },
      { name: "text_de", type: "string", sort: true },
      { name: "text_en", type: "string", sort: true },
      { name: "commentary", type: "string", sort: true },
      { name: "keywords", type: "object[]", facet: true, optional: true },
      { name: "bibl_quotes", type: "object[]", facet: true, optional: true },
      { name: "parallels", type: "object[]", facet: true, optional: true },
     
      
      // get dates as separate numbers for filtering 'from -to' in the frontend
      { name: "tpq", type: "int32", facet: true, sort: true },
      { name: "taq", type: "int32", facet: true, sort: true },
    ],
    token_separators: ["-"],
    default_sorting_field: "sort_id",
    
    metadata: {
        "owners": ["Ivana Dobcheva"],
        "description": "index for the LOI project, indexing all passages",
        "service_ids": [28231]
    }

  };

  await client.collections().create(schema);
  log.success("Created new collection");

  // transform data so it conforms to the typesense collection shape
  const records = data
  .filter((value) => value.text !== "")
  .map((value) => ({
   sort_id: value.id,
        rec_id: value.loi_id,
        id: String(value.id),
        title: value.title,
        text: value.text,   
        text_en: value.translation,
        text_de: value.german_translation,
        commentary: value.commentary,     
        work: value.work[0]?.title || '',  
        author: value.work[0]?.author[0]?.name || '',      
        language: value.work[0]?.language || '',      
        genre: value.work[0]?.genre[0]?.name || '',      
        main_genre: value.work[0]?.genre[0]?.main_genre || '',      
        place: value.work[0]?.place[0]?.name || '',      
        bibl_quotes: value.bibl_quotes,
        keywords: value.keywords,
        tpq: value.work[0]?.date[0]?.tpq || 601,
        taq: value.work[0]?.date[0]?.taq || 1100,
  }));
  
  // - import data into typesense collection

  await client.collections(collectionName).documents().import(records);
  log.success("All imported"); 

}

generate()
  .then(() => {
    log.success("All good.");
  })
  .catch((error) => {
    log.error("Oh no!\n", String(error));
    process.exitCode = 1;
  });
