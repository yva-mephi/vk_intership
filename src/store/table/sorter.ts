import { parseValue } from "../../utils/parseValue";

export const sortRecords = <T extends Record<string, unknown>>(
  records: T[],
  sortBy: string | null,
  sortOrder: "asc" | "desc",
  _setSortBy: (sortBy: string | null) => void,
  _setSortOrder: (sortOrder: "asc" | "desc") => void,
  setRecords: (records: T[]) => void
) => {
  if (!sortBy) return;

  const order = sortOrder === "asc" ? 1 : -1;

  const sorted = [...records].sort((a, b) => {
    const valA = parseValue(a[sortBy]);
    const valB = parseValue(b[sortBy]);

    if (valA === undefined) return 1;
    if (valB === undefined) return -1;

    if (valA > valB) return order;
    if (valA < valB) return -order;
    return 0;
  });

  setRecords(sorted);
};

export const toggleSort = (
  currentSortBy: string | null,
  currentSortOrder: "asc" | "desc",
  setSortBy: (sortBy: string | null) => void,
  setSortOrder: (sortOrder: "asc" | "desc") => void
) => {
  if (currentSortBy) {
    setSortOrder(currentSortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortBy(null);
    setSortOrder("asc");
  }
};
