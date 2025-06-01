import { observer } from "mobx-react-lite";
import { Snackbar, Alert } from "@mui/material";
import { snackbarStore } from "../store/snackbarStore";

const GlobalSnackbar = observer(() => {
  return (
    <Snackbar
      open={snackbarStore.open}
      autoHideDuration={4000}
      onClose={() => snackbarStore.close()}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={snackbarStore.severity}
        onClose={() => snackbarStore.close()}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarStore.message}
      </Alert>
    </Snackbar>
  );
});

export default GlobalSnackbar;
