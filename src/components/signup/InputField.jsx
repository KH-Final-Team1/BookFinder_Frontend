export default function InputField({label, type, name, value, placeholder, eventHandler, isValid, children, button}) {
  return (
      <div className="sign-up-input">
        <div>
          <label className="input-label">{label}</label>
          <input className={isValid ? "valid-input" : "invalid-input"}
                 type={type} name={name} value={value} placeholder={placeholder}
                 onChange={(e) => eventHandler(e.target.value)}/>
          {button}
        </div>
        {isValid ? "" : children}
      </div>
  )
}