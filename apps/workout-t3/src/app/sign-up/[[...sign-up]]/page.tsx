import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="bg-background text-secondary flex min-h-screen flex-col items-center justify-center">
      <SignUp />
    </main>
  );
}
