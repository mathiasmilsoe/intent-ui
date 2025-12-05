import React from "react";
import { useIntentEngine } from "./IntentUIProvider";

export interface IntentInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSubmit"> {
  wrapperClassName?: string;
  onIntentSubmit?: (intent: string) => void | Promise<void>;
}

export function IntentInput({
  wrapperClassName,
  onIntentSubmit,
  ...inputProps
}: IntentInputProps) {
  const engine = useIntentEngine();
  const [value, setValue] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    if (onIntentSubmit) {
      await onIntentSubmit(trimmed);
    } else {
      await engine.updateFromIntent(trimmed, {});
    }
  };

  return (
    <form
      className={["iu-intent-form", wrapperClassName]
        .filter(Boolean)
        .join(" ")}
      onSubmit={handleSubmit}
    >
      <input
        {...inputProps}
        className={["iu-intent-input", inputProps.className]
          .filter(Boolean)
          .join(" ")}
        type={inputProps.type ?? "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={inputProps.placeholder ?? "What do you want to see?"}
      />
      <button type="submit" className="iu-intent-submit">
        Go
      </button>
    </form>
  );
}