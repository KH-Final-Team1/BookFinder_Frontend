const REGEXP_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEXP_PASSWORD = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+]).{8,20}$/;
const REGEXP_NICKNAME = /^[가-힣a-zA-Z0-9]{3,20}$/;
const REGEXP_PHONE = /^01[0-9][0-9]{3,4}[0-9]{4}$/;

export const testRegExp = (fieldName, value) => {
  if (fieldName === "email") {
    return !value || REGEXP_EMAIL.test(value);
  }
  if (fieldName === "password") {
    return !value || REGEXP_PASSWORD.test(value);
  }
  if (fieldName === "nickname") {
    return !value || REGEXP_NICKNAME.test(value);
  }
  if (fieldName === "phone") {
    return !value || REGEXP_PHONE.test(value);
  }
}