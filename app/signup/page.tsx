"use client";

import { setCookie } from "nookies";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { useRouter } from "next/navigation";

const languages = [
  "Python",
  "TypeScript",
  "JavaScript",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "PHP",
  "Rust",
];

const interests = [
  "Algorithms",
  "Data Science",
  "Computer Science",
  "Machine Learning",
  "Deep Learning",
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "AI",
  "Blockchain",
  "IoT",
  "AR/VR",
  "Big Data",
  "Quantum Computing",
  "Networking",
  "Databases",
  "UI/UX",
];

const countries = [
  "Spain",
  "USA",
  "Germany",
  "India",
  "Canada",
  "Brazil",
  "Australia",
  "Japan",
  "France",
  "Italy",
];

export type SignupFormDataProps = {
  username?: string;
  languages: string[] | undefined;
  interests: string[] | undefined;
  country?: string;
  age?: string;
};

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormDataProps>({
    username: undefined,
    languages: undefined,
    interests: undefined,
    country: undefined,
    age: undefined,
  });

  return (
    <section className="space-y-4 max-w-xl w-full place-self-center">
      <h1 className="text-3xl font-bold text-center">Sign Up</h1>
      <h2 className="inline-flex gap-1 items-center justify-center w-full text-lg text-center">
        Fill out the form to create a{" "}
        <p className="italic text-sm">(simulated)</p> account
      </h2>

      <Form
        className="flex flex-col items-center justify-center"
        validationBehavior="native"
        onSubmit={(e) => {
          e.preventDefault();

          const cookieData = {
            username: formData.username,
            languages: formData.languages,
            interests: formData.interests,
            country: formData.country,
            age: formData.age,
          };

          setCookie(null, "simulated-user", JSON.stringify(cookieData), {
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
          });

          router.push("/");
        }}
      >
        <Input
          isRequired
          id="username"
          label="Username"
          minLength={5}
          name="username"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
        />

        <Select
          label="Favorite languages"
          name="languages"
          selectedKeys={formData.languages}
          selectionMode="multiple"
          onSelectionChange={(keys) =>
            setFormData((prev) => ({
              ...prev,
              languages: Array.from(keys).map((key) => key as string),
            }))
          }
        >
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="IT interests"
          name="interests"
          selectedKeys={formData.interests}
          selectionMode="multiple"
          onSelectionChange={(keys) =>
            setFormData((prev) => ({
              ...prev,
              interests: Array.from(keys).map((key) => key as string),
            }))
          }
        >
          {interests.map((interest) => (
            <SelectItem key={interest} value={interest}>
              {interest}
            </SelectItem>
          ))}
        </Select>

        <Select
          isRequired
          label="Country"
          name="country"
          selectedKeys={[formData.country || ""]}
          onSelectionChange={(key) =>
            setFormData((prev) => ({ ...prev, country: key.currentKey }))
          }
        >
          {countries
            .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
            .map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
        </Select>

        <Input
          isRequired
          id="age"
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, age: e.target.value }))
          }
        />

        <Button className="mt-4" size="lg" type="submit" variant="ghost">
          Register
        </Button>
      </Form>
    </section>
  );
}
