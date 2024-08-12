import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./Strip.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCards } from "../../redux/slices/flashcardSlice";
import synchronizeCards from "../../util";
import { useNavigate } from "react-router-dom";

function Strip({ card }) {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function deleteCard() {
    const user = { userId: userId };

    const res = await axios.delete(
      `${process.env.REACT_APP_HOST_URL}/cards/${card.id}`,
      { data: user }
    );

    if (res.data.message === "Flashcard deleted successfully") {
      synchronizeCards(userId, dispatch, setCards);
    } else {
      console.log(res.data);
    }
  }

  return (
    <div className="strip">
      <h5>{card.question}</h5>
      <div className="controls">
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/edit/${card.id}`, { state: card })}
        >
          <FaRegEdit className="edit-button" />
        </button>
        <button className="btn btn-danger" onClick={deleteCard}>
          <MdDelete className="delete-button" />
        </button>
      </div>
    </div>
  );
}

export default Strip;
