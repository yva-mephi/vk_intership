import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { recordsApi } from "../api/api";
import type { RecordType } from "../types/recordType";

vi.mock("axios");
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

describe("recordsApi (axios)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен вернуть список записей при успешном запросе", async () => {
    const mockData: RecordType[] = [{ id: 1, name: "Test" }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await recordsApi.get(0, 10);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:3001/records",
      {
        params: {
          _start: 0,
          _limit: 10,
        },
      }
    );
  });

  it("должен выбросить ошибку при неуспешном запросе", async () => {
    mockedAxios.get.mockRejectedValueOnce(
      new Error("Ошибка при загрузке записей")
    );

    await expect(recordsApi.get(0, 20)).rejects.toThrow(
      "Ошибка при загрузке записей"
    );
  });

  it("должен создать запись и вернуть её", async () => {
    const newRecord = { name: "New", age: 42 };
    const responseRecord = { id: 2, ...newRecord };
    mockedAxios.post.mockResolvedValueOnce({ data: responseRecord });

    const result = await recordsApi.create(newRecord);
    expect(result).toEqual(responseRecord);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3001/records",
      newRecord
    );
  });

  it("должен выбросить ошибку при неуспешном создании", async () => {
    mockedAxios.post.mockRejectedValueOnce(
      new Error("Ошибка при создании записи")
    );

    await expect(recordsApi.create({ name: "Broken" })).rejects.toThrow(
      "Ошибка при создании записи"
    );
  });

  it("должен удалить запись по id", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ status: 200 });

    await recordsApi.delete(1);
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "http://localhost:3001/records/1"
    );
  });

  it("должен выбросить ошибку при неуспешном удалении", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("Ошибка при удалении"));

    await expect(recordsApi.delete(999)).rejects.toThrow("Ошибка при удалении");
  });
});
