import { Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { fieldDefinitions } from "../../types/tableTypes";
import type { FieldKey } from "../../types/tableTypes";

interface Props {
    fieldKey?: FieldKey;
}

const FieldHintIcon = ({ fieldKey }: Props) => {
    const hint = fieldDefinitions.find(def => def.key === fieldKey)?.hint || "Информация о поле";

    return (
        <Tooltip title={hint} placement="right">
            <IconButton size="small" color="primary">
                <InfoIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );
};

export default FieldHintIcon;
