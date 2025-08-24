interface FormErrorMessageProps {
  errorMessage: string | undefined;
}

export default function FormErrorMessage({
  errorMessage,
}: FormErrorMessageProps) {
  return (
    <div className="input-error-wrapper">
      <p className="input-error-message">{errorMessage || '\u00A0'}</p>
    </div>
  );
}
