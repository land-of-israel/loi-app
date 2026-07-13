import type { resolve } from '$app/paths';
import type { HitsTemplates } from 'instantsearch.js/es/widgets/hits/hits';
import type { Hit } from "instantsearch.js";

interface PassageHit {
  rec_id: string;
  title: string;
  text: string;
  work: string;  
  author: string;
  genre: string;
  date: string;
  language: string;
  text_en: string;
  commentary: string;
  hasQuery?: boolean;
}
import {langMap} from '$lib/utils';


export function hitTemplates(resolveFn: typeof resolve): HitsTemplates<Hit<PassageHit>> {
     return {
        item(hit, { html, components }) {          
        const href = resolveFn('/passages/[id]', {
            id: hit.rec_id
            });
        
        const lang = langMap[hit.language] || undefined;
        const dir = lang ? "rtl" : "ltr";
       
        return html`
         <article
        class="relative isolate w-full p-2 md:px-4 border-l-brand-700 border rounded-md"
      >
        <h2
          class="text-lg underline underline-offset-2 font-semibold text-brand-800 wrap-break-word"
        >
        <a href="${href}">
         <span class="absolute md:static inset-0 z-10 bg-brand-300/15"></span>

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
                <dt class="font-semibold pr-2">Text:</dt>
               <dd dir=${dir} lang=${lang} class="pl-5">
                 ${components.Snippet({
                    attribute: "text",
                    hit
                  })}
              </dd>
              <dt class="font-semibold pr-2">Translation (EN):</dt>
              <dd class="pl-5 text-sm">
                 ${components.Snippet({
                    attribute: "text_en",
                    hit
                  })}
              </dd>
              <dt class="font-semibold pr-2">Commentary:</dt>
              <dd class="pl-5 text-sm">
                  ${components.Snippet({
                    attribute: "commentary",
                    hit
                  })}
              </dd>
            </dl>
        </div>
      </article>
    `;
    }
  };
}

