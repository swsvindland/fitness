import { ScanFood } from "~/app/_components/Scanner/ScanFood";

export default async function ScanFoodBarcodePage({
  params,
}: {
  params: { slug: string };
}) {
  return <ScanFood barcode={params.slug} />;
}
