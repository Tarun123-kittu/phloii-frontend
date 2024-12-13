import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const hotel_login = createAsyncThunk(
  "hotel_login",
  async ({ email, password }, thunkAPI) => {
    console.log(process.env.REACT_APP_BACKEND_URL,"process.env.REACT_APP_BACKEND_URL")
    try {
      const raw = JSON.stringify({
        email: email,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `https://dev.phloii.com/api/v1/hotel/signIn`,
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

const hotelLogin = createSlice({
  name: "hotelLogin",
  initialState: {
    status: null,
    data: null,
    error: null,
  },
  reducers: {
    clear_hotel_login_state: (state) => {
      state.status = null;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hotel_login.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(hotel_login.fulfilled, (state, action) => {
        state.status = "Success";
        state.data = action.payload;
      })
      .addCase(hotel_login.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.payload;
      });
  },
});

export const { clear_hotel_login_state } = hotelLogin.actions;
export default hotelLogin.reducer;
