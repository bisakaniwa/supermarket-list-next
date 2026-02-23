import { CheckboxSkeleton } from "../ui/CheckboxSkeleton";

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <CheckboxSkeleton key={i} />
      ))}
    </div>
  );
}
