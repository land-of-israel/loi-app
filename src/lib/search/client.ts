import instantsearch from "instantsearch.js";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { simple } from "instantsearch.js/es/lib/stateMappings";

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
  },
});

export function createSearch() {
  return instantsearch({
    searchClient: adapter.searchClient,
    indexName: "LOI",
    routing: {
      stateMapping: simple(),
    },
  });
}