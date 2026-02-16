"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { Check } from "lucide-react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className = "", label, ...props }, ref) => {
    return (
      <label
        className={`relative inline-flex items-center cursor-pointer gap-2 has-[:checked]:[&_span]:line-through has-[:checked]:[&_span]:opacity-50 ${className}`}
      >
        <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <input
            type="checkbox"
            className="peer appearance-none w-5 h-5 border-2 border-main-text/60 rounded bg-transparent checked:bg-white dark:checked:bg-surface checked:border-green-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            ref={ref}
            {...props}
          />
          <Check
            className="absolute w-3.5 h-3.5 text-green-600 pointer-events-none opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200"
            strokeWidth={3}
          />
        </div>
        {label && <span className="text-main-text select-none">
          {label}
        </span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
