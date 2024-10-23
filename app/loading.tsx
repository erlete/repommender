import { Spinner } from "@nextui-org/spinner";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-between">
      <Spinner color="primary" size="lg" />
      <p className="text-xl text-foreground">Cargando...</p>
    </div>
  );
}
