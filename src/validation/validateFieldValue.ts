import { fieldDefinitions } from "../types/tableTypes";

export function validateValue(
  value: string,
  fieldDef: (typeof fieldDefinitions)[number]
): boolean {
  switch (fieldDef.type) {
    case "string":
      const trimmed = value.trim();
      if (trimmed.length < 1 || trimmed.length > 100) return false;

      // Специальная проверка для имени и фамилии
      if (["firstName", "lastName"].includes(fieldDef.key)) {
        const nameRegex = /^[A-Za-zА-Яа-яЁё\-]+$/;
        return nameRegex.test(trimmed);
      }

      // Проверка для phone
      if (fieldDef.key === "phone") {
        const phoneRegex = /^\+7\s?\d{3}\s?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
        return phoneRegex.test(trimmed);
      }

      return true;

    case "number":
      const numValue = Number(value);
      if (isNaN(numValue)) return false;

      if (fieldDef.key === "age") return numValue >= 18 && numValue <= 99;
      if (fieldDef.key === "salary")
        return numValue >= 10000 && numValue <= 500000;
      if (fieldDef.key === "experience") return numValue >= 0 && numValue <= 50;

      return true;

    case "boolean":
      return ["true", "false"].includes(value.toLowerCase());

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);

    case "date":
      return isValidDate(value);

    default:
      return true;
  }
}

const isValidDate = (value: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isValid && year >= 1980 && year <= new Date().getFullYear();
};
