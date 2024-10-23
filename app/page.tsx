"use client";

import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { GithubLogo } from "@/components/icons/logos";
import { subtitle, title } from "@/components/primitives";
import { REPOSITORIES } from "@/data/repos";

/**
 * Global repository autocomplete search component.
 *
 * This component provides pagination and search functionality.
 *
 * @returns {JSX.Element}
 */
function GlobalRepositoryAutocomplete({
  pageSize = 20,
}: {
  pageSize?: number;
}): JSX.Element {
  const [items, setItems] = useState(REPOSITORIES.slice(0, pageSize));

  return (
    <Autocomplete
      className="max-w-xs"
      defaultItems={items}
      label="Favorite Animal"
      placeholder="Search an animal"
      onInputChange={(value) => {
        const filteredRepos = REPOSITORIES.filter((repo) =>
          repo.name.toLowerCase().includes(value.toLowerCase())
        ).slice(0, pageSize);

        setItems(filteredRepos);
      }}
      onSelectionChange={(value) => {
        window.location.href = `/repo/${value}`;
      }}
    >
      {(repo) => (
        <AutocompleteItem key={repo.index}>{repo.name}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="#"
        >
          CTA
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubLogo size={20} />
          GitHub
        </Link>
      </div>

      <div>
        <GlobalRepositoryAutocomplete />
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
