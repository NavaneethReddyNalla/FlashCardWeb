import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import synchronizeCards from "../../util";
import { useDispatch } from "react-redux";
import { setCards } from "../../redux/slices/flashcardSlice";

function UpdateCard() {
  const { register, handleSubmit } = useForm();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function editCard(card) {
    card.userId = state.user_id;

    const res = await axios.put(
      `${process.env.REACT_APP_HOST_URL}/cards/${state.id}`,
      card
    );

    if (res.data.message === "Flashcard updated successfully") {
      synchronizeCards(card.userId, dispatch, setCards);
      navigate("/");
    } else {
      console.log(res.data);
    }
  }

  return (
    <div>
      <div className="create-form">
        <form onSubmit={handleSubmit(editCard)}>
          <h3>Update Card</h3>
          <label htmlFor="question">Question</label>
          <input
            type="text"
            {...register("question", { required: true })}
            className="form-control"
            defaultValue={state.question}
            placeholder="Question"
          />

          <label htmlFor="answer">Answer</label>
          <input
            type="text"
            {...register("answer", { required: true })}
            className="form-control"
            defaultValue={state.answer}
            placeholder="Answer"
          />

          <label htmlFor="category">Category</label>
          <input
            type="text"
            {...register("category", { required: true })}
            className="form-control"
            defaultValue={state.category}
            placeholder="Category"
          />

          <button type="submit" className="btn btn-success">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCard;
