import { highlight } from "instantsearch.js/es/helpers";

export const searchBoxTemplate = {

}

export interface PassageHit {
  rec_id: string;
  title: string;
  text: string;
  work: string;  
  author: string;
  genre: string;
  date: string;
}

export const hitTemplates = {
  empty(_items : PassageHit[], { html }) {
    return html`
      <p class="p-4 text-gray-600">No matches.</p>
    `;
  },

  item(hit : PassageHit, { html }) {
    const href = (`/passages/${hit.rec_id}`);

    return html`
      <article
        class="relative isolate w-full p-2 md:px-4 border-l-brand-700 border rounded-md"
      >
        <h2
          class="text-lg underline underline-offset-2 font-semibold text-brand-800 break-words"
        >
          <a href="${href}">
            <span class="absolute inset-0 z-10 bg-brand-300/15"></span>

            ${hit.title || 'No title available'}
          </a>
        </h2>
        <div class="text-gray-700">
			<dl class="md:grid grid-cols-[1fr_5fr] p-2 break-inside-avoid-column">
                <dt class="font-semibold pr-2">Author:</dt>
                <dd class="pl-5">${hit.author}</dd>
                <dt class="font-semibold pr-2">Work:</dt>
                <dd class="pl-5">${hit.work}</dd>
                <dt class="font-semibold pr-2">Date:</dt>
                <dd class="pl-5">${hit.date}</dd>
            </dl>
        </div>
      </article>
    `;
  },
};