import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const onboard_hotel = createAsyncThunk(
  "onboard_hotel",
  async ({establishmentname,establishedtype,streetaddress,country,state,pincode,ownername,ownerphone,owneremail,whyphloii,unoquefeatures,inpersonvisit,images}, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append("establishmentName", establishmentname);
      formdata.append("establishmentType", establishedtype);
      formdata.append("streetAddress",streetaddress);
      formdata.append("country", country);
      formdata.append("state", state);
      formdata.append("pinCode", pincode);
      formdata.append("ownerName", ownername);
      formdata.append("ownerPhone", ownerphone);
      formdata.append("ownerEmail", owneremail);
      formdata.append("why_want_phloi",whyphloii);
      formdata.append( "uniqueFeatures",unoquefeatures);
      formdata.append("inPersonVisitAvailability",inpersonvisit);
      formdata.append("images",images);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/hotel/saveHotelDetails`,
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

const onboardHotel = createSlice({
  name: "onboardHotel",
  initialState: {
    status: null,
    data: null,
    error: null,
  },
  reducers: {
    clear_onboard_hotel_state: (state) => {
      state.status = null;
      state.data = null;
      state.error = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onboard_hotel.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(onboard_hotel.fulfilled, (state, action) => {
        state.status = "Success";
        state.data = action.payload;
      })
      .addCase(onboard_hotel.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.payload;
      });
  },
});
export const { clear_onboard_hotel_state } = onboardHotel.actions;
export default onboardHotel.reducer;
