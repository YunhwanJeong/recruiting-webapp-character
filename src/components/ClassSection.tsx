import { CLASS_LIST } from "../consts";
import { Attributes, Class } from "../types";
import { meetsClassRequirements } from "../utils/character";

interface ClassSectionProps {
  attributes: Attributes;
  selectedClass: Class | null;
  onClassSelect: (className: Class) => void;
}
export default function ClassSection({
  attributes,
  selectedClass,
  onClassSelect,
}: ClassSectionProps) {
  return (
    <section className="column">
      <h2>Classes</h2>
      {(Object.keys(CLASS_LIST) as Class[]).map((className) => (
        <div
          key={className}
          className={`class-item ${
            meetsClassRequirements(attributes, className) ? "eligible" : ""
          }`}
          onClick={() => onClassSelect(className)}
        >
          {className}
        </div>
      ))}
      {selectedClass && (
        <div className="class-requirements">
          <h3>Requirements for {selectedClass}</h3>
          {Object.entries(CLASS_LIST[selectedClass]).map(([attr, value]) => (
            <div key={attr}>
              {attr}: {value}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
