export default function Button({type, onClick, children, className, disabled}){
  return(
      <button type={type} disabled={disabled} onClick={onClick} className={className}>
        {children}
      </button>
  );
}