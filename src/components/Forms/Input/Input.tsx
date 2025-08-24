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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  name,
  value,
  checked,
  id,
  type = 'text',
  labelText,
  list,
  className = '',
  errorMessage,

  rightIcon,
  onChange,
}: InputProps) {
  return (
    <div className={`input-container input-container__${type}  ${className}`}>
      <label htmlFor={id}>{labelText}</label>
      <div className="input-wrapper">
        <input
          name={name}
          id={id}
          type={type}
          value={value}
          checked={checked}
          list={list}
          className={`input-field input-field__${type} ${
            errorMessage ? 'input-field--error' : ''
          } ${rightIcon ? 'input-field--right-icon' : ''}`}
          onChange={onChange}
        ></input>
        {rightIcon && (
          <div className="input-icon input-right-icon">{rightIcon}</div>
        )}
      </div>
    </div>
  );
}

export default Input;
