import { createTable } from "@humanspeak/svelte-headless-table";
import {
  addTableFilter,
  addPagination,
  addSortBy,
  addColumnFilters,
  addHiddenColumns
} from "@humanspeak/svelte-headless-table/plugins";

import { readable } from "svelte/store";
import { textFilter } from "./helpers";

export type StylePlugin = {
  width?: string;
  align?: string;
};

export type VisibilityPlugin = {
  hideOnMobile?: boolean;
};

export type TableCustomPlugins = {
  style?: StylePlugin;
  visibility?: VisibilityPlugin
};

export function createDataTable<T>(
  data: T[],
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnBuilder: (table: any, col: any) => any[],
) {
      const table = createTable(readable(data), {
            filter: addTableFilter({
            fn: ({ filterValue, value }) =>
                String(value)
                .toLowerCase()
                .includes(String(filterValue).toLowerCase())
            }),

            colFilter: addColumnFilters(),

            page: addPagination({
            initialPageSize: 10
            }),

            sort: addSortBy(),

            hide: addHiddenColumns({
              initialHiddenColumnIds: []
            })
        });
    type ColumnDef = Parameters<typeof table.column>[0] & {
        plugins?: TableCustomPlugins & Record<string, unknown>;
    };

  function col(def: ColumnDef) {
    return table.column({
        ...def,

        plugins: {
            colFilter: {
                fn: textFilter
            },

            ...def.plugins
        }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    }
    const columns = table.createColumns(
    columnBuilder(table, col)
  );
    return {
    table,
    columns
  };
}