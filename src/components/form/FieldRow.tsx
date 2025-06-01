import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../store/rootStore";
import FieldHintIcon from "./FieldHintIcon";
import FieldSelector from "./FieldSelector";
import FieldValueInput from "./FieldValueInput";
import FieldDeleteButton from "./FieldDeleteButton";
import type { FieldKey } from "../../types/tableTypes";

interface Props {
  index: number;
  fieldKey?: FieldKey;
}

const FieldRow = observer(({ index }: Props) => {
  const field = rootStore.formStore.fields[index];
  const error = rootStore.formStore.errors[field.key];
  const isDuplicate = rootStore.formStore.isDuplicateKey(index);

  return (
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      <FieldHintIcon fieldKey={field.key === "" ? undefined : field.key} />
      <FieldSelector
        value={field.key as FieldKey}
        onChange={(key) => rootStore.formStore.setFieldKey(index, key)}
        error={isDuplicate}
      />
      <FieldValueInput
        fieldKey={field.key === "" ? undefined : field.key}
        value={field.value}
        error={error}
        onChange={(val) => rootStore.formStore.setFieldValue(index, val)}
      />
      <FieldDeleteButton
        onDelete={() => rootStore.formStore.removeField(index)}
        disabled={rootStore.formStore.fields.length <= 5}
      />
    </Box>
  );
});

export default FieldRow;
