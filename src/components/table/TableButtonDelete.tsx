import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { rootStore } from "../../store/rootStore";

type Props = {
  id: string | number;
};

const TableButtonDelete = ({ id }: Props) => {
  const handleDelete = () => {
    rootStore.tableStore.deleteRecord(id);
  };

  return (
    <IconButton size="small" onClick={handleDelete}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

export default TableButtonDelete;
