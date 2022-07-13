import "./Button.css";

export default function Button(props) {
  const {
    text,
    variant = "primary",
    size = "small",
    handlers,
    isDisabled,
  } = props;

  return (
    <button
      className={`button button--${variant} button--${size} ${
        isDisabled ? "button--disabled" : ""
      }`}
      onClick={handlers?.onClick || null}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
