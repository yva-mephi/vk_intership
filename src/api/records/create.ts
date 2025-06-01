import axios from "axios";
import type { RecordPayload } from "../../types/recordType";

export const createRecord = async (BASE_URL: string, data: RecordPayload) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};
