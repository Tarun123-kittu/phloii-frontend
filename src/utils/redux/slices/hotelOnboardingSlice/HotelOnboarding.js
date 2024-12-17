'use client'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const onboard_hotel = createAsyncThunk(
  "onboard_hotel",
  async (
    {
      establishmentname,
      establishedtype,
      streetaddress,
      unitNumber,
      country,
      state,
      pincode,
      ownername,
      ownerphone,
      webSitelink,
      owneremail,
      whyphloii,
      uniquefeatures,
      safeWord,
      inpersonvisit,
      images, // Array of images
    },
    thunkAPI
  ) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('phloii_token_auth'));

      const formdata = new FormData();
      formdata.append("establishmentName", establishmentname);
      formdata.append("establishmentType", establishedtype);
      formdata.append("streetAddress", streetaddress);
      formdata.append("suiteUnitNumber", unitNumber);
      formdata.append("country", country);
      formdata.append("state", state);
      formdata.append("pinCode", pincode);
      formdata.append("ownerName", ownername);
      formdata.append("ownerPhone", ownerphone);
      formdata.append("websiteLink", webSitelink);
      formdata.append("ownerEmail", owneremail);
      formdata.append("why_want_phloi", whyphloii);
      formdata.append("uniqueFeatures", uniquefeatures);
      formdata.append("safeWord", safeWord);
      formdata.append("inPersonVisitAvailability", inpersonvisit);
      images.forEach((image, index) => {
        formdata.append(`images`, image);
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        `https://dev.phloii.com/api/v1/hotel/saveHotelDetails`,
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