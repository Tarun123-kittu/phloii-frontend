import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

// Async thunk for hotel signup
export const hotel_signup = createAsyncThunk(
  "hotel_signup",
  async ({ username, email, password,phone,profileImage }, thunkAPI) => {
    try {
      if (!username || !email || !password) {
        return thunkAPI.rejectWithValue({
          message: "All fields are required",
        });
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phone);
      formData.append("image", profileImage);

      const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };

      console.log("Sending signup request...");
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/hotel/signUp`,
        requestOptions
      );
      console.log("Received response status:", response.status);

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log("Error response:", errorMessage);
        throw new Error(errorMessage.message || "Unknown error occurred");
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

// Redux slice
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
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hotel_signup.pending, (state) => {
        state.status = "Loading";
        state.data = null;
        state.error = null;
      })
      .addCase(hotel_signup.fulfilled, (state, action) => {
        state.status = "Success";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(hotel_signup.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.payload;
      });
  },
});

export const { clear_hotel_signup_state } = hotelSignup.actions;
export default hotelSignup.reducer;