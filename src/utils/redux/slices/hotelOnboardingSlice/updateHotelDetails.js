'use client'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const update_hotel_details = createAsyncThunk(
  "update_hotel_details",
  async (
    {
      hotelId,
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
      inpersonvisit,
      safeWord,
      food,
      atmosphere,
      services,
      opentiming,
      closetiming,
      customerservicenumber,
      images,
    },
    thunkAPI
  ) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

      const formdata = new FormData();
      formdata.append("hotelId", hotelId);
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
      formdata.append("inPersonVisitAvailability", inpersonvisit);
      formdata.append("safeWord", safeWord);

      food.forEach((item) => formdata.append("food", item));
      atmosphere.forEach((item) => formdata.append("atmosphere", item));
      services.forEach((item) => formdata.append("services", item));

      formdata.append("openTiming", opentiming);
      formdata.append("closeTiming", closetiming);
      formdata.append("customerServiceNumber", customerservicenumber);

      images.forEach((image) => {
        formdata.append("images", image);
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        "https://dev.phloii.com/api/v1/hotel/update_hotel_details",
        requestOptions
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Failed to update hotel details");
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

const hotelDetailsSlice = createSlice({
  name: "hotelDetailsSlice",
  initialState: {
    status: null,
    data: null,
    error: null,
  },
  reducers: {
    clear_hotel_details_state: (state) => {
      state.status = null;
      state.data = null;
      state.error = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(update_hotel_details.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(update_hotel_details.fulfilled, (state, action) => {
        state.status = "Success";
        state.data = action.payload;
      })
      .addCase(update_hotel_details.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.payload;
      });
  },
});

export const { clear_hotel_details_state } = hotelDetailsSlice.actions;
export default hotelDetailsSlice.reducer;
