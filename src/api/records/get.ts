import axios from "axios";
import type { RecordPayload } from "../../types/recordType";

export const getRecords = async (
  BASE_URL: string,
  start: number,
  limit: number
): Promise<RecordPayload[]> => {
  const response = await axios.get(BASE_URL, {
    params: { _start: start, _limit: limit },
  });
  return response.data;
};
