import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Tooltip } from "@nextui-org/tooltip";
import { motion } from "framer-motion";
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/spinner";

import { InfoIcon, StarIcon, UserIcon } from "./icons/ui";

import { Repository } from "@/data/repos";
import { getLanguageLogo } from "@/data/language-styles";

export function RepositoryCardUpdateFrequency({
  repo,
}: {
  repo: Repository;
}): JSX.Element {
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

  const updateClassName = getUpdateClassName(repo.updatedAt);

  return (
    <motion.div
      className="w-full"
      transition={{ type: "spring", stiffness: 500 }}
      whileHover={{ scale: 1.025 }}
    >
      <Card
        isPressable
        className="max-w-[340px] w-full"
        onPress={() => {
          setTimeout(() => {
            window.location.href = `/repo/${repo.index}`;
          }, 500);
        }}
      >
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              fallback={
                <UserIcon className="w-full h-full rounded-xl fill-none stroke-default-200" />
              }
              radius="full"
              size="lg"
              src={`https://github.com/${repo.owner}.png`}
            />

            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {repo.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400 italic">
                por @{repo.owner}
              </h5>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter className="py-2 items-center justify-between">
          <div className="flex items-center gap-1">
            <Tooltip
              showArrow
              closeDelay={0}
              content={
                <span className="max-w-xs text-center">
                  Un repositorio se actualiza frecuentemente si los últimos
                  cambios se implementaron hace menos de 15 días, se actualiza
                  habitualmente si se implementaron hasta hace 60 días, y se
                  actualiza raramente si ha pasado más tiempo.
                </span>
              }
              offset={15}
              placement="left"
            >
              <span>
                <InfoIcon className="fill-default-400" size={14} />
              </span>
            </Tooltip>
            <p className={`font-semibold text-small ${updateClassName}`}>
              {updateClassName.startsWith("text-success")
                ? "Actualizado frecuentemente"
                : updateClassName.startsWith("text-warning")
                  ? "Actualizado habitualmente"
                  : "Raramente actualizado"}
            </p>
          </div>
          <div className="flex items-center justify-end gap-1">
            <p className="font-semibold text-warning-500 text-small">
              {repo.stargazersCount}
            </p>
            <StarIcon className="w-4 h-4 fill-none stroke-warning-500" />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function RepositoryCardLanguage({
  repo,
}: {
  repo: Repository;
}): JSX.Element {
  return (
    <motion.div
      className="w-full"
      transition={{ type: "spring", stiffness: 500 }}
      whileHover={{ scale: 1.025 }}
    >
      <Card
        isPressable
        className="max-w-[340px] w-full"
        onPress={() => {
          setTimeout(() => {
            window.location.href = `/repo/${repo.index}`;
          }, 500);
        }}
      >
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              fallback={
                <Spinner
                  className="w-[64] h-[64]"
                  classNames={{
                    wrapper: "w-[48] h-[48] items-center justify-center",
                    circle1: "w-[48] h-[48]",
                    circle2: "w-[32] h-[32]",
                  }}
                  color="primary"
                />
              }
              radius="full"
              showFallback={true}
              size="lg"
              src={`https://github.com/${repo.owner}.png`}
            />

            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {repo.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400 italic">
                por @{repo.owner}
              </h5>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter className="py-2 items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="w-6 h-6">{getLanguageLogo(repo.language)}</span>
            <p className="text-sm">{repo.language}</p>
          </div>
          <div className="flex items-center justify-end gap-1">
            <p className="font-semibold text-warning-500 text-small">
              {repo.stargazersCount}
            </p>
            <StarIcon className="w-4 h-4 fill-none stroke-warning-500" />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
