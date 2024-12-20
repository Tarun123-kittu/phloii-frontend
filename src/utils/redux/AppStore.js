import { configureStore } from "@reduxjs/toolkit";
import onboardHotel from "./slices/hotelOnboardingSlice/HotelOnboarding";
import hotelLogin from "./slices/authSlice/login";
import hotelSignup from "./slices/authSlice/signUp"
import getCountries from "./slices/countriesSlice/getCountries"
import getHotelsDetails from "./slices/hotelOnboardingSlice/getHotelsDetails"
import getSelectedHotelDetails from "./slices/hotelOnboardingSlice/getSelectedHotelDetails"
import forgotPasswordAPI from "./slices/authSlice/forgotPassword"
import resetPasswordAPI from "./slices/authSlice/resetPassword"
import deleteHotelImage from "./slices/hotelOnboardingSlice/deleteHotelimage"
import hotelDetailsSlice from "./slices/hotelOnboardingSlice/updateHotelDetails"
import deleteSubscription from "./slices/hotelOnboardingSlice/deleteSubscription"

const AppStore = configureStore({
  reducer: {
    ONBOARD_HOTEl: onboardHotel,
    HOTEL_LOGIN: hotelLogin,
    HOTEL_SIGNUP: hotelSignup,
    ALL_COUNTRIES: getCountries,
    HOTEL_DETAILS: getHotelsDetails,
    SELECTED_HOTEL_DETAILS: getSelectedHotelDetails,
    FORGOT_PASSWORD: forgotPasswordAPI,
    RESET_PASSWORD: resetPasswordAPI,
    DELETE_HOTEL_IMAGE: deleteHotelImage,
    UPDATE_HOTEL_DETAILS: hotelDetailsSlice,
    DELETE_SUBSCRIPTION : deleteSubscription
  },
});

export default AppStore;
