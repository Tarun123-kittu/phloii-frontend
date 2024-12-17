import { configureStore } from "@reduxjs/toolkit";
import onboardHotel from "./slices/hotelOnboardingSlice/HotelOnboarding";
import hotelLogin from "./slices/authSlice/login";
import hotelSignup from "./slices/authSlice/signUp"
import getCountries from "./slices/countriesSlice/getCountries"
import getHotelsDetails from "./slices/hotelOnboardingSlice/getHotelsDetails"
import getSelectedHotelDetails from "./slices/hotelOnboardingSlice/getSelectedHotelDetails"

const AppStore = configureStore({
  reducer: {
    ONBOARD_HOTEl: onboardHotel,
    HOTEL_LOGIN: hotelLogin,
    HOTEL_SIGNUP : hotelSignup,
    ALL_COUNTRIES : getCountries,
    HOTEL_DETAILS:getHotelsDetails,
    SELECTED_HOTEL_DETAILS:getSelectedHotelDetails
  },
});

export default AppStore;
