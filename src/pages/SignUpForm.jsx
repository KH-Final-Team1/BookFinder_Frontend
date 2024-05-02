import axios from "axios";
import {useState} from "react";
import Button from "../components/ui/Button";

export default function SignUpForm() {
  return (
      <section className="sign-up-form">
        <div className="back">
          <Button type="button" className="back">
            <span>🔙</span>
            <p>취소하고 돌아가기</p>
          </Button>
        </div>
        <div style={{width: "100%", maxWidth: "400px", backgroundColor: "#ffffff"}}>
          <h1 className="title">회원 가입</h1>
          <Form/>
        </div>
      </section>
  )
}

function Form() {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    address: "",
    phone: ""
  })

  function requestSignUp(e) {
    e.preventDefault();
    axios.post("http://localhost:8080/api/v1/signup", formData)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    })
  }

  function handleInputChange(e) {
    let {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone" ? value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') : value
    })
  }

  return (
      <form onSubmit={requestSignUp} className="sign-up">
        <div>
          <InputField label="이메일"
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="이메일 입력해주세요."
                      eventHandler={handleInputChange}>
            <button className="checking-duplicate">중복확인</button>
          </InputField>
          <div>
            <p style={{margin: "10px 0 0 0", fontSize: "12px"}}>올바른</p>
          </div>
        </div>
        <InputField label="비밀번호"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="비밀번호를 입력해주세요."
                    eventHandler={handleInputChange}>
          <p className="valid-info">영문 대소문자, 숫자, 특수문자를 포함하여 8자 이상 20자 이하로 입력해주세요.</p>
        </InputField>
        <InputField label="비밀번호 확인"
                    type="password"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    placeholder="비밀번호를 다시 한번 입력해주세요."
                    eventHandler={handleInputChange}>
        </InputField>
        <div>
          <InputField label="닉네임"
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      placeholder="닉네임을 입력해주세요"
                      eventHandler={handleInputChange}>
            <button>중복 확인</button>
          </InputField>
          <p style={{margin: "10px 0 0 0", fontSize: "12px"}}>올바른</p>
        </div>
        <InputField label="주소"
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="주소찾기"
                    eventHandler={handleInputChange}>
          <button>주소 찾기</button>
        </InputField>
        <InputField label="휴대폰 번호"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    placeholder="(예시)01012345678"
                    eventHandler={handleInputChange}/>
        <button type="submit">가입하기</button>
      </form>
  )
}

function InputField({label, type, name, value, placeholder, eventHandler, children}) {
  return (
      <div className="sign-up-input">
        <div>
          <div>
            <label className="title">{label}</label>
          </div>
          <input className="test" type={type} name={name} value={value} placeholder={placeholder}
                 onChange={eventHandler}/>
        </div>
        {children}
      </div>
  )
}