import { Paper } from "../../ui/Paper"
import { Suspense } from "react";
import { ListSkeleton } from "../ListSkeleton";
import { Item } from "@prisma/client";
import { ListItem } from "../ListItem";

type ListProps = {
  itemsList: Item[];
};

export const List = async ({ itemsList }: ListProps) => {
  if (itemsList.length === 0) return (
    <h4 className="flex justify-center-safe italic text-contrast mt-10">
      Ainda não há nada para comprar!
    </h4>
  );

  return (
    <>
      <div className="flex flex-col w-full">
        <h2 className="text-2xl text-center my-5">
          Comprar:
        </h2>

        <Paper elevation={2} className="w-full bg-card p-3 lg:grid lg:grid-cols-2 lg:gap-0 lg:content-start lg:min-h-full">
          <Suspense fallback={<ListSkeleton />}>
            {itemsList.map((item, index) => {
              const isLeftCol = index % 2 === 0;
              const showDesktopDivider = index + 2 < itemsList.length;
              const showVerticalDivider = isLeftCol && index + 1 < itemsList.length;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col ${isLeftCol ? "lg:pr-2" : "lg:pl-2"}`}
                >
                  {showVerticalDivider && isLeftCol && (
                    <div className="hidden lg:block lg:min-h-[150%] absolute right-0 top-2 bottom-2 w-[1px] bg-contrast/60" />
                  )}
                  <ListItem item={item} />
                  {index < (itemsList.length - 1) && (
                    <div className={`my-2 ${!showDesktopDivider ? "lg:hidden" : ""}`}>
                      <hr className="border-contrast/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </Suspense>
        </Paper>
      </div>
    </>
  )
}
