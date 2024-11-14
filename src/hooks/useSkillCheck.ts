import { useState } from "react";
import { Attributes, SkillCheckResult, SkillPoints } from "../types";
import { performSkillCheck } from "../utils/character";

export const useSkillCheck = (
  attributes: Attributes,
  skillPoints: SkillPoints
) => {
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [difficultyClass, setDifficultyClass] = useState<number>(0);
  const [rollResult, setRollResult] = useState<SkillCheckResult | null>(null);

  const handleSkillCheck = () => {
    if (selectedSkill) {
      const result = performSkillCheck(
        selectedSkill,
        attributes,
        skillPoints,
        difficultyClass
      );
      if (result) setRollResult(result);
    }
  };

  return {
    selectedSkill,
    difficultyClass,
    rollResult,
    setSelectedSkill,
    setDifficultyClass,
    handleSkillCheck,
  };
};
