import { format } from "date-fns";

export enum DateFormat {
  "yyyy-MM-ddThh:mm" = "yyyy-MM-dd$$hh:mm",
}

export function formatDateToString(date: Date, dateFormat: DateFormat) {
  return format(date, dateFormat);
}
