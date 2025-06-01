export const formatValue = (_key: string, value: unknown): string => {
  if (typeof value === "string") {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    const shortDateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (isoDateRegex.test(value)) {
      const date = new Date(value);
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }

    if (shortDateRegex.test(value)) {
      const date = new Date(value + "T00:00:00");
      return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  }

  if (typeof value === "boolean") return value ? "Да" : "Нет";
  if (value == null) return "";
  return String(value);
};
