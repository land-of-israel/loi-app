import {
	searchBox,
	hits,
	stats,
	pagination,
	//panel,
	//refinementList,
	clearRefinements,
	currentRefinements,
	//hierarchicalMenu,
} from "instantsearch.js/es/widgets";
import { hitTemplates } from "./templates";

export const widgets = {
  searchBox: () =>
    searchBox({
      container: "#searchbox",
      autofocus: true,
      placeholder: "Text search",
    }),

  stats: () =>
    stats({
      container: "#stats",
    }),

  hits: () =>
    hits({
      container: "#hits",
      templates: hitTemplates
    }),

  pagination: () =>
    pagination({
      container: "#pagination",
    }),

    clearRefinements: () =>
        clearRefinements({
            container: "#clearRefinements"
        }),
    currentRefinements: () =>
        currentRefinements({
            container: "#currentRefinements"
        })
};