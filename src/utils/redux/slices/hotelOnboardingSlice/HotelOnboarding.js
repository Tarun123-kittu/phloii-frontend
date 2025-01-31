'use client'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";
import React from "react";

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
      city,
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
      additional_information,
      atmosphere_description,
      opentiming,
      closetiming,
      customerservicenumber,
      images, // Array of images
    },
    thunkAPI
  ) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

      const formdata = new FormData();
      formdata.append("establishmentName", establishmentname);
      formdata.append("establishmentType", establishedtype);
      formdata.append("streetAddress", streetaddress);
      formdata.append("suiteUnitNumber", unitNumber);
      formdata.append("country", country);
      formdata.append("state", state);
      formdata.append("city", city);
      formdata.append("pinCode", pincode);
      formdata.append("ownerName", ownername);
      formdata.append("ownerPhone", ownerphone);
      formdata.append("websiteLink", webSitelink);
      formdata.append("ownerEmail", owneremail);
      formdata.append("why_want_phloi", whyphloii);
      formdata.append("uniqueFeatures", uniquefeatures);
      formdata.append("inPersonVisitAvailability", inpersonvisit);
      formdata.append("safeWord", safeWord);
      formdata.append("atmosphere_description", atmosphere_description);
      formdata.append("food", food);
      formdata.append("additional_information", additional_information);

      // // Add array fields
      // food.forEach((item) => formdata.append("food", item));
      // atmosphere.forEach((item) => formdata.append("atmosphere", item));
      // services.forEach((item) => formdata.append("services", item));

      // Add additional fields
      formdata.append("openTiming", opentiming);
      formdata.append("closeTiming", closetiming);
      formdata.append("customerServiceNumber", customerservicenumber);

      // Add images
      images.forEach((image) => {
        formdata.append("images", image);
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/hotel/saveHotelDetails`,
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
