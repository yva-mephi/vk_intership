export const parseValue = (val: any): any => {
  if (typeof val === "string" && !isNaN(Number(val))) {
    return Number(val);
  }
  return val;
};
