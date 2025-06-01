import { observer } from "mobx-react-lite";
import { rootStore } from "../../store/rootStore";
import FieldRow from "./FieldRow";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Counter from "./Counter";

interface CreateRecordFormProps {
  onClose: () => void;
  onSubmit: (newRecord: Record<string, any>) => void;
}

const CreateRecordForm = observer(
  ({ onClose, onSubmit }: CreateRecordFormProps) => {
    useEffect(() => {
      rootStore.formStore.resetForm();
    }, []);

    const handleSubmit = async () => {
      const newRecord = await rootStore.formStore.submitForm();
      if (newRecord) {
        onSubmit(newRecord);
        onClose();
      }
    };

    return (
      <Dialog open fullWidth maxWidth="md">
        <DialogTitle>
          Добавить новую запись
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Counter
            count={rootStore.formStore.fields.length}
            onIncrease={() => rootStore.formStore.addField()}
            onDecrease={() => rootStore.formStore.removeField()}
          />

          {rootStore.formStore.fields.map((_, i) => (
            <FieldRow key={i} index={i} />
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !rootStore.formStore.isFormValid() ||
              rootStore.formStore.isSubmitting
            }
            startIcon={<AddIcon />}
          >
            Создать запись
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default CreateRecordForm;
