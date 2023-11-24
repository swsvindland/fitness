import { addDays } from "date-fns";

export const today = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const tomorrow = () => {
  return addDays(today(), 1);
};
