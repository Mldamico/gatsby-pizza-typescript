import React, { useState } from "react";

export const useForm = (defaults: { [K: string]: any }) => {
  const [values, setValues] = useState(defaults);

  function updateValue(e: React.ChangeEvent<HTMLInputElement>): void {
    let value: string | number = e.target.value;
    if (e.target.type === "number") {
      value = parseInt(value);
    }
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
};
