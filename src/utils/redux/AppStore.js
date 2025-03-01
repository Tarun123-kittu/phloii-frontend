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
import hotelNotifications from "./slices/hotelOnboardingSlice/hotelNotifications"
import manageSidebar from "./slices/sidebarSlice/manageSidebar"
import GetProfile from "./slices/profileSlice/profile"
import ChangePassword from "./slices/authSlice/changePassword"
import UpdateProfile from "./slices/profileSlice/updateProfile"
import GetCities from "./slices/countriesSlice/getCities"
import DeleteEstablishment from "./slices/hotelOnboardingSlice/deleteEstablishment"
import CreateEvent from "./slices/eventsSlice/createEvent"
import GetAllEvents from "./slices/eventsSlice/getAllEvents"
import GetSingleEvent from "./slices/eventsSlice/getSingleEvent"
import UpdateEvent from "./slices/eventsSlice/updateEvent"
import DeleteEvent from "./slices/eventsSlice/deleteEvents"

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
    DELETE_SUBSCRIPTION: deleteSubscription,
    HOTEL_NOTIFICATIONS: hotelNotifications,
    MANAGE_SIDEBAR: manageSidebar,
    PROFILE: GetProfile,
    CHANGE_PASSWORD: ChangePassword,
    UPDATE_PROFILE: UpdateProfile,
    ALL_CITIES: GetCities,
    DELETE_ESTABLISHMENT: DeleteEstablishment,
    CREATE_EVENT: CreateEvent,
    GET_ALL_EVENTS: GetAllEvents,
    GET_SINGLE_EVENT: GetSingleEvent,
    UPDATE_EVENT: UpdateEvent,
    DELETE_EVENT: DeleteEvent
  },
});

export default AppStore;
