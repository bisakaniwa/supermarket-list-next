import { AuthButton } from "../features/AuthButton"

export const Header = () => {
  return (
    <header className="bg-header flex mx-auto w-full items-center-safe">
      <div className="ml-4 py-1 mt-1">
        <AuthButton />
      </div>

      <h4 className="text-lg text-center grow">
        Lista de Supermercado
      </h4>
    </header>
  )
}
