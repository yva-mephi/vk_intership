import type { FieldValue } from "../store/formStore";

export function validateForm(
  fields: FieldValue[],
  errors: Record<string, string>
): boolean {
  const filled = fields.filter((f) => f.key && f.value);
  const hasDuplicates = filled.some((f, i) =>
    filled.some((other, j) => i !== j && f.key === other.key)
  );

  return (
    filled.length >= 5 &&
    filled.length <= 15 &&
    Object.keys(errors).length === 0 &&
    !hasDuplicates
  );
}
