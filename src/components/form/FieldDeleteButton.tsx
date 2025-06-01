import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  onDelete: () => void;
  disabled: boolean;
}

const FieldDeleteButton = ({ onDelete, disabled }: Props) => {
  return (
    <Tooltip title="Удалить поле" placement="left">
      <span>
        <IconButton
          size="small"
          color="error"
          onClick={onDelete}
          disabled={disabled}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default FieldDeleteButton;
