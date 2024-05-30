import {useEffect, useState} from "react";
import InputField from "./InputField";
import Button from "../ui/Button";
import {useDaumPostcodePopup} from 'react-daum-postcode'
import {requestDuplicate, requestOauthSignUp, requestSignUp} from "../../services/auth/authAPI";
import {buttonValid, handleInputChange, initialInputFields} from "../../services/auth/utils";
import {useLocation, useNavigate} from "react-router-dom";
import {testRegExp} from "../../services/auth/regexp";

export default function OAuth2SignUpForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const open = useDaumPostcodePopup();
  let [fields, setFields] = useState({
    nickname: initialInputFields("nickname"),
    address: initialInputFields("address"),
    phone: initialInputFields("phone"),
  })
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
      let accessToken = new URLSearchParams(location.search).get("token");
      let result = await requestOauthSignUp(fields, accessToken);
      alert(result);
      navigate("/login")
    } catch (error) {
      let details = error.response.data.details;
      Object.values(details).forEach((key, value) => {
        updateFields(key, {valid: false, value: value})
      })
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
