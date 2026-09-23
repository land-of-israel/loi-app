import '@tanstack/svelte-table'

declare module '@tanstack/svelte-table' {
  interface ColumnMeta {
    dir?: 'ltr' | 'rtl'
    textAlign?: 'text-left' | 'text-center' | 'text-right'
    mobileVisible?: boolean
  }
}

