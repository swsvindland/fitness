import { CustomMacroForm } from "~/_components/Macros/CustomMacroForm";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <CustomMacroForm />
      </div>
    </main>
  );
}
