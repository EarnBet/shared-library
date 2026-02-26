import { Column, ColumnOptions } from "typeorm";

import { toDateTimeFormat } from "../date";

const dateTimeTransformer = {
  to: (value: Date | null) => {
    if (value && value.constructor?.name == "Date") {
      return toDateTimeFormat(value);
    }

    return value;
  },
  from: (value) => value,
};

const dateTimeColumnSettings: ColumnOptions = {
  type: "datetime",
  transformer: dateTimeTransformer,
};

export function DateTimeColumn(options: ColumnOptions) {
  return Column({
    ...dateTimeColumnSettings,
    ...options,
  });
}
