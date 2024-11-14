import { useState } from "react";
import { Class } from "../types";

export const useCharacterClass = () => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  return {
    selectedClass,
    setSelectedClass,
  };
};
