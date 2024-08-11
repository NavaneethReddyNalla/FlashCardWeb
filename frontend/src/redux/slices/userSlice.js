import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    loggedIn: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.userId = null;
      state.loggedIn = false;
      state.error = null;
    },
    setUser: (state, action) => {
      state.userId = action.payload;
      state.loggedIn = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError, setUser, reset } = userSlice.actions;
export default userSlice.reducer;
