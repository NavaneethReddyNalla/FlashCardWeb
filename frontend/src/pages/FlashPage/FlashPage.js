import React from "react";
import Card from "../../components/Card/Card";
import "./FlashPage.css";

function FlashPage() {
  return (
    <div className="flash-page">
      <Card question={"Test Q"} answer={"Test A"} />
    </div>
  );
}

export default FlashPage;
