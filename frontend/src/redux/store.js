// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "./slices/flashcardSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    flashcards: flashcardReducer,
    user: userReducer,
  },
});

export default store;
