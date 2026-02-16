import { Paper } from "../ui/Paper"
import { Suspense } from "react";
import { ListCardSkeleton } from "./ListCardSkeleton";
import { Item } from "@prisma/client";
import { ListItem } from "./ListItem";

type ListCardProps = {
  itemsList: Item[];
};

export const ListCard = async ({ itemsList }: ListCardProps) => {
  return (
    <Paper elevation={2} className="w-full bg-card p-3 lg:grid lg:grid-cols-2 lg:gap-0 lg:content-start">
      <Suspense fallback={<ListCardSkeleton />}>
        {itemsList.map((item, index) => {
          const isLeftCol = index % 2 === 0;
          const showDesktopDivider = index + 2 < itemsList.length;
          const showVerticalDivider = isLeftCol && index + 1 < itemsList.length;

          return (
            <div
              key={item.id}
              className={`relative flex flex-col ${isLeftCol ? "lg:pr-2" : "lg:pl-2"}`}
            >
              {showVerticalDivider && (
                <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] bg-contrast/60" />
              )}
              <ListItem item={item} />
              {index < itemsList.length - 1 && (
                <div className={`my-2 ${!showDesktopDivider ? "lg:hidden" : ""}`}>
                  <hr className="border-contrast/60" />
                </div>
              )}
            </div>
          );
        })}
      </Suspense>
      {itemsList.length === 0 && (
        <h4 className="flex justify-center-safe italic text-contrast">
          Nenhum item encontrado.
        </h4>
      )}
    </Paper>
  )
}
