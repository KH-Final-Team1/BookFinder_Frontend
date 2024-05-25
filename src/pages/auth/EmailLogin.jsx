import Title from "../../components/ui/Title";
import InputField from "../../components/auth/InputField";
import {useEffect, useState} from "react";
import Button from "../../components/ui/Button";
import {handleInputChange, initialInputFields} from "../../services/auth/utils";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {requestLogin} from "../../services/auth/authAPI";
import {testRegExp} from "../../services/auth/regexp";

export default function EmailLogin() {
  const navigate = useNavigate();
  let [fields, setFields] = useState({
    email: initialInputFields("email"),
    password: initialInputFields("password")
  });
  let [isFormValid, setIsFormValid] = useState(false)
  let [failCaption, setFailCaption] = useState("");
  useEffect(() => {
    const isValid = testRegExp("email", fields.email.value) && (fields.password.value)
    setIsFormValid(isValid)
    setFailCaption("")
  }, [fields]);
  if (sessionStorage.getItem("accessToken")) {
    return <Navigate to="/error/403" replace/>
  }

  const submitLoginForm = async (e) => {
    e.preventDefault()
    try {
      let result = await requestLogin(fields);
      sessionStorage.setItem("accessToken", result.data.accessToken)
      window.location.href ="/"
    } catch (error) {
      setFailCaption(error.response.data.detail);
    }
  }

  return (<section className="sign-up-main">
    <div className="sign-up">
      <Title>이메일로 로그인</Title>
      <form className="sign-up" onSubmit={submitLoginForm}>
        <InputField field={fields.email} value={fields.email.value} valid={fields.email.valid}
                    eventHandler={(value) => handleInputChange(fields.email, setFields, value)}>
          <p className="invalid-caption">유효하지 않은 이메일 형식입니다</p>
        </InputField>
        <InputField field={fields.password} value={fields.password.value} valid={true}
                    eventHandler={(value) => handleInputChange(fields.password, setFields, value)}>
          <p className="invalid-caption">영문, 숫자, 특수기호를 포함하여 8자 이상 20자 이하로 입력해주세요.</p>
        </InputField>
        <p className="invalid-caption">{failCaption}</p>
        <Button type="submit" className="auth-button" disabled={!isFormValid}>로그인</Button>
        <div className="sign-up-link">
          <p className="login-or">또는</p>
          <div className="login-bottom-extra-button-div">
            <Link to="/sign-up">
              <Button className="auth-button" type="button">회원 가입</Button>
            </Link>
            <Link to="/sign-up">
              <Button className="auth-button" type="button">비밀번호 재설정</Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  </section>)
}