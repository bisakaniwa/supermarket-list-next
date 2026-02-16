"use client";

import { Minus, Plus } from "lucide-react";
import { IconButton } from "./IconButton";

interface QuantityChangerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export const QuantityChanger = ({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
}: QuantityChangerProps) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    } else if (e.target.value === "") {
      onChange(0);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm text-contrast pb-1 ml-1">{label}</label>}
      <div className="flex items-center gap-3">
        <IconButton onClick={handleDecrement} disabled={value <= min} className="border border-border w-10 h-10">
          <Minus className="w-4 h-4" />
        </IconButton>
        <div className="flex-1 flex items-center justify-center bg-surface border border-border rounded-lg h-10">
          <input
            type="number"
            className="w-full text-center bg-transparent outline-none text-text font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={value === 0 ? "" : value}
            onChange={handleChange}
          />
        </div>
        <IconButton onClick={handleIncrement} disabled={value >= max} className="border border-border w-10 h-10">
          <Plus className="w-4 h-4" />
        </IconButton>
      </div>
    </div>
  );
};
