import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./FlashPage.css";
import { useSelector } from "react-redux";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function FlashPage() {
  const { cards } = useSelector((state) => state.flashcards);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let addedCats = new Set(cards.map((card) => card.category));
    setCategories(Array.from(addedCats));

    if (categories.length) {
      setCategory(categories[0]);
    } else {
      setCategory("No Cards");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  return (
    <div className="flash-page">
      <div className="cards-container">
        <div id="cards" className="carousel slide">
          <div className="carousel-inner">
            {cards
              .filter((card) => card.category === category)
              .map((card, index) => {
                return (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <Card
                      key={card.id}
                      question={card.question}
                      answer={card.answer}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#cards"
          data-bs-slide="prev"
        >
          <MdNavigateBefore className="carousel-button" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          data-bs-target="#cards"
          data-bs-slide="next"
        >
          <MdNavigateNext className="carousel-button" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <label htmlFor="category" className="category-label">
        Category
      </label>
      <select
        name="category"
        id="category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        {categories.map((cat, index) => {
          return (
            <option key={index} value={cat}>
              {cat}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FlashPage;
