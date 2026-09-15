import {
	searchBox,
	hits,
	stats,
	pagination,
	panel,
	clearRefinements,
	currentRefinements,
  refinementList,
	hierarchicalMenu,
  sortBy,
} from "instantsearch.js/es/widgets";
import { connectCurrentRefinements } from "instantsearch.js/es/connectors";

import { resolve } from "$app/paths";

import { hitTemplates } from "./templates";

import { searchState } from "./client.svelte"; // for badge number of current refinements
import type { InitOptions, RenderOptions } from "instantsearch.js/es/types";

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



const currentRefinementsNumber = connectCurrentRefinements(({ items }) => {
	searchState.activeFilterCount = items.reduce(
		(sum, item) => sum + item.refinements.length,
		0
	);
});

export const widgets = {

   currentRefinementsNumber: () => currentRefinementsNumber({}),

  searchBox: () =>
    searchBox({
      container: "#searchbox",
      autofocus: true,
      placeholder: "Search in original text, translation and commentary",
    }),

  sortBy: () => 
    sortBy({
      container: "#sort-by",
      items: [
        { value: "LOI/sort/author:asc", label: "author (A-Z)" },
        { value: "LOI/sort/author:desc", label: "author (Z-A)" },
        { value: "LOI/sort/tpq:asc", label: "date (ascending)" },
        { value: "LOI/sort/taq:asc", label: "date (descending)" },
        { value: "LOI/sort/sort_id:asc", label: "default (ID)" },
      ],
    }),

  stats: () =>
    stats({
      container: "#stats",
    }),

  hits: () =>
    hits({
      container: "#hits",
      templates: hitTemplates(resolve),
       transformItems(items, { results }) {
    const hasQuery = (results?.query.trim().length ?? 0) > 1;

    return items.map(item => ({
      ...item,
      hasQuery,
    }));
  },
    }),

  pagination: () =>
    pagination({
      container: "#pagination",
    }),

    clearRefinements: () =>
        clearRefinements({
		      container: "#clearRefinements",		
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
     refinementLanguage: () =>
        wrapInPanel("Language")({
            ...commonRefinementOptions,
            container: "#refinement-list-language",
            attribute: "language",
        }),  
    refinementPlace: () =>
        wrapInPanel("Place")({
            ...commonRefinementOptions,
            container: "#refinement-list-place",
            attribute: "place",
        }),
  
    refinementGenre: () =>
        wrapHierarcicalMenuInPanel("Genre")({
             ...commonRefinementOptions,
            container: "#refinement-list-genre",
            attributes: ["main_genre", "sub_genre"],
		    separator: " > ",             
        }),

  
customDateRangeWidget: (containerId: string) => {
  return {
    $$type: "custom.dateCurrentRefinement",
    init({ helper }: InitOptions) {
      // Create the HTML structure for the date range widget.
      const container = document.querySelector<HTMLElement>(containerId);

      if (!container) return;

      container.innerHTML = `
        <details class="ais-Panel group">

          <summary class="ais-Panel-header">

            <span class="normal-case text-base font-semibold">
              Date
            </span>

            <span class="transition-transform duration-300 rotate-90 group-open:-rotate-90">
              <svg style="width: 1em; height: 1em;" viewBox="0 0 500 500">
                <path d="M100 250l300-150v300z" fill="currentColor"></path>
              </svg>
            </span>

          </summary>

          <div class="ais-Panel-body">

            <div class="ais-RangeInput">

              <form class="ais-RangeInput-form flex gap-2 w-full">

                <label for="date-from-year" class="sr-only">
                  From year
                </label>

                <input
                  class="ais-RangeInput-input"
                  type="number"
                  id="date-from-year"
                >

                <label for="date-to-year" class="sr-only">
                  To year
                </label>

                <input
                  class="ais-RangeInput-input"
                  type="number"
                  id="date-to-year"
                >

                <button
                  type="submit"
                  class="border rounded-md bg-brand-100 px-2 py-1 hover:bg-brand-600 hover:text-white transition font-semibold text-sm"
                >
                  Apply
                </button>

              </form>

            </div>

          </div>

        </details>
      `;

      const form = container.querySelector<HTMLFormElement>("form");

      const fromInput =
        container.querySelector<HTMLInputElement>("#date-from-year");

      const toInput =
        container.querySelector<HTMLInputElement>("#date-to-year");

      if (!form || !fromInput || !toInput) return;

     

      // Add event listener to the form.
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const from = Number.parseInt(fromInput.value, 10);
        const to = Number.parseInt(toInput.value, 10);

        const hasFrom = !Number.isNaN(from);
        const hasTo = !Number.isNaN(to);

        // Validate only when both values exist.
        if (hasFrom && hasTo && from >= to) {
          toInput.setCustomValidity(
            "The 'To year' must be greater than the 'From year'.",
          );
          toInput.reportValidity();
          return;
        }

        toInput.setCustomValidity("");

        let dateFilter = "";

        // Both values are valid.
        if (hasFrom && hasTo) {
          dateFilter = `
            (
              (
                tpq:>=${from}
                &&
                tpq:<=${to}
              )
              ||
              (
                taq:>=${from}
                &&
                taq:<=${to}
              )
            )
          `.replace(/\s+/g, " ");
        }

        // Only "From year" is valid.
        else if (hasFrom) {
          dateFilter = `
            (
              tpq:>=${from}
              &&
              taq:>=${from}
            )
          `.replace(/\s+/g, " ");
        }

        // Only "To year" is valid.
        else if (hasTo) {
          dateFilter = `
            (
              tpq:<=${to}
              &&
              taq:<=${to}
            )
          `.replace(/\s+/g, " ");
        }

        helper.setQueryParameter("filters", dateFilter);
        helper.search();
      });

      // Clear validation when the "From" input changes.
      fromInput.addEventListener("input", () => {
        toInput.setCustomValidity("");
      });

      // Validate the range while the "To" input changes.
      toInput.addEventListener("input", () => {
        const from = Number.parseInt(fromInput.value, 10);
        const to = Number.parseInt(toInput.value, 10);

        const hasFrom = !Number.isNaN(from);
        const hasTo = !Number.isNaN(to);

        if (hasFrom && hasTo && from >= to) {
          toInput.setCustomValidity(
            "The 'To year' must be greater than the 'From year'.",
          );
        } else {
          toInput.setCustomValidity("");
        }
      });
    },
      dispose() {
    const container = document.querySelector<HTMLElement>(containerId);

    if (container) {
      container.innerHTML = "";
    }
  },
  };
},

// Refinements do not know about the custom date filter,
// so add a custom current refinement.
// This mimics the Algolia CurrentRefinements structure/classes.

customDateCurrentRefinement: (containerId: string) => {
  return {
     $$type: "custom.dateRange",
    render({ helper }: RenderOptions) {
      const container =
        document.querySelector<HTMLElement>(containerId);

      if (!container) return;

      const list =
        container.querySelector<HTMLElement>(
          ".ais-CurrentRefinements-list",
        );

      if (!list) return;

      // Remove the old custom refinement if it exists.
      const existing =
        list.querySelector(".custom-date-refinement");

      if (existing) {
        existing.remove();
      }

      const filters = helper.state.filters;

      if (!filters) return;

      const refItem = document.createElement("li");

      refItem.className =
        "ais-CurrentRefinements-item custom-date-refinement";

      refItem.innerHTML = `
        <span class="ais-CurrentRefinements-label">
          Year range active
        </span>

        <button
          class="ais-CurrentRefinements-delete"
          type="button"
        >
          ✕
        </button>
      `;

      const deleteButton =
        refItem.querySelector<HTMLButtonElement>("button");

      if (!deleteButton) return;

      deleteButton.addEventListener("click", () => {
        helper.setQueryParameter("filters", "");
        helper.search();
      });

      list.appendChild(refItem);
    },
      dispose() {
    const container = document.querySelector<HTMLElement>(containerId);

    if (container) {
      container.innerHTML = "";
    }
  },
  };
},


}

// function to wrap refinements filter in a panel
function wrapInPanel(title: string) {
  return panel({
    //collapsed: () => true,
    collapsed: ({ state }) => {
			return state?.query?.length === 0;
		}, // collapse if no query 
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
// function to wrap hierarchical menu refinements filter in a panel
function wrapHierarcicalMenuInPanel(title: string) {
	return panel({
		//collapsed: () => true, // Always collapsed by default
		collapsed: ({ state }) => {
			return state?.query?.length === 0;
		}, // collapse if no query 
		templates: {
			header(_, { html }) {
				return html` <span class="normal-case text-base font-normal">${title}</span>`;
			},
		},
		cssClasses: {
			header: "cursor-pointer relative z-10",
			collapseButton: "absolute inset-0 z-20 flex flex-row-reverse",
			collapseIcon: "",
			root: "border-b",
		},
	})(hierarchicalMenu);
}

