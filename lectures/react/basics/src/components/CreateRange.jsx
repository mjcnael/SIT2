import { useState } from "react";

const CreateRange = ({ firstValue, step }) => {
  const [count, setCount] = useState(1);

  const generateSequence = () => {
    const sequence = [];
    for (let i = 0; i < count; i++) {
      sequence.push(Number(firstValue) + Number(step) * i);
    }

    return sequence;
  };

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const sequence = generateSequence();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          justifyContent: "center",
        }}
      >
        {sequence.map((num, index) => (
          <span key={index}>{num}</span>
        ))}

        <span style={{ cursor: "pointer" }} onClick={handleClick}>
          ...
        </span>
      </div>
    </div>
  );
};

export default CreateRange;
