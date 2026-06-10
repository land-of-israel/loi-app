import keywords from '$lib/data/processed/keywords.json';
export function load() {
  return {
    keywords, breadcrumbs: [{label: "Keywords"}]
  };
}