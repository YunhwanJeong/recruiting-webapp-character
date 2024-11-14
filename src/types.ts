export type Attributes = {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type Skill = {
  name: string;
  attributeModifier: keyof Attributes;
};

export type Character = {
  id: string;
  attributes: Attributes;
  skillPoints: SkillPoints;
};

export type SkillPoints = {
  [key: string]: number;
};

export type SkillCheckResult = {
  roll: number;
  total: number;
  success: boolean;
};
