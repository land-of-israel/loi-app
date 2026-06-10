import passages from '$lib/data/processed/passages.json';

export function load() {
  return {
    passages, breadcrumbs: [{label: "Passages"}]
  };
}