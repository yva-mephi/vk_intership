export type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "age"
  | "position"
  | "department"
  | "hireDate"
  | "salary"
  | "remote"
  | "city"
  | "phone"
  | "experience"
  | "education"
  | "isManager"
  | "language";

export interface FieldDefinition {
  key: FieldKey;
  label: string;
  type: "string" | "number" | "boolean" | "date" | "email";
  placeholder?: string;
  hint?: string;
}

export const fieldDefinitions: FieldDefinition[] = [
  {
    key: "firstName",
    label: "Имя",
    type: "string",
    placeholder: "Иван",
    hint: "Только буквы.",
  },
  {
    key: "lastName",
    label: "Фамилия",
    type: "string",
    placeholder: "Иванов",
    hint: "Только буквы.",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "ivan@example.com",
    hint: "Email в формате name@example.com.",
  },
  {
    key: "age",
    label: "Возраст",
    type: "number",
    placeholder: "30",
    hint: "Число от 18 до 99.",
  },
  {
    key: "position",
    label: "Должность",
    type: "string",
    placeholder: "Frontend разработчик",
    hint: "Название вашей должности.",
  },
  {
    key: "department",
    label: "Отдел",
    type: "string",
    placeholder: "Разработка",
    hint: "Название отдела.",
  },
  {
    key: "hireDate",
    label: "Дата найма",
    type: "date",
    placeholder: "2024-01-01",
    hint: "Формат даты: ГГГГ-ММ-ДД.",
  },
  {
    key: "salary",
    label: "Оклад",
    type: "number",
    placeholder: "75000",
    hint: "Число от 10000 до 500000.",
  },
  {
    key: "remote",
    label: "Удаленная работа",
    type: "boolean",
    placeholder: "true/false",
    hint: "true или false.",
  },
  {
    key: "city",
    label: "Город",
    type: "string",
    placeholder: "Москва",
    hint: "Название города проживания.",
  },
  {
    key: "phone",
    label: "Телефон",
    type: "string",
    placeholder: "+7 900 123 4567",
    hint: "Телефон в формате +7 XXX XXX XX XX.",
  },
  {
    key: "experience",
    label: "Опыт (лет)",
    type: "number",
    placeholder: "3",
    hint: "Целое число от 0 до 50.",
  },
  {
    key: "education",
    label: "Образование",
    type: "string",
    placeholder: "Высшее",
    hint: "Название степени или уровня.",
  },
  {
    key: "isManager",
    label: "Руководитель",
    type: "boolean",
    placeholder: "true/false",
    hint: "true или false.",
  },
  {
    key: "language",
    label: "Язык",
    type: "string",
    placeholder: "Английский",
    hint: "Основной рабочий язык.",
  },
];
