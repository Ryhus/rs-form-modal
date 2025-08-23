import './InputStyles.scss';

interface InputProps {
  id: string;
  type?: string;
  name?: string;
  value?: string;
  labelText?: string;
  className?: string;
  list?: string;
  errorMessage?: string;
}

function Input({
  name,
  value,
  id,
  type,
  labelText,
  list,
  className = '',

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
        list={list}
        className={errorMessage ? 'input-error' : ''}
      ></input>
      {errorMessage && <p className="input-error-message">{errorMessage}</p>}
    </div>
  );
}

export default Input;
