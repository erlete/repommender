import {
  CPlusPlus,
  CSharp,
  Go,
  Java,
  JavaScript,
  PHP,
  Python,
  Rust,
  Swift,
  TypeScript,
} from "@/components/icons/languages";
import { UserIcon } from "@/components/icons/ui";
import { IconSvgProps } from "@/types";

export function getLanguageLogo(language: string, props?: IconSvgProps) {
  props = props ?? {};

  switch (language.toLowerCase()) {
    case "javascript":
      return <JavaScript {...props} />;
    case "python":
      return <Python {...props} />;
    case "java":
      return <Java {...props} />;
    case "c#":
      return <CSharp {...props} />;
    case "c++":
      return <CPlusPlus {...props} />;
    case "typescript":
      return <TypeScript {...props} />;
    case "php":
      return <PHP {...props} />;
    case "swift":
      return <Swift {...props} />;
    case "go":
      return <Go {...props} />;
    case "rust":
      return <Rust {...props} />;
    default:
      return <UserIcon {...props} />;
  }
}
