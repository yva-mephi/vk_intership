import { observer } from "mobx-react-lite";
import { TableHead, TableRow, TableCell } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { rootStore } from "../../store/rootStore";

const TableHeadComponent = observer(() => (
  <TableHead>
    <TableRow
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "background.paper",
        zIndex: 1,
        boxShadow: 1,
      }}
    >
      <TableCell />
      {Array.from(rootStore.tableStore.fieldNames).map((key) => (
        <TableCell
          key={key}
          sortDirection={
            rootStore.tableStore.sortBy === key
              ? rootStore.tableStore.sortOrder
              : false
          }
        >
          <TableSortLabel
            active={rootStore.tableStore.sortBy === key}
            direction={rootStore.tableStore.sortOrder}
            onClick={() => rootStore.tableStore.setSort(key)}
          >
            {key}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
));

export default TableHeadComponent;
