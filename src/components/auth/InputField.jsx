export default function InputField({field, value, eventHandler, valid, button, children, onClick}) {
  const fieldConfig = {
    email: {label: "이메일", placeholder: "이메일을 입력해주세요.", type: "email"},
    password: {label: "비밀번호", placeholder: "비밀번호를 입력해주세요.", type: "password"},
    passwordConfirm: {label: "비밀번호 확인", placeholder: "비밀번호를 다시 한번 입력해주세요.", type: "password"},
    nickname: {label: "닉네임", placeholder: "닉네임을 입력해주세요.", type: "text"},
    address: {label: "주소", placeholder: "주소찾기", type: "text", readOnly: true},
    phone: {label: "휴대폰 번호", placeholder: "(예시)01012345678", type: "text"},
    authCode: {label: "인증코드", placeholder: "인증코드를 입력해주세요.", type: "text"}
  }
  return (
      <div className="sign-up-input">
        <div>
          <label className="input-label">{fieldConfig[field.name].label}</label>
          <input className={valid ? "valid-input" : "invalid-input"}
                 type={fieldConfig[field.name].type} name={field.name} value={value}
                 placeholder={fieldConfig[field.name].placeholder}
                 onChange={(e) => eventHandler(e.target.value)}
                 readOnly={fieldConfig[field.name].readOnly}
                 disabled={field.disabled}
                 onClick={onClick}/>
          {button}
        </div>
        {valid ? "" : children}
      </div>
  )
}