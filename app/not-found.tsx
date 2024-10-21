"use client";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";

import { LookingForIcon } from "@/components/icons/ui";

// TODO: Implement not found page (if needed).
export default function Page() {
  return (
    <div className="w-full h-96 flex flex-col items-center justify-evenly px-8">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <LookingForIcon className="fill-warning" size={128} />
      </motion.div>
      <h2 className="text-center text-2xl font-semibold">
        We could not find the page you&apos;re looking for.
      </h2>
      <Button variant="ghost" onClick={() => window.history.back()}>
        Go back
      </Button>
    </div>
  );
}
