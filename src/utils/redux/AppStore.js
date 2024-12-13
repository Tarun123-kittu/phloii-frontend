import { configureStore } from "@reduxjs/toolkit";
import onboardHotel from "./slices/hotelOnboardingSlice/HotelOnboarding";
import hotelLogin from "./slices/authSlice/login";
import hotelSignup from './slices/authSlice/login'

const AppStore = configureStore({
  reducer: {
    ONBOARD_HOTEl: onboardHotel,
    HOTEL_LOGIN: hotelLogin,
    HOTEL_SIGNUP : hotelSignup
  },
});

export default AppStore;
