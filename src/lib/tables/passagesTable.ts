import type { PassageRow } from "$lib/types";
import type { ColumnDef, ColumnVisibilityState } from '@tanstack/svelte-table'
import { createAtom } from '@tanstack/svelte-store'
import {features} from "$lib/tables/tableFeatures"


const passageColumnVisibility = createAtom<ColumnVisibilityState>({
    taq: false,
    tpq: false,
    parallels: false,
    translation_en: false,
    translation_de: false,
    language: false,
    bibl_quotes: false
})

export const passageTableConfig = {
   columnVisibility: passageColumnVisibility,

columns: [
  {
    accessorKey: 'title',
    header: 'Title',
  },  

  {
    accessorKey: 'workTitle',
    header: 'Work',
  },

  {
    accessorKey: 'author',
    header: 'Author',
  },

  {
    accessorKey: 'genre',
    header: 'Genre',
  },

   {
    accessorKey: 'text',
    header: 'Text',
    size: 250, 
     meta: {  
      dir: "rtl",                
      textAlign: "text-right"
                },
  },

   {
    accessorKey: 'language',
    header: 'Language',
  },

   {
    accessorKey: 'tpq',
    header: 'Date TPQ',
    filterFn: 'filterTpq',
    size: 60
  },

   {
    accessorKey: 'taq',
    header: 'Date TAQ',
    filterFn: 'filterTaq'

  },

  {
    accessorKey: 'parallels',
    header: 'Parallels',
    
  },

  {
    accessorKey: 'bibl_quotes',
    header: 'Bible quotes',
  },

   {
    accessorKey: 'translation_en',
    header: 'English',
  },

   {
    accessorKey: 'translation_de',
    header: 'German',
  },

] satisfies ColumnDef<typeof features, PassageRow>[], 
}

// export function createPassagesTable(data: PassageRow[]) {
//   return createDataTable(data, (table, col) => [
//         col({
//           id: "title",  
//           header: "Title",
//             accessor: "title",
//             plugins: { 
              
//             }
//           }),
//           col({
//             id: "work",
//             header: "Work",
//             accessor: "workTitle",  
//             plugins: {
//              visibility: {
//                   hideOnMobile: true
//                 }
//             }         
//           }),

//           col({
//             id: "author",
//             header: "Author",
//             accessor: "author",
//             plugins: {
//              visibility: {
//                   hideOnMobile: true
//                 }
//             }
//           }),

//            col({
//             id: "genre",
//             header: "Genre",
//             accessor: "genre",
//             plugins: {
//              visibility: {
//               hideOnMobile: true
//             }
//             }
//           }),

//           col({
//             id: "text",
//               header: "Text",
//               accessor: "text",
//               cell: ({ value }: {value: string }) => value.substring(0, 200) + "...",
//               plugins: {
//                 style: {                  
//                   align: "text-right"
//                 },
//                 visibility: {
//                   hideOnMobile: true
//                 }
//               }
//             }),

//            col({
//             id: "language",
//             header: "Language",
//             accessor: "language",
//             plugins: {
//              visibility: {
//               hideOnMobile: true,
//               initiallyHidden: true
//             }
//             }
//           }),
//            col({
//             id: "tpq",
//             header: "Date TPQ",
//             accessor: "tpq",
//             plugins: {
//              visibility: {
//               hideOnMobile: true
//             }
//             }
//           }),
//            col({
//             id: "passages-taq",
//             header: "Date TAQ",
//             accessor: "taq",
//             plugins: {
//              visibility: {
//               hideOnMobile: true
//             }
//             }
//           }),
//            col({
//             header: "Paralles",
//             accessor: "parallels",
//             plugins: {
//              visibility: {
//               initiallyHidden: true,
//               hideOnMobile: true
//             }
//             }
//           }),
//           col({
//             header: "Bible quotes",
//             accessor: "bibl_quotes",
//             plugins: {
//              visibility: {
//               hideOnMobile: true,
//               initiallyHidden: true,
//             }
//             }
//           }),
//           col({
//             header: "English",
//             accessor: "translation_en",
//             plugins: {
//              visibility: {
//               hideOnMobile: true,
//               initiallyHidden: true,
//             }
//             }
//           }),
//           col({
//             header: "German",
//             accessor: "btranslation_de",
//             plugins: {
//              visibility: {
//               hideOnMobile: true,
//               initiallyHidden: true,
//             }
//             }
//           })
//     ])
//   }

