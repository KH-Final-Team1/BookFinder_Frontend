export default function Button({type, onClick, children, className}){
  return(
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
  );
}