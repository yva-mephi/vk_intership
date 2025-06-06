import { recordsApi } from "../../api/api";
import type { RecordType } from "../../types/recordType";
import { runInAction } from "mobx";

export const loadNextPage = async (
  records: RecordType[],
  fieldNames: string[],
  setRecords: (newRecords: RecordType[]) => void,
  setFieldNames: (newFieldNames: string[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  setHasMoreData: (hasMoreData: boolean) => void
) => {
  const start = records.length;
  const limit = 20;

  runInAction(() => setIsLoading(true));

  try {
    const data = await recordsApi.get(start, limit);
    runInAction(() => {
      if (data.length === 0) {
        setHasMoreData(false);
      }

      const newFieldNamesSet = new Set(fieldNames);
      data.forEach((record) => {
        Object.keys(record).forEach((key) => newFieldNamesSet.add(key));
      });

      setFieldNames(Array.from(newFieldNamesSet));
      setRecords([...records, ...data]);
    });
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  } finally {
    runInAction(() => setIsLoading(false));
  }
};
