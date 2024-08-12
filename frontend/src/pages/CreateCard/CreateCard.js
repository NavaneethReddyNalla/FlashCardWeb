import React from "react";
import { useForm } from "react-hook-form";
import "./CreateCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCards } from "../../redux/slices/flashcardSlice";

function CreateCard() {
  const { register, handleSubmit } = useForm();
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function createCard(card) {
    card.userId = userId;

    const res = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/cards`,
      card
    );

    if (res.data.message === "Flashcard created successfully") {
      const newCards = await axios.get(
        `${process.env.REACT_APP_HOST_URL}/cards/${userId}`
      );
      dispatch(setCards(newCards));
      navigate("/");
    }
  }

  return (
    <div>
      <div className="create-form">
        <form onSubmit={handleSubmit(createCard)}>
          <h3>Create a Card</h3>
          <label htmlFor="question" className="visually-hidden">
            Question
          </label>
          <input
            type="text"
            {...register("question", { required: true })}
            className="form-control"
            placeholder="Question"
          />

          <label htmlFor="answer" className="visually-hidden">
            Answer
          </label>
          <input
            type="text"
            {...register("answer", { required: true })}
            className="form-control"
            placeholder="Answer"
          />

          <label htmlFor="category" className="visually-hidden">
            Category
          </label>
          <input
            type="text"
            {...register("category", { required: true })}
            className="form-control"
            placeholder="Category"
          />

          <button type="submit" className="btn btn-success">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCard;
