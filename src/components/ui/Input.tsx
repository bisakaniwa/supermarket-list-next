"use client";

import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string | null;
  error?: string | null;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      hint,
      error,
      startIcon,
      endIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseInput =
      "w-full bg-transparent outline-none text-text placeholder:text-contrast/60";

    const baseWrapper =
      "flex items-center gap-2 px-3 py-2 rounded-lg border transition";

    const normalState =
      "bg-surface border-border focus-within:ring-2 focus-within:ring-primary focus-within:border-primary";

    const errorState =
      "border-red-500 focus-within:ring-red-500 focus-within:border-red-500";

    const disabledState =
      "opacity-50 cursor-not-allowed";

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm text-contrast pb-1 ml-1">
            {label}
          </label>
        )}

        <div
          className={`
            ${baseWrapper}
            ${error ? errorState : normalState}
            ${props.disabled ? disabledState : ""}
          `}
        >
          {startIcon && (
            <span className="text-contrast">
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            className={`
              ${baseInput}
              ${className}
            `}
            {...props}
          />

          {endIcon && (
            <span className="text-contrast">
              {endIcon}
            </span>
          )}
        </div>

        {(error || hint) && (
          <span
            className={`text-xs ${error ? "text-red-500" : "text-contrast"
              }`}
          >
            {error || hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
