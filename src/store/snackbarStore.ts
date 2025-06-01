import { makeAutoObservable } from "mobx";

export type SnackbarSeverity = "success" | "error" | "info" | "warning";

class SnackbarStore {
  open = false;
  message = "";
  severity: SnackbarSeverity = "info";

  constructor() {
    makeAutoObservable(this);
  }

  show(message: string, severity: SnackbarSeverity = "info") {
    this.message = message;
    this.severity = severity;
    this.open = true;
  }

  close() {
    this.open = false;
  }
}

export const snackbarStore = new SnackbarStore();
