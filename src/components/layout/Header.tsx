import { AuthButton } from "../features/AuthButton"

export const Header = () => {
  return (
    <header className="bg-header flex mx-auto w-full items-center-safe">
      <div className="ml-4 mt-1 pb-0 mb-0">
        <AuthButton />
      </div>

      <h4 className="text-lg text-center grow">
        Lista de Supermercado
      </h4>
    </header>
  )
}
