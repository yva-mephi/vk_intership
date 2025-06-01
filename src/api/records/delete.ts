import axios from "axios";

export const deleteRecord = async (BASE_URL: string, id: string | number) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
