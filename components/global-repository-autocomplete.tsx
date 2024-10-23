import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Kbd } from "@nextui-org/kbd";

import { REPOSITORIES } from "@/data/repos";
import { SearchIcon, UserIcon } from "@/components/icons/ui";

/**
 * Global repository autocomplete search component.
 *
 * This component provides pagination and search functionality.
 *
 * @returns {JSX.Element}
 */
export function GlobalRepositoryAutocomplete({
  pageSize = 20,
}: {
  pageSize?: number;
}): JSX.Element {
  const [items, setItems] = useState(REPOSITORIES.slice(0, pageSize));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let hotkey = false;

      if (typeof navigator !== "undefined") {
        hotkey = event.shiftKey && event.key.toLowerCase() === "k";
      }

      if (hotkey && inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Autocomplete
      ref={inputRef}
      aria-label="Search repositories"
      className="max-w-xs"
      defaultItems={items}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["shift"]}>
          K
        </Kbd>
      }
      placeholder="Search repositories..."
      startContent={
        <SearchIcon className="fill-none text-default-500" size={32} />
      }
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
        <AutocompleteItem key={repo.index} textValue={repo.name}>
          <div className="flex gap-2 items-center">
            <Avatar
              isBordered
              fallback={
                <UserIcon
                  className="rounded-xl fill-none stroke-default-200"
                  size={16}
                />
              }
              radius="full"
              size="sm"
              src={`https://github.com/${repo.owner}.png`}
            />
            <div className="flex flex-col">
              <span className="text-small">{repo.name}</span>
              <span className="text-tiny text-default-400">
                by {repo.owner}
              </span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
