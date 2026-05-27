export const textFilter = ({ filterValue, value }: {
    filterValue: unknown;
    value: unknown;
  }) => {
    const f = String(filterValue ?? "").toLowerCase();
    const v = String(value ?? "").toLowerCase();
    return v.includes(f);
  };