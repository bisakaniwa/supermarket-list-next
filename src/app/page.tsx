import { getAllItems } from "@/actions/list-actions";
import { Header } from "@/components/layout/Header";
import { ItemInput } from "@/components/features/ItemInput"
import { ListCard } from "@/components/features/ListCard";
import { ResetButton } from "@/components/ui/ResetButton";

export default async function Home() {
  const itemsList = await getAllItems();

  return (
    <main className="flex w-full flex-col">
      <Header />

      <div className="flex w-full justify-center-safe px-5">
        <ItemInput />
      </div>

      <div className="flex justify-end-safe mt-7 mr-5">
        <ResetButton disabled={!itemsList || itemsList.length === 0} />
      </div>

      <h2 className="text-2xl text-center mt-5">
        Comprar:
      </h2>

      <div className="flex w-full flex-row justify-evenly px-5 mt-5 mb-10">
        <ListCard itemsList={itemsList} />
      </div>
    </main>
  );
}
