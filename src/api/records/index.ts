import { createRecord } from "./create";
import { getRecords } from "./get";
import { deleteRecord } from "./delete";
import type { RecordPayload } from "../../types/recordType";

export class RecordsApi {
  private readonly BASE_URL = "http://localhost:3001/records";

  create(data: RecordPayload) {
    return createRecord(this.BASE_URL, data);
  }

  get(start: number, limit: number) {
    return getRecords(this.BASE_URL, start, limit);
  }

  delete(id: string | number) {
    return deleteRecord(this.BASE_URL, id);
  }
}
