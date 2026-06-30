import { highlight } from "instantsearch.js/es/helpers";

export const searchBoxTemplate = {
    
}

export interface PassageHit {
  loi_id: string;
  title: string;
  manuscript: string;
  work: {
    author: {
      name: string;
    };
  };
}

export const hitTemplates = {
  empty(_items : PassageHit[], { html }) {
    return html`
      <p class="p-4 text-gray-600">No matches.</p>
    `;
  },

  item(hit : PassageHit, { html }) {
    const href = (`/passages/${hit.loi_id}`);

    return html`
      <article
        class="relative isolate w-full p-2 md:px-4 border-brand-300 border rounded-md"
      >
        <h2
          class="text-lg underline underline-offset-2 font-semibold text-brand-800 break-words"
        >
          <a href="${href}">
            <span class="absolute inset-0 z-10 bg-brand-300/15"></span>

            ${highlight({
              attribute: "title",
              hit,
            })}
          </a>
        </h2>
      </article>
    `;
  },
};