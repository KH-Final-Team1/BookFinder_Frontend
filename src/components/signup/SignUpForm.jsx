import {useState} from "react";
import InputField from "./InputField";
import Button from "../ui/Button";

const REGEXP_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEXP_PASSWORD = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+]).{8,20}$/;
const REGEXP_NICKNAME = /^[가-힣a-zA-Z0-9]{3,20}$/;
const REGEXP_PHONE = /^01[0-9][0-9]{3,4}[0-9]{4}$/;
export default function SignUpForm() {
  let [fields, setFields] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    address: "",
    phone: ""
  })
  let [validations, setValidations] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
    address: false,
    phone: false
  })

  let handleInputChange = (fieldName, value) => {
    setFields({
      ...fields,
      [fieldName]: fieldName === "phone" ? value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') : value
    })
    validateField(fieldName, value)
  }
  let validateField = (fieldName, value) => {
    setValidations({
      ...validations,
      [fieldName]: isValid(fieldName, value)
    })
  }

  let isValid = (fieldName, value) => {
    if (fieldName === "passwordConfirm" && value === fields.password) {
      return true;
    }
    return (fieldName === "email" && REGEXP_EMAIL.test(value))
        || (fieldName === "password" && REGEXP_PASSWORD.test(value))
        || (fieldName === "nickname" && REGEXP_NICKNAME.test(value))
        || (fieldName === "phone" && REGEXP_PHONE.test(value));
  }

  return (
      <div className="sign-up">
        <form className="sign-up">
          <InputField label="이메일"
                      type="email"
                      name="email"
                      value={fields.email}
                      placeholder="이메일을 입력해주세요."
                      eventHandler={(value) => handleInputChange("email", value)}
                      isValid={fields.email === "" || validations.email}
                      button={
                        <button className="checking-duplicate" disabled={!validations.email}>
                          중복확인
                        </button>}>
            <p className="invalid-caption">유효하지 않은 이메일 형식입니다.</p>
          </InputField>
          <InputField label="비밀번호"
                      type="password"
                      name="password"
                      value={fields.password}
                      placeholder="비밀번호를 입력해주세요."
                      eventHandler={(value) => handleInputChange("password", value)}
                      isValid={fields.password === "" || validations.password}>
            <p className="invalid-caption">영문, 숫자, 특수기호를 포함하여 8자 이상 20자 이하로 입력해주세요.</p>
          </InputField>
          <InputField label="비밀번호 확인"
                      type="password"
                      name="passwordConfirm"
                      value={fields.passwordConfirm}
                      placeholder="비밀번호를 다시 한번 입력해주세요."
                      eventHandler={(value) => handleInputChange("passwordConfirm", value)}
                      isValid={fields.passwordConfirm === "" || validations.passwordConfirm}>
            <p className="invalid-caption">비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
          </InputField>
          <InputField label="닉네임"
                      type="text"
                      name="nickname"
                      value={fields.nickname}
                      placeholder="닉네임을 입력해주세요"
                      eventHandler={(value) => handleInputChange("nickname", value)}
                      isValid={fields.nickname === "" || validations.nickname}
                      button={<button className="checking-duplicate" disabled={!validations.nickname}>중복 확인</button>}>
            <p className="invalid-caption">영문, 유효한 한글, 숫자를 이용하여 3자 이상 10자 이하로 입력해주세요.</p>
          </InputField>
          <InputField label="주소"
                      type="text"
                      name="address"
                      value={fields.address}
                      placeholder="주소찾기"
                      eventHandler={(value) => handleInputChange("address", value)}
                      isValid={fields.address === "" || validations.address}
                      button={<button className="finding-address">주소 찾기</button>}>
          </InputField>
          <InputField label="휴대폰 번호"
                      type="text"
                      name="phone"
                      value={fields.phone}
                      placeholder="(예시)01012345678"
                      eventHandler={(value) => handleInputChange("phone", value)}
                      isValid={fields.phone === "" || validations.phone}>
            <p className="invalid-caption">유효하지 않은 휴대폰 번호 형식입니다.</p>
          </InputField>
          <Button type="submit" className="sign-up-button">가입하기</Button>
        </form>
      </div>
  )
}
