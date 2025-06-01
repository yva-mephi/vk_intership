import { describe, it, beforeEach, expect } from "vitest";
import { FormStore } from "../store/formStore";
import { RootStore } from "../store/rootStore";
import axios from "axios";
import { vi } from "vitest";
import type { FieldKey } from "../types/tableTypes";
vi.mock("axios");
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};

describe("FormStore", () => {
  let formStore: FormStore;

  beforeEach(() => {
    vi.clearAllMocks();
    const rootStore = new RootStore();
    formStore = new FormStore(rootStore);
  });

  it("должен инициализироваться с 5 полями", () => {
    expect(formStore.fields).toHaveLength(5);
  });

  it("должен добавлять новое поле", () => {
    formStore.addField();
    expect(formStore.fields).toHaveLength(6);
  });

  it("не должен добавлять поле больше лимита (15)", () => {
    for (let i = 0; i < 20; i++) {
      formStore.addField();
    }
    expect(formStore.fields.length).toBeLessThanOrEqual(15);
  });

  it("должен удалять поле", () => {
    formStore.addField();
    formStore.removeField();
    expect(formStore.fields).toHaveLength(5);
  });

  it("не должен удалять поле если их 5 или меньше", () => {
    formStore.removeField();
    expect(formStore.fields).toHaveLength(5);
  });

  it("должен устанавливать ключ и очищать ошибку", () => {
    formStore.setError("name", "Ошибка");
    formStore.setFieldKey(0, "name" as FieldKey);
    expect(formStore.fields[0].key).toBe("name");
    expect(formStore.errors["name"]).toBeUndefined();
  });

  it("должен устанавливать значение и обновлять ошибки", () => {
    formStore.setFieldKey(0, "name" as FieldKey);
    formStore.setFieldValue(0, "123");
    expect(formStore.fields[0].value).toBe("123");
  });

  it("должен сбрасывать форму", () => {
    formStore.addField();
    formStore.setError("test", "some");
    formStore.resetForm();
    expect(formStore.fields).toHaveLength(5);
    expect(Object.keys(formStore.errors)).toHaveLength(0);
  });

  it("submitForm: должен отправить данные и вернуть запись", async () => {
    const mockedResponse = {
      data: {
        id: "some-id",
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockedResponse);

    formStore.fields[0] = { key: "name" as FieldKey, value: "Test" };

    const result = await formStore.submitForm();

    expect(result).toHaveProperty("id");
    expect(typeof result?.id).toBe("string");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3001/records",
      expect.objectContaining({
        name: "Test",
      })
    );
  });

  it("submitForm: должен вернуть null при ошибке", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockedAxios.post.mockRejectedValueOnce(new Error("Ошибка запроса"));

    const result = await formStore.submitForm();
    expect(result).toBeNull();

    consoleSpy.mockRestore();
  });
});
