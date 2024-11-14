export type Attributes = {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type SkillPoints = {
  [key: string]: number;
};

export type SkillCheckResult = {
  roll: number;
  total: number;
  success: boolean;
};

export interface Character {
  attributes: Attributes;
  skillPoints: SkillPoints;
}
