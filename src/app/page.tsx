import { getAllItems } from "@/actions/list-actions";
import { ItemInput } from "@/components/features/ItemInput"
import { List } from "@/components/features/List";
import { ResetButton } from "@/components/ui/ResetButton";

export default async function Home() {
  const itemsList = await getAllItems();

  return (
    <main className="flex w-full flex-col">
      <div className="flex w-full justify-center-safe px-5">
        <ItemInput list={itemsList} />
      </div>

      <div className="flex justify-start-safe mt-7 ml-5">
        <ResetButton disabled={!itemsList || itemsList.length === 0} />
      </div>

      <div className="flex w-full flex-row justify-evenly px-5 mt-5 mb-10">
        <List itemsList={itemsList} />
      </div>
    </main>
  );
}
