import React, { useState } from "react";
import "./Card.css";

function Card({ question, answer }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`flash-card ${flip && "flipped"}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="flash-card-inner">
        <div className="card-front">
          <h3>Question</h3>
          <br />
          <h5>{question}</h5>
          <p>Click here to reveal answer</p>
        </div>
        <div className="card-back">
          <h3>Answer</h3>
          <br />
          <h5>{answer}</h5>
          <p>Click here to hide the answer</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
