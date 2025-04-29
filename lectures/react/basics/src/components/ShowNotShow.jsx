import React, { useState } from "react";

const ShowNotShow = ({ header, paragraph }) => {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <h1 onClick={handleClick}>{header}</h1>
      <p style={{ display: `${show ? "none" : "block"}` }}>{paragraph}</p>
    </>
  );
};

export default ShowNotShow;
