import { motion } from "framer-motion";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Divider } from "@nextui-org/divider";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";

import { RepositoryCardLanguage } from "./repository-card";

import { SignupFormDataProps } from "@/app/signup/page";
import { REPOSITORIES, Repository } from "@/data/repos";

export function MassRecommendationsComponent() {
  const [repositoryIds, setRepositoryIds] = useState([]);

  const [visible, setVisible] = useState(false);

  function getRepoById(id: number): Repository {
    return REPOSITORIES.find((repo) => repo.index === id) ?? REPOSITORIES[0];
  }

  useEffect(() => {
    const cookies = parseCookies();

    const simulatedUser = JSON.parse(
      cookies["simulated-user"]
    ) as SignupFormDataProps;

    async function fetchSimilarUsers() {
      const response = await fetch("/api/fastapi/get-similar-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          languages: simulatedUser.languages,
          interests: simulatedUser.interests,
          country: simulatedUser.country,
          age: simulatedUser.age,
        }),
      });

      const userIds = (await response.json()).items;

      const repoResponse = await fetch(
        "/api/fastapi/get-interesting-repositories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_indices: userIds }),
        }
      );

      const repos = (await repoResponse.json()).items;

      setRepositoryIds(repos);
    }

    fetchSimilarUsers();
  }, []);

  return (
    <motion.div
      animate={{
        x: visible ? "0%" : "-100%",
        visibility: repositoryIds.length ? "visible" : "hidden",
      }}
      className="fixed z-[999] top-0 left-0 w-[20%] h-full flex"
      initial={{
        visibility: "hidden",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center bg-default">
        <h3 className="mx-2 inline-flex gap-0 items-center justify-center text-center p-2 text-xl font-normal text-white">
          <Tooltip
            classNames={{
              content: "max-w-sm text-justify",
            }}
            content="Estas recomendaciones se realizan en base a tus gustos (especificados al rellenar el formulario de tu perfil) y en base a las visualizaciones de repositorios por parte de otros usuarios."
            placement="right"
          >
            <Info size={24} />
          </Tooltip>
          <p>Recomendaciones personalizadas</p>
        </h3>
        <Divider />
        <ScrollShadow hideScrollBar className="w-full h-full">
          <div className="flex flex-col gap-2 m-2">
            <div className="min-w-[340px] h-0" />
            {repositoryIds.map((id, index) => (
              <RepositoryCardLanguage key={index} repo={getRepoById(id)} />
            ))}
          </div>
        </ScrollShadow>
      </div>
      <Tooltip
        content={visible ? "" : "Ver recomendaciones personalizadas"}
        placement="right"
      >
        <button
          className="place-self-center bg-default rounded-e-full h-fit p-2"
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? <ArrowLeft /> : <ArrowRight />}
        </button>
      </Tooltip>
    </motion.div>
  );
}
