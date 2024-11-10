import { Spinner } from "@nextui-org/spinner";

import { siteConfig } from "@/config/site";

export default async function Page() {
  const request = await fetch(siteConfig.url);

  if (request.status === 200) {
    return (
      <div>
        <iframe
          className="absolute top-0 left-0 z-50 w-full h-full"
          src={siteConfig.url}
          title="IFrame to the site"
        >
          Tu navegador no soporta iframes.
        </iframe>
        <div className="absolute top-0 left-0 z-40 w-full h-full flex items-center justify-center">
          <Spinner label="Cargando..." size="lg" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-8 items-center justify-center w-full h-full pb-16">
        <h1 className="text-4xl text-center">No se pudo cargar la página.</h1>

        <h2 className="text-2xl text-center">
          Comprueba que esté disponible en
          <br />
          <a
            className="text-blue-500 underline"
            href={siteConfig.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {siteConfig.url}
          </a>
        </h2>
      </div>
    );
  }
}
