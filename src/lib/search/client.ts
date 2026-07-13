import instantsearch from "instantsearch.js";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { simple } from "instantsearch.js/es/lib/stateMappings";
import {widgets} from "$lib/search/widgets"

const adapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: "CQQVJQQCjF8H6hdgQdavKRv7ZBcg6EuD",
    connectionTimeoutSeconds: 5,
    nodes: [
      {
        host: "typesense.acdh-dev.oeaw.ac.at",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "text,text_de, text_en, commentary",
    sort_by: "sort_id:asc",
    highlight_fields: "text,text_de, text_en, commentary",
    highlight_affix_num_tokens: 20, // number of surrounding tokens: default only 4
  },
});

export function createSearch() {
  const search = instantsearch({
    searchClient: adapter.searchClient,
    indexName: "LOI",
    routing: {
      stateMapping: simple(),
    },
    
  });
   search.addWidgets([
            widgets.searchBox(),
            widgets.stats(),
            widgets.hits(),
            widgets.pagination(),
            widgets.refinementWork(),
            widgets.refinementKeywords(),
            widgets.refinementBibl(),
            widgets.refinementParallels(),
            widgets.refinementAuthor(),
            widgets.refinementLanguage(),
            widgets.refinementPlace(),
            widgets.refinementGenre(),
            widgets.currentRefinements(),
        ]);
return search
}