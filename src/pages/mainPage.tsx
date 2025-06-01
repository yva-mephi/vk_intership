import { observer } from "mobx-react-lite";
import { Box, useMediaQuery } from "@mui/material";
import TableComponent from "../components/table/TableComponent";

const MainPage = observer(() => {
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
