import './InputStyles.scss';

interface InputProps {
  name: string;
  id: string;
  type: string;
  value?: string;
  labelText?: string;
  className?: string;
}

function Input({
  name,
  value,
  id,
  type,
  labelText,
  className = '',
}: InputProps) {
  return (
    <div className={`input-container ${className}`}>
      <label htmlFor={id}>{labelText}</label>
      <input name={name} id={id} type={type} value={value}></input>
    </div>
  );
}

export default Input;
