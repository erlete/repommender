"use client";

import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Error", "Sugerencia", "Pregunta", "Otro"];
const SERVICES = [
  "Interfaz de usuario",
  "Recomendaciones de repositorios",
  "Experiencia de usuario",
  "Funcionalidad",
  "Rendimiento",
  "Documentación",
  "Soporte técnico",
  "Facilidad de uso",
  "Otros",
];

const RatePage = () => {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const [rating, setRating] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <form
      className="flex flex-col gap-4 w-1/3 place-self-center"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center">Valora tu experiencia</h2>
      <Select
        isRequired
        description="Categoría de la valoración"
        label="Selecciona una categoría"
      >
        {CATEGORIES.map((category, index) => (
          <SelectItem key={index} value={category}>
            {category}
          </SelectItem>
        ))}
      </Select>

      <Select
        isRequired
        description="Servicio a valorar"
        label="Selecciona un servicio"
      >
        {SERVICES.map((service, index) => (
          <SelectItem key={index} value={service}>
            {service}
          </SelectItem>
        ))}
      </Select>

      <div className="flex gap-2 items-center justify-evenly">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            className={`${
              rating > index ? "text-yellow-500" : "text-gray-400"
            }`}
            type="button"
            onClick={() => setRating(index + 1)}
          >
            <Star />
          </button>
        ))}
      </div>

      <Textarea
        description="Comentarios adicionales sobre la valoración"
        placeholder="Introduce tu comentario"
      />

      <Button isLoading={submitted} type="submit">
        Valorar
      </Button>
    </form>
  );
};

export default RatePage;
