import { getAllItems } from "@/actions/lists/list";
import { Paper } from "../ui/Paper"
import { Checkbox } from "../ui/Checkbox";
import { Suspense } from "react";
import { CheckboxSkeleton } from "../ui/CheckboxSkeleton";
import { ListCardSkeleton } from "./ListCardSkeleton";

export const ListCard = async () => {
  const itemsToBuy = await getAllItems();

  return (
    <Paper className="w-full bg-card">
      <Suspense fallback={<ListCardSkeleton />}>
        {itemsToBuy.map((item) => (
          <Checkbox
            key={item.id}
          />
        ))}
      </Suspense>
    </Paper>
  )
}
