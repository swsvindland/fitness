import { ProgressGallery } from "~/app/_components/ProgressPhotos/ProgressGallery";

export default async function EatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <ProgressGallery />
      </div>
    </main>
  );
}
