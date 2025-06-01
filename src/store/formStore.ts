import { makeAutoObservable, runInAction } from "mobx";
import { recordsApi } from "../api/api";
import {
  generateFields,
  setFieldKey,
  setFieldValue,
  isDuplicateKey,
} from "../utils/fieldUtils";
import { validateForm } from "../validation/validateFormState";
import type { FieldKey } from "../types/tableTypes";
import { fieldDefinitions } from "../types/tableTypes";
import { v4 as uuidv4 } from "uuid";

export interface FieldValue {
  key: FieldKey | "";
  value: string;
}

export class FormStore {
  rootStore: any;
  fields: FieldValue[] = [];
  errors: Record<string, string> = {};
  isSubmitting = false;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.setFieldCount(5);
  }

  setFieldCount(count: number) {
    this.fields = generateFields(count);
  }

  addField() {
    if (this.fields.length < 15) {
      this.fields.push({ key: "", value: "" });
    }
  }

  removeField(index?: number) {
    if (this.fields.length <= 5) return;
    if (index !== undefined) {
      this.fields.splice(index, 1);
    } else {
      this.fields.pop();
    }
  }

  setFieldKey(index: number, key: FieldKey) {
    this.fields = setFieldKey(this.fields, index, key);
    this.clearError(key);
  }

  setFieldValue(index: number, value: string) {
    const updated = setFieldValue(this.fields, index, value, this.errors);
    this.fields = updated.fields;
    this.errors = updated.errors;
  }

  getFieldHint(key: FieldKey): string | undefined {
    return fieldDefinitions.find((f) => f.key === key)?.hint;
  }

  isDuplicateKey(index: number): boolean {
    return isDuplicateKey(this.fields, index);
  }

  isFormValid(): boolean {
    return validateForm(this.fields, this.errors);
  }

  setError(key: string, msg: string) {
    this.errors[key] = msg;
  }

  clearError(key: string) {
    delete this.errors[key];
  }

  resetForm() {
    this.setFieldCount(5);
    this.errors = {};
  }

  async submitForm(): Promise<Record<
    string,
    string | number | boolean
  > | null> {
    if (this.isSubmitting) return null;
    this.isSubmitting = true;

    try {
      const payload = Object.fromEntries(
        this.fields.map(({ key, value }) => [key, value])
      );
      const newRecord = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        ...payload,
      };
      await recordsApi.create(newRecord);
      return newRecord;
    } catch (error) {
      console.error("Ошибка при создании записи:", error);
      return null;
    } finally {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  }
}
