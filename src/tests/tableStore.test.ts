import { describe, it, beforeEach, expect, vi } from "vitest";
import axios from "axios";
import { TableStore } from "../store/table/tableStore";
import { RootStore } from "../store/rootStore";

vi.mock("axios");
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};
describe("TableStore", () => {
  let tableStore: TableStore;

  beforeEach(() => {
    vi.clearAllMocks();
    const rootStore = new RootStore();
    tableStore = new TableStore(rootStore);
  });

  it("fetchNextPage: должен загрузить записи и обновить fieldNames", async () => {
    const mockRecords = [
      { id: 1, name: "Alice", age: 30 },
      { id: 2, name: "Bob", age: 25 },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockRecords });

    await tableStore.fetchNextPage();

    expect(tableStore.records).toHaveLength(2);
    expect(tableStore.fieldNames).toEqual(
      expect.arrayContaining(["id", "name", "age"])
    );
    expect(tableStore.hasMoreData).toBe(true);
  });

  it("fetchNextPage: должен установить hasMoreData = false при пустом ответе", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    await tableStore.fetchNextPage();

    expect(tableStore.hasMoreData).toBe(false);
    expect(tableStore.records).toHaveLength(0);
  });

  it("addNewRecord: должен добавить новую запись и обновить fieldNames", () => {
    const newRecord = { id: 3, name: "Charlie", city: "Paris" };

    tableStore.addNewRecord(newRecord);

    expect(tableStore.records[0]).toEqual(newRecord);
    expect(tableStore.fieldNames).toEqual(
      expect.arrayContaining(["id", "name", "city"])
    );
  });

  it("setSort: должен отсортировать записи по числовому полю", () => {
    tableStore.records = [
      { id: 1, value: "100" },
      { id: 2, value: "20" },
      { id: 3, value: "300" },
    ];

    tableStore.setSort("value"); // asc
    expect(tableStore.records.map((r) => r.id)).toEqual([2, 1, 3]);

    tableStore.setSort("value"); // desc
    expect(tableStore.records.map((r) => r.id)).toEqual([3, 1, 2]);
  });

  it("deleteRecord: должен удалить запись по id", async () => {
    tableStore.records = [
      { id: "a", name: "A" },
      { id: "b", name: "B" },
    ];

    mockedAxios.delete.mockResolvedValueOnce({ status: 200 });

    await tableStore.deleteRecord("a");

    expect(tableStore.records).toHaveLength(1);
    expect(tableStore.records[0].id).toBe("b");
  });
});
