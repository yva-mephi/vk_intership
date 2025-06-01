import { TableStore } from "./table/tableStore";

export class RootStore {
  tableStore: TableStore;

  constructor() {
    this.tableStore = new TableStore(this);
  }
}

export const rootStore = new RootStore();
