"use client";

import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Spinner } from "@nextui-org/spinner";
import { Link } from "@nextui-org/link";
import { useTheme } from "next-themes";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";

import { REPOSITORIES } from "@/data/repos";
import { subtitle, title } from "@/components/primitives";
import { LOGOS } from "@/data/language-styles";
import { UserIcon } from "@/components/icons/ui";
import { SidebarRepositoryCard } from "@/components/sidebar-repository-card";

export default function Page({ params }: { params: { repo: string } }) {
  const { theme } = useTheme();
  const selectedRepo = REPOSITORIES[params.repo as unknown as number];
  const [markdownRender, setMarkdownRender] = useState<JSX.Element | null>(
    null
  );

  useEffect(() => {
    if (!markdownRender) {
      if (theme) {
        fetch(`/api/github/readme?fullName=${selectedRepo.fullName}`)
          .then(async (response) => {
            const readmeContent = await response.text();

            setMarkdownRender(
              <MarkdownPreview
                className="rounded-xl p-4 [&>div]:bg-default-200"
                source={readmeContent}
                wrapperElement={{
                  "data-color-mode": theme === "dark" ? "dark" : "light",
                }}
              />
            );
          })
          .catch((error) => {
            setMarkdownRender(
              <p>Failed to fetch README.md: {error.message}</p>
            );
          });
      }
    }
  });

  const getUpdateClassName = (updatedAt: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 15) {
      return "text-success-400";
    } else if (diffDays <= 60) {
      return "text-warning-400";
    } else {
      return "text-danger-400";
    }
  };

  const updateClassName = getUpdateClassName(selectedRepo.updatedAt);

  //   {
  //     "name": "freeCodeCamp",
  //     "full_name": "freeCodeCamp/freeCodeCamp",
  //     "owner": "freeCodeCamp",
  //     "html_url": "https://github.com/freeCodeCamp/freeCodeCamp",
  //     "description": "freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free.",
  //     "language": "TypeScript",
  //     "stargazers_count": "404417",
  //     "created_at": "2014-12-24T17:49:19Z",
  //     "updated_at": "2024-10-22T14:37:09Z"
  // },

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-6 max-w-4xl text-center flex flex-col items-center justify-start gap-2">
          <div className="grid grid-cols-5 bg-default-100 rounded-xl">
            <div className="flex items-center justify-evenly col-span-1 p-4">
              {LOGOS[selectedRepo.language.toLowerCase() as keyof typeof LOGOS]}
            </div>

            <div className="flex flex-col items-center justify-center max-w-xl col-start-2 col-span-3">
              <Link
                isExternal
                href={`https://github.com/${selectedRepo.fullName}`}
              >
                <h1 className={title()}>{selectedRepo.name}</h1>
              </Link>

              <h2
                className={subtitle({
                  class: "text-2xl",
                })}
              >
                by{" "}
                <Link
                  isExternal
                  className="text-xl"
                  href={`https://github.com/${selectedRepo.owner}`}
                >
                  {selectedRepo.owner}
                </Link>
              </h2>

              <span className="italic">{selectedRepo.description}</span>
            </div>

            <div className="flex items-center justify-evenly col-span-1 p-4">
              <UserIcon
                className={`w-full h-full rounded-xl fill-none stroke-default-200 ${
                  isImageLoaded ? "hidden" : "block"
                }`}
              />
              <Image
                alt="Owner's avatar"
                className={`w-full h-full rounded-xl ${isImageLoaded ? "block" : "hidden"}`}
                loading="lazy"
                src={`https://github.com/${selectedRepo.owner}.png`}
                onLoad={() => {
                  setIsImageLoaded(true);
                }}
              />
            </div>

            <Divider className="col-span-full" />

            <span className="col-span-full py-2 items-center justify-center inline-flex text-center gap-1 mt-1">
              <p>
                Created on {selectedRepo.createdAt.toLocaleDateString("en-GB")}{" "}
                and
              </p>
              <p className={updateClassName}>
                last updated on{" "}
                {selectedRepo.updatedAt.toLocaleDateString("en-GB")}
              </p>
            </span>
          </div>

          <section className="w-full mt-1 text-left rounded-xl max-w-4xl">
            {markdownRender ?? (
              <Spinner
                className="mt-16"
                classNames={{ label: "font-semibold" }}
                color="primary"
                label="Loading repository README"
                labelColor="primary"
              />
            )}
          </section>
        </div>
        <div className="col-span-2 w-full h-fit flex flex-col gap-4 bg-default-100 rounded-xl p-4">
          <p>Similar repositories:</p>
          <SidebarRepositoryCard repo={REPOSITORIES[9999]} />
          <SidebarRepositoryCard repo={REPOSITORIES[1124]} />
          <SidebarRepositoryCard repo={REPOSITORIES[9993]} />
          <SidebarRepositoryCard repo={REPOSITORIES[8475]} />
        </div>
      </div>
    </section>
  );
}
