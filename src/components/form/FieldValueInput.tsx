import { TextField, MenuItem } from "@mui/material";
import { fieldDefinitions } from "../../types/tableTypes";
import type { FieldKey } from "../../types/tableTypes";

interface Props {
    fieldKey?: FieldKey;
    value: string;
    error?: string;
    onChange: (val: string) => void;
}

const FieldValueInput = ({ fieldKey, value, error, onChange }: Props) => {
    const fieldDef = fieldDefinitions.find((def) => def.key === fieldKey);

    if (!fieldKey) return null;

    switch (fieldDef?.type) {
        case "boolean":
            return (
                <TextField
                    select
                    label="Значение"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ flex: 1 }}
                >
                    <MenuItem value="true">Да</MenuItem>
                    <MenuItem value="false">Нет</MenuItem>
                </TextField>
            );
        case "date":
            return (
                <TextField
                    label="Дата"
                    placeholder="ГГГГ-ММ-ДД"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    error={!!error}
                    helperText={error || "Введите дату в формате ГГГГ-ММ-ДД"}
                    sx={{ flex: 1 }}
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "\\d{4}-\\d{2}-\\d{2}",
                        maxLength: 10,
                    }}
                />
            );
        default:
            return (
                <TextField
                    label="Значение"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ flex: 1 }}
                    type={
                        fieldDef?.type === "email"
                            ? "email"
                            : fieldDef?.type === "number"
                                ? "number"
                                : "text"
                    }
                />
            );
    }
};

export default FieldValueInput;
