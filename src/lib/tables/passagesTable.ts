import type { PassageRow } from "$lib/types";
import type { ColumnDef } from '@tanstack/svelte-table'
import {features} from "$lib/tables/tableFeatures"


const ColumnVisibility = {
    taq: false,
    tpq: false,
    parallels: false,
    translation_en: false,
    translation_de: false,
    language: false,
    bibl_quotes: false
}

export const passageTableConfig = {
  desktopVisibility: ColumnVisibility,  

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
    meta: {
      mobileVisible: false
    }
  },

   {
    accessorKey: 'text',
    header: 'Text',
    size: 250, 
     meta: {  
      dir: "rtl",                
      textAlign: "text-right",
      mobileVisible: false
                },
  },

   {
    accessorKey: 'language',
    header: 'Language',
    meta: {
      mobileVisible: false
    }
  },

   {
    accessorKey: 'tpq',
    header: 'Date TPQ',
    filterFn: 'filterTpq',
    size: 60,
    meta: {
      mobileVisible: false
    }
  },

   {
    accessorKey: 'taq',
    header: 'Date TAQ',
    filterFn: 'filterTaq',
    meta: {
      mobileVisible: false
    }

  },

  {
    accessorKey: 'parallels',
    header: 'Parallels',
    meta: {
      mobileVisible: false
    }
    
  },

  {
    accessorKey: 'bibl_quotes',
    header: 'Bible quotes',
    meta: {
      mobileVisible: false
    }
  },

   {
    accessorKey: 'translation_en',
    header: 'English',
    meta: {
      mobileVisible: false
    }
  },

   {
    accessorKey: 'translation_de',
    header: 'German',
    meta: {
      mobileVisible: false
    }
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

