import React, { useState, useEffect } from "react";

function Card(props) {
  const [imageCard, setImageCard] = useState(null);

  useEffect(() => {
    setImageCard(props.image);
  }, [props.image]);

  const handleClick = () => {
    props.onClick();
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={imageCard} alt="card" className="imageCard" />
    </div>
  );
}

export default Card;
