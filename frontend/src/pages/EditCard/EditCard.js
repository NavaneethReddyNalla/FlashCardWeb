import React from "react";
import { useSelector } from "react-redux";
import Strip from "../../components/Strip/Strip";
import "./EditCard.css";

function EditCard() {
  const { cards } = useSelector((state) => state.flashcards);

  return (
    <div className="edit-card">
      <h2>Edit Cards</h2>
      <div className="strip-container">
        {cards.map((card, index) => {
          return <Strip key={index} card={card} />;
        })}
      </div>
    </div>
  );
}

export default EditCard;
