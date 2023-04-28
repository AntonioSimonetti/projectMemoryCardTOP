import React from "react";

function Header(props) {
  const { info } = props;

  return (
    <div className="headerText">
      <p>{info}</p>
    </div>
  );
}

export default Header;
