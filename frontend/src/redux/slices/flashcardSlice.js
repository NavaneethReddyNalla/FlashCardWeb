import { createSlice } from "@reduxjs/toolkit";

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState: {
    cards: [],
  },
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    insertCard: (state, action) => {
      state.cards = [...state.cards, action.payload];
    },
  },
});

export const { setCards, insertCard } = flashcardSlice.actions;
export default flashcardSlice.reducer;
