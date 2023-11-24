import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <main className="text-secondary flex min-h-screen flex-col items-center justify-center">
            <SignIn />
        </main>
    );
}
