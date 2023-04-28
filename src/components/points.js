import React from "react";

function Points(props) {
  const { currentPoints, bestScore, consecutiveWins } = props;

  return (
    <div className="points">
      <p>Current points: {currentPoints}</p>
      <p>Best score: {bestScore}</p>
      <p>Consecutive wins: {consecutiveWins}</p>
    </div>
  );
}

export default Points;
