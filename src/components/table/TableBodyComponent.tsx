import { observer } from "mobx-react-lite";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { rootStore } from "../../store/rootStore";
import TableButtonDelete from "./TableButtonDelete";
import { formatValue } from "../../utils/formatValue";

const TableBodyComponent = observer(() => (
  <TableBody>
    {rootStore.tableStore.records.map((record) => (
      <TableRow
        key={String(record.id)}
        sx={{
          "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell>
          <TableButtonDelete id={String(record.id)} />
        </TableCell>
        {Array.from(rootStore.tableStore.fieldNames).map((key) => (
          <TableCell key={key}>{formatValue(key, record[key])}</TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
));

export default TableBodyComponent;
