import './InputStyles.scss';

interface InputProps {
  id: string;
  type?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  labelText?: string;
  className?: string;
  list?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  name,
  value,
  checked,
  id,
  type,
  labelText,
  list,
  className = '',
  onChange,
  errorMessage,
}: InputProps) {
  return (
    <div className={`input-container ${className}`}>
      <label htmlFor={id}>{labelText}</label>
      <input
        name={name}
        id={id}
        type={type}
        value={value}
        checked={checked}
        list={list}
        className={errorMessage ? 'input-error' : ''}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default Input;
