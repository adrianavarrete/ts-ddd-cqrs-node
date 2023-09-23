const _ = require("lodash");
const ValueObject = require("./value_object");

function idError({
  value,
  message = "this is an error",
}: {
  value: string;
  message: string | null;
}) {
  return new Error(`${message} --> value: ${value}`);
}

export class Id extends ValueObject<string> {
  constructor(value: string) {
    if (!_.isString(value)) {
      throw idError({ value, message: null });
    }
    super(value);
  }
}
