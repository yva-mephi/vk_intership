import { FormStore } from "./formStore";
import { TableStore } from "./table/tableStore";
import { snackbarStore } from "./snackbarStore";

export class RootStore {
  tableStore: TableStore;
  formStore: FormStore;

  constructor() {
    this.tableStore = new TableStore(this);
    this.formStore = new FormStore(this);
  }
}

export const rootStore = new RootStore();
export { snackbarStore };
