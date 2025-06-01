import { makeAutoObservable, action, runInAction } from "mobx";
import { recordsApi } from "../../api/api";
import { loadNextPage } from "./dataLoader";
import { sortRecords } from "./sorter";
import type { RecordType } from "../../types/recordType";

export class TableStore {
  rootStore: unknown;
  records: RecordType[] = [];
  isLoading = false;
  hasMoreData = true;
  fieldNames: string[] = [];
  sortBy: string | null = null;
  sortOrder: "asc" | "desc" = "asc";

  constructor(rootStore: unknown) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetchNextPage = action(async () => {
    await loadNextPage(
      this.records,
      this.fieldNames,
      (newRecords) => {
        this.records = newRecords;
      },
      (newFieldNames) => {
        this.fieldNames = newFieldNames;
      },
      (isLoading) => {
        this.isLoading = isLoading;
      },
      (hasMoreData) => {
        this.hasMoreData = hasMoreData;
      }
    );
  });

  addNewRecord = action((newRecord: RecordType) => {
    this.records.unshift(newRecord);
    for (const key in newRecord) {
      if (!this.fieldNames.includes(key)) {
        this.fieldNames.push(key);
      }
    }
  });

  setSort = action((field: string) => {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    } else {
      this.sortBy = field;
      this.sortOrder = "asc";
    }

    sortRecords(
      this.records,
      this.sortBy,
      this.sortOrder,
      (newSortBy) => {
        this.sortBy = newSortBy;
      },
      (newSortOrder) => {
        this.sortOrder = newSortOrder;
      },
      (sortedRecords) => {
        this.records = sortedRecords;
      }
    );
  });

  deleteRecord = async (id: string | number) => {
    try {
      await recordsApi.delete(id);
      runInAction(() => {
        this.records = this.records.filter((r) => r.id !== id);
      });
    } catch (e) {
      console.error("Ошибка удаления", e);
    }
  };
}
