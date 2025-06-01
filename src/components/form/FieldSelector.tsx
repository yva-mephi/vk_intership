import { TextField, MenuItem } from "@mui/material";
import { fieldDefinitions } from "../../types/tableTypes";
import type { FieldKey } from "../../types/tableTypes";

interface Props {
    value: FieldKey;
    onChange: (value: FieldKey) => void;
    error: boolean;
}

const FieldSelector = ({ value, onChange, error }: Props) => {
    return (
        <TextField
            select
            label="Поле"
            value={value}
            error={error}
            helperText={error ? "Поле уже выбрано" : ""}
            onChange={(e) => onChange(e.target.value as FieldKey)}
            sx={{ width: 200 }}
        >
            {fieldDefinitions.map((def) => (
                <MenuItem key={def.key} value={def.key}>
                    {def.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default FieldSelector;
