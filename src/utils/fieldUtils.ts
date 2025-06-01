import type { FieldKey } from "../types/tableTypes";
import { fieldDefinitions } from "../types/tableTypes";
import type { FieldValue } from "../store/formStore";
import { validateValue } from "../validation/validateFieldValue";

export function generateFields(count: number): FieldValue[] {
  return Array.from({ length: Math.max(5, Math.min(15, count)) }, () => ({
    key: "",
    value: "",
  }));
}

export function setFieldKey(
  fields: FieldValue[],
  index: number,
  key: FieldKey
): FieldValue[] {
  const updated = [...fields];
  updated[index] = { ...updated[index], key };

  const keys = updated.map((f) => f.key);
  const isLastFilled = keys.every((k) => k !== "");
  if (isLastFilled && updated.length < 15) {
    updated.push({ key: "", value: "" });
  }

  return updated;
}

export function setFieldValue(
  fields: FieldValue[],
  index: number,
  value: string,
  currentErrors: Record<string, string>
): { fields: FieldValue[]; errors: Record<string, string> } {
  const updated = [...fields];
  const key = updated[index].key;

  if (!key) return { fields: updated, errors: currentErrors };

  updated[index].value = value;

  const fieldDef = fieldDefinitions.find((f) => f.key === key);
  const errors = { ...currentErrors };

  if (!fieldDef || !validateValue(value, fieldDef)) {
    errors[key] = "Некорректное значение";
  } else {
    delete errors[key];
  }

  return { fields: updated, errors };
}

export function isDuplicateKey(fields: FieldValue[], index: number): boolean {
  const key = fields[index].key;
  return (
    key !== "" &&
    fields.filter((f, i) => i !== index && f.key === key).length > 0
  );
}
