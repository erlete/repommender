"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

import { subtitle, title } from "@/components/primitives";
import { RepositoryCardLanguage } from "@/components/repository-card";
import { REPOSITORIES } from "@/data/repos";
import { LANGUAGES } from "@/data/repos";
import { getLanguageLogo } from "@/data/language-styles";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [language, setLanguage] = useState<string | null>(null);

  return (
    <section className="place-self-center flex flex-col items-center justify-center gap-4 py-8 md:py-10 max-w-4xl">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Encuentra el</h1>
        <br />
        <h1 className={title({ color: "primary" })}>repositorio perfecto</h1>
        <br />
        <h1 className={title()}>para tus proyectos</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Repommender te garantiza encontrar
        </h2>
        <h2 className={subtitle({ class: "-mt-3" })}>
          los repositorios más populares de GitHub
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            className: "font-bold text-background",
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="#"
        >
          Explorar repositorios populares
        </Link>
      </div>

      <div className="flex flex-col items-center gap-4 mt-32">
        <h2
          className={title({
            color: "primary",
            className: "text-center",
          })}
        >
          Repositorios populares
        </h2>

        <Divider />

        <Autocomplete
          label="Filtrar por lenguaje"
          placeholder="Todos los lenguajes"
          variant="bordered"
          onSelectionChange={(value) => {
            setLanguage(value as string);
            setClickCount(0);
          }}
        >
          {LANGUAGES.map((item) => (
            <AutocompleteItem
              key={item}
              startContent={
                <span className="w-6 h-6">{getLanguageLogo(item)}</span>
              }
              value={item}
            >
              {item}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
          {REPOSITORIES.filter(
            (repo) =>
              language === null ||
              repo.language.toLowerCase() === language.toLowerCase()
          )
            .slice(0, Math.min(12 * (1 + clickCount), REPOSITORIES.length))
            .map((repo) => (
              <RepositoryCardLanguage key={repo.index} repo={repo} />
            ))}
        </div>

        <Button variant="ghost" onPress={() => setClickCount(clickCount + 1)}>
          Mostrar más
        </Button>
      </div>
    </section>
  );
}
