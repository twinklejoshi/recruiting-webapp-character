import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts.js";
import { useState } from "react";

export const Attributes = () => {
  const INITIAL_POINTS = 10;
  const [totalSkills, setTotalSkills] = useState(INITIAL_POINTS);
  const [attributes, setAttributes] = useState({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  });

  const [skills, setSkills] = useState({
    Acrobatics: 0,
    Dexterity: 0,
    "Animal Handling": 0,
    Arcana: 0,
    Athletics: 0,
    Deception: 0,
    History: 0,
    Insight: 0,
    Intimidation: 0,
    Investigation: 0,
    Medicine: 0,
    Nature: 0,
    Perception: 0,
    Performance: 0,
    Persuasion: 0,
    Religion: 0,
    "Sleight of Hand": 0,
    Stealth: 0,
    Survival: 0,
  });

  const [selectedClass, setSelectedClass] = useState(null);

  const incrementAttribute = (attr) => {
    setAttributes((prevAttributes) => {
      const newAttrValue = prevAttributes[attr] + 1;
      setTotalSkills(calculateSkills(attr === "Intelligence" && newAttrValue));
      return {
        ...prevAttributes,
        [attr]: newAttrValue,
      };
    });
  };

  const decrementAttribute = (attr) => {
    setAttributes((prevAttributes) => {
      const newAttrValue = prevAttributes[attr] - 1;
      setTotalSkills(calculateSkills(attr === "Intelligence" && newAttrValue));
      return {
        ...prevAttributes,
        [attr]: newAttrValue,
      };
    });
  };

  const incrementSkills = (skill) => {
    if (totalSkills > 0) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill.name]: prevSkills[skill.name] + 1,
      }));
      setTotalSkills((prev) => prev - 1);
    }
  };

  const decrementSkills = (skill) => {
    if (
      totalSkills >= 0 &&
      totalSkills < calculateSkills(attributes.Intelligence)
    ) {
      setSkills((prevSkills) => {
        if (prevSkills[skill.name] > 0) {
          setTotalSkills((prev) => prev + 1);
          return {
            ...prevSkills,
            [skill.name]: prevSkills[skill.name] - 1,
          };
        } else return { ...prevSkills };
      });
    }
  };

  const meetsRequirements = (classAttributes) => {
    return ATTRIBUTE_LIST.every(
      (attr) => attributes[attr] >= classAttributes[attr]
    );
  };

  const calculateModifier = (value) => {
    return Math.floor((value - 10) / 2);
  };

  const calculateSkills = (intelligence) => {
    const totalPoints = 10 + 4 * intelligence;
    return totalPoints;
  };

  return (
    <div className="sheet">
      <div>
        {" "}
        <h2>Attributes</h2>
        {ATTRIBUTE_LIST &&
          ATTRIBUTE_LIST.map((attribute) => {
            return (
              <div>
                <span>
                  {attribute} : {attributes[attribute]}{" "}
                </span>
                <span>
                  (Modifier: {calculateModifier(attributes[attribute])})
                </span>
                <span>
                  <button onClick={() => incrementAttribute(attribute)}>
                    +
                  </button>
                  <button onClick={() => decrementAttribute(attribute)}>
                    -
                  </button>
                </span>
              </div>
            );
          })}
      </div>

      <div>
        {" "}
        <h2>Classes</h2>
        {Object.keys(CLASS_LIST).map((className) => (
          <div key={className}>
            {meetsRequirements(CLASS_LIST[className]) && (
              <button onClick={() => setSelectedClass(className)}>
                {className}
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        {" "}
        {selectedClass && (
          <div>
            <h2>{selectedClass} minimum requirements</h2>
            {Object.entries(CLASS_LIST[selectedClass]).map((entry) => (
              <div>
                {entry[0]} : {entry[1]}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {" "}
        <h2>Skills</h2>
        <h3>Total skills : {totalSkills}</h3>
        {SKILL_LIST &&
          SKILL_LIST.map((skill) => {
            return (
              <div>
                <span>
                  {skill.name} : {skills[skill.name]}
                </span>
                <span>(Modifier: {skill.attributeModifier})</span>
                <span>
                  {" "}
                  <button onClick={() => incrementSkills(skill)}>+</button>
                  <button onClick={() => decrementSkills(skill)}>-</button>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Attributes;
