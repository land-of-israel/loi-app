import {
	searchBox,
	hits,
	stats,
	pagination,
	panel,
	clearRefinements,
	currentRefinements,
    refinementList,
	//hierarchicalMenu,
} from "instantsearch.js/es/widgets";
import { resolve } from "$app/paths";

import { hitTemplates } from "./templates";

const commonRefinementOptions = {
  searchable: true,
  searchablePlaceholder: "",
  limit: 10,
  showMore: true,
  showMoreLimit: 50,
  templates: {
    showMoreText({ isShowingMore }: { isShowingMore: boolean }) {
      return isShowingMore ? "Show less" : "Show more";
    },
  },
};

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
      templates: hitTemplates(resolve)
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
        }),
    refinementWork: () =>
        wrapInPanel("Work")({
            ...commonRefinementOptions,
            container: "#refinement-list-work",
            attribute: "work",
        }),
    refinementBibl: () =>
        wrapInPanel("Bible quotes")({
            ...commonRefinementOptions,
            container: "#refinement-list-bibl",
            attribute: "bibl_quotes",
        }),
    refinementAuthor: () =>
        wrapInPanel("Author")({
            ...commonRefinementOptions,
            container: "#refinement-list-author",
            attribute: "author",
        }),
    refinementParallels: () =>
        wrapInPanel("Parallels")({
            ...commonRefinementOptions,
            container: "#refinement-list-parallels",
            attribute: "parallels",
        }),
    refinementKeywords: () =>
        wrapInPanel("Keywords")({
            ...commonRefinementOptions,
            container: "#refinement-list-keywords",
            attribute: "keywords",
        }),
        

    };

// function to wrap refinements filter in a panel
function wrapInPanel(title: string) {
  return panel({
    collapsed: () => false,

    templates: {
      header(_, { html }) {
        return html`
          <span
            class="normal-case text-base font-normal"
            aria-label="refinement by ${title}"
          >
            ${title}
          </span>
        `;
      },
    },

    cssClasses: {
      header: "cursor-pointer relative z-10",
      collapseButton: "absolute inset-0 z-20 flex flex-row-reverse",
      collapseIcon: "",
      root: "border-b",
    },
  })(refinementList);
}