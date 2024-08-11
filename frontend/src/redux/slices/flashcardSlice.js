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
  },
});

export const { setCards } = flashcardSlice.actions;
export default flashcardSlice.reducer;
