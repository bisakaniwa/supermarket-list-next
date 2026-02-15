import React from "react";

interface CheckboxSkeletonProps {
  /** Largura aproximada da label */
  labelWidth?: string;
}

export function CheckboxSkeleton({
  labelWidth = "w-32",
}: CheckboxSkeletonProps) {
  return (
    <div
      className="relative inline-flex items-center gap-2"
      aria-hidden="true"
    >
      {/* Área circular externa */}
      <div
        className="
          relative inline-flex items-center justify-center
          w-10 h-10 rounded-full
          bg-black/5 dark:bg-white/10
          animate-pulse
        "
      >
        {/* Caixa do checkbox */}
        <div
          className="
            w-5 h-5 rounded
            bg-gray-300 dark:bg-gray-700
          "
        />
      </div>

      {/* Label */}
      <div
        className={`
          h-4 ${labelWidth}
          rounded
          bg-gray-300 dark:bg-gray-700
          animate-pulse
        `}
      />
    </div>
  );
}

CheckboxSkeleton.displayName = "CheckboxSkeleton";
