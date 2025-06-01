import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import CreateRecordForm from "../components/form/CreateRecordForm";
import TableComponent from "../components/table/TableComponent";
import AddIcon from "@mui/icons-material/Add";
import { rootStore } from "../store/rootStore";
import { snackbarStore } from "../store/snackbarStore";
import type { RecordType } from "../types/recordType";

const MainPage = observer(() => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (newRecord: Record<string, unknown>) => {
    if (newRecord) {
      rootStore.tableStore.addNewRecord(newRecord as RecordType);
      snackbarStore.show("Запись успешно создана", "success");
    } else {
      snackbarStore.show("Ошибка при создании записи", "error");
    }
    setIsFormOpen(false);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "100px",
          borderBottom: "1px solid #ccc",
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <span>Header</span>
        <IconButton color="primary" onClick={() => setIsFormOpen(true)}>
          <AddIcon />
        </IconButton>
      </Box>

      {isFormOpen && (
        <CreateRecordForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pt: 2,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 1,
          paddingTop: 0,
          px: 2,
          transform: isMobile ? "scale(0.85)" : "none",
          transformOrigin: "top left",
          width: isMobile ? "117%" : "100%",
          height: isMobile ? "117%" : "100%",
        }}
      >
        <TableComponent />
      </Box>
    </Box>
  );
});

export default MainPage;
