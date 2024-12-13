import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const hotel_signup = createAsyncThunk(
  "hotel_signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        username: username,
        email: email,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://dev.phloii.com/api/v1/hotel/signUp",
        requestOptions
      );
      if (!response.ok) {
        const errorMessage = await response.json();
        if (errorMessage) {
          throw new Error(errorMessage.message);
        }
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
      });
    }
  }
);

const hotelSignup = createSlice({
  name: "hotelSignup",
  initialState: {
    status: null,
    data: null,
    error: null,
  },
  reducers: {
    clear_hotel_signup_state: (state) => {
      state.status = null;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hotel_signup.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(hotel_signup.fulfilled, (state, action) => {
        state.status = "Success";
        state.data = action.payload;
      })
      .addCase(hotel_signup.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.payload;
      });
  },
});
export const { clear_hotel_signup_state } = hotelSignup.actions;
export default hotelSignup.reducer;
