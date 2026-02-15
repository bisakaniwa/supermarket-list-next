import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  elevation?: 0 | 1 | 2 | 3 | 4;
  bordered?: boolean;
};

export function Paper({
  elevation = 1,
  bordered = false,
  className = "",
  ...props
}: Props) {
  const base =
    "rounded-xl transition-shadow";

  const elevations: Record<number, string> = {
    0: "shadow-none",

    1: `
      shadow-sm
      dark:shadow-[0_1px_3px_rgba(0,0,0,0.6)]
    `,

    2: `
      shadow
      dark:shadow-[0_4px_6px_rgba(0,0,0,0.6)]
    `,

    3: `
      shadow-md
      dark:shadow-[0_6px_12px_rgba(0,0,0,0.7)]
    `,

    4: `
      shadow-lg
      dark:shadow-[0_10px_20px_rgba(0,0,0,0.8)]
    `,
  };

  const border = bordered ? "border border-border" : "";

  return (
    <div
      className={`
        ${base}
        ${elevations[elevation]}
        ${border}
        ${className}
      `}
      {...props}
    />
  );
}
