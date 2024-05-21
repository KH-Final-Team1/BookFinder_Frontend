import {testRegExp} from "./regexp";

export const initialInputFields = (name) => {
  return {
    name: name,
    value: "",
    valid: true,
    disabled: false
  }
}

export const handleInputChange = (field, setFields, value) => {
  setFields(prevState => ({
    ...prevState,
    [field.name]: {
      ...prevState[field.name],
      value: value,
      valid: field.name === "passwordConfirm"
          ? value === prevState.password.value
          : isValid(field.name, value),
      duplicate: false
    }
  }))
}

export const buttonValid = (fields) => {
  return Object.values(fields).every(value => {
    if (value.name === "passwordConfirm") {
      return fields.password.value === value.value;
    }
    return testRegExp(value.name, value.value);
  })
}

const isValid = (fieldName, value) => {
  return (!value) || testRegExp(fieldName, value)
}
