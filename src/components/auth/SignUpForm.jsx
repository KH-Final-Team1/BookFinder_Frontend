import {useEffect, useState} from "react";
import InputField from "./InputField";
import Button from "../ui/Button";
import {useDaumPostcodePopup} from 'react-daum-postcode'
import {
  requestAuthEmail,
  requestCheckingVerification,
  requestDuplicate,
  requestSignUp
} from "../../services/auth/authAPI";
import {buttonValid, handleInputChange, initialInputFields} from "../../services/auth/utils";
import {useNavigate} from "react-router-dom";
import {testRegExp} from "../../services/auth/regexp";

let signingToken = "";
export default function SignUpForm() {
  const navigate = useNavigate();
  const open = useDaumPostcodePopup();
  let [fields, setFields] = useState({
    email: initialInputFields("email"),
    password: initialInputFields("password"),
    passwordConfirm: initialInputFields("passwordConfirm"),
    nickname: initialInputFields("nickname"),
    address: initialInputFields("address"),
    phone: initialInputFields("phone"),
    authCode: initialInputFields("authCode")
  })
  let [isEmailSent, setIsEmailSent] = useState(false)
  let [isFormValid, setIsFormValid] = useState(false)
  useEffect(() => {
    const isValid = buttonValid(fields)
    setIsFormValid(isValid);
  }, [fields]);
  const isConfirmation = (field) => {
    return field.disabled || field.value === "" || !field.valid;
  }

  const submitSignUpForm = async (e) => {
    e.preventDefault()
    try {
      let result = await requestSignUp(fields);
      alert(result);
      navigate("/login")
    } catch (error) {
      let details = error.response.data.details;
      Object.values(details).forEach((key, value) => {
        updateFields(key, {valid: false, value: value})
      })
    }
  }
  const handleEmailCheck = async () => {
    try {
      let result = await requestDuplicate(fields.email);
      if (window.confirm(result)) {
        updateFields("email", {disabled: true})
        setIsEmailSent(true)
        signingToken = await requestAuthEmail(fields.email.value);
      }
    } catch (error) {
      updateFields("email", {valid: false, caption: error.response.data.detail, duplicate: true})
    }
  }
  const handleAuthCodeCheck = async () => {
    try {
      signingToken = await requestCheckingVerification(fields.authCode.value, signingToken);
      updateFields("authCode", {disabled: true})
    } catch (error) {
      updateFields("authCode", {valid: false})
    }
  }
  const handleNicknameCheck = async () => {
    try {
      let result = await requestDuplicate(fields.nickname);
      if (window.confirm(result)) {
        updateFields("nickname", {disabled: true})
      }
    } catch (error) {
      updateFields("nickname", {valid: false, caption: error.response.data.detail, duplicate: true})
    }
  }
  const handleAddress = () => {
    open({
      onComplete: (data) => {
        let valid = testRegExp("address", data.address);
        console.log(valid);
        updateFields("address", {value: data.address, valid: testRegExp("address", data.address)})
      }
    })
  }
  const updateFields = (fieldName, keyValue) => {
    setFields({
      ...fields,
      [fieldName]: {
        ...fields[fieldName],
        ...keyValue
      }
    })
  }

  return (
      <div className="sign-up">
        <form onSubmit={submitSignUpForm} className="sign-up">
          <InputField field={fields.email}
                      value={fields.email.value}
                      eventHandler={(value) => handleInputChange(fields.email, setFields, value)}
                      valid={fields.email.valid}
                      button={
                        <Button type="button" className="checking-verification"
                                disabled={isConfirmation(fields.email)}
                                onClick={handleEmailCheck}>
                          중복확인
                        </Button>
                      }>
            <p className="invalid-caption">{fields.email.duplicate ? fields.email.caption : "유효하지 않은 이메일 형식입니다."}</p>
          </InputField>
          {isEmailSent && (
              <InputField field={fields.authCode}
                          value={fields.authCode.value}
                          eventHandler={(value) => handleInputChange(fields.authCode, setFields, value)}
                          valid={fields.authCode.valid}
                          button={
                            <Button type="button" className="checking-verification"
                                    disabled={fields.authCode.disabled}
                                    onClick={handleAuthCodeCheck}>
                              코드 확인
                            </Button>}>
                <p className="invalid-caption">유효하지 않은 인증코드입니다.</p>
              </InputField>
          )}
          <InputField field={fields.password}
                      value={fields.password.value}
                      eventHandler={(value) => handleInputChange(fields.password, setFields, value)}
                      valid={fields.password.valid}>
            <p className="invalid-caption">영문, 숫자, 특수기호를 포함하여 8자 이상 20자 이하로 입력해주세요.</p>
          </InputField>
          <InputField field={fields.passwordConfirm}
                      value={fields.passwordConfirm.value}
                      eventHandler={(value) => handleInputChange(fields.passwordConfirm, setFields, value)}
                      valid={fields.passwordConfirm.valid}>
            <p className="invalid-caption">비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
          </InputField>
          <InputField field={fields.nickname}
                      value={fields.nickname.value}
                      eventHandler={(value) => handleInputChange(fields.nickname, setFields, value)}
                      valid={fields.nickname.valid}
                      button={
                        <Button type="button" className="checking-verification"
                                disabled={isConfirmation(fields.nickname)}
                                onClick={handleNicknameCheck}>
                          중복확인
                        </Button>
                      }>
            <p className="invalid-caption">{fields.nickname.duplicate ? fields.nickname.caption
                : "영문, 유효한 한글, 숫자를 이용하여 3자 이상 20자 이하로 입력해주세요."}</p>
          </InputField>
          <InputField field={fields.address}
                      value={fields.address.value}
                      valid={fields.address.valid}
                      button={
                        <Button type="button" className="finding-address" onClick={handleAddress}>
                          주소 찾기
                        </Button>
                      }
                      onClick={handleAddress}>
            <p className="invalid-caption">현재는 서울시만 등록가능합니다.</p>
          </InputField>
          <InputField field={fields.phone}
                      value={fields.phone.value}
                      eventHandler={(value) => handleInputChange(fields.phone, setFields, value)}
                      valid={fields.phone.valid}>
            <p className="invalid-caption">유효하지 않은 휴대폰 번호 형식입니다.</p>
          </InputField>
          <Button type="submit" className="auth-button" disabled={!isFormValid}>가입하기</Button>
        </form>
      </div>
  )
}
