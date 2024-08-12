import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./Strip.css";

function Strip({ card }) {
  return (
    <div className="strip">
      <h5>{card.question}</h5>
      <div className="controls">
        <button className="btn btn-warning">
          <FaRegEdit className="edit-button" />
        </button>
        <button className="btn btn-danger">
          <MdDelete className="delete-button" />
        </button>
      </div>
    </div>
  );
}

export default Strip;
