'use client'

import React, { useState, useEffect } from "react";
import "./onboard.css";
import EstablishmentDetails from "@/Component/OnBoardingSteps/EstablishmentDetails";
import PersonalDetails from "@/Component/OnBoardingSteps/PersonalDetails";
import WhyPhloiiVerified from "@/Component/OnBoardingSteps/WhyPhloiiVerified";
import { useDispatch, useSelector } from "react-redux";
import { get_countries } from "@/utils/redux/slices/countriesSlice/getCountries";
import { getCities, clear_cities_data } from "@/utils/redux/slices/countriesSlice/getCities";
import { onboard_hotel, clear_onboard_hotel_state } from "@/utils/redux/slices/hotelOnboardingSlice/HotelOnboarding";
import { useRouter } from "next/navigation";
import { get_selected_hotel_details, clear_selected_hotel_details } from "@/utils/redux/slices/hotelOnboardingSlice/getSelectedHotelDetails";
import { update_hotel_details, clear_hotel_details_state } from "@/utils/redux/slices/hotelOnboardingSlice/updateHotelDetails";
import { toggle_sidebar } from "@/utils/redux/slices/sidebarSlice/manageSidebar";
import { usePathname } from "next/navigation";


const OnBoardingSteps = ({ col, hotelId }) => {
  const dispatch = useDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [establishmentname, setEstablishmentname] = useState('')
  const [establishedtype, setEstablishedtype] = useState('')
  const [streetaddress, setStreetAddress] = useState('')
  const [unitNumber, setUnitNumber] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [ownername, setOwnername] = useState('')
  const [ownerPhone, setOwnerPhone] = useState("")
  const [websiteLink, setWebsiteLink] = useState('')
  const [owneremail, setOwnerEmail] = useState('')
  const [whyphloii, setWhyphloii] = useState('')
  const [uniquefeatures, setUniqueFeatures] = useState('')
  const [inpersonvisit, setInpersonvisit] = useState('')
  const [safeWord, setSafeWord] = useState('')
  const [images, setImages] = useState([])
  const [food, setFood] = useState("")
  const [city, setCity] = useState("")
  const [additional_information, setAdditional_information] = useState("")
  const [serviceValues, setServiceValues] = useState([])
  const [atmosphere, setAtmosphere] = useState([])
  const [openTiming, setOpenTiming] = useState('')
  const [closeTiming, setCloseTiming] = useState('')
  const [citiesList, setCitiesList] = useState([])
  const [atmosphere_description, setAtmosphere_description] = useState('')
  const [customerServiceNumber, setCustomerServiceNumber] = useState('')
  const all_countries = useSelector((store) => store.ALL_COUNTRIES?.data?.data)
  const all_cities = useSelector((store) => store.ALL_CITIES)
  const is_hotel_verified = useSelector((store) => store.ONBOARD_HOTEl)
  const selected_hotel_details = useSelector((store) => store.SELECTED_HOTEL_DETAILS)
  const is_hotel_updated = useSelector((store) => store.UPDATE_HOTEL_DETAILS)


  useEffect(() => {
    return () => {
      setCountry("")
      setState("")
      setCity("")
      setCitiesList([])
      dispatch(clear_cities_data())
      dispatch(clear_selected_hotel_details())
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('phloii_user_name') && localStorage.getItem('phloii_user')) {
        setOwnername((localStorage.getItem('phloii_user_name')))
      }
    }
  }, []);

  useEffect(() => {
    if (country !== "" && state !== "") {
      dispatch(getCities({ country, state }))
    }
  }, [country, state])

  useEffect(() => {
    if (country !== "") {
      dispatch(get_countries())
    }
  }, [country])

  useEffect(() => {
    if (all_cities?.status === "Success") {
      setCitiesList(all_cities?.data?.data)
    }
  }, [all_cities])

  useEffect(() => {
    return () => {
      setEstablishmentname('')
      setEstablishedtype('')
      setStreetAddress('')
      setUnitNumber('')
      setCountry('')
      setState('')
      setPincode('')
      setOwnername('')
      setOwnerPhone('')
      setWebsiteLink('')
      setOwnerEmail('')
      setUniqueFeatures('')
      setInpersonvisit('')
      setWhyphloii('')
      setSafeWord('')
      setImages([])
      setServiceValues([])
      setAtmosphere([])
      setOpenTiming('')
      setCloseTiming('')
      setCustomerServiceNumber('')
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem('phloii_token_auth')) {
        router.push('/establishment/login')
      }
    }
  }, []);

  useEffect(() => {
    dispatch(get_countries())
  }, [])

  const handleOnboardHotel = () => {
    dispatch(onboard_hotel({
      establishmentname: establishmentname,
      establishedtype: establishedtype,
      streetaddress: streetaddress,
      unitNumber: unitNumber,
      country: country,
      state: state,
      city: city,
      pincode: pincode,
      ownername: ownername,
      ownerphone: ownerPhone.replace('+', ''),
      webSitelink: websiteLink,
      owneremail: owneremail,
      whyphloii: whyphloii,
      uniquefeatures: uniquefeatures,
      safeWord: safeWord,
      food: food,
      additional_information: additional_information,
      inpersonvisit: inpersonvisit,
      atmosphere_description: atmosphere_description,
      opentiming: openTiming,
      closetiming: closeTiming,
      customerservicenumber: customerServiceNumber.replace('+', ''),
      images: images,
    }))
  }

  const updateHotel = () => {
    if (hotelId) {
      dispatch(update_hotel_details({
        hotelId: hotelId,
        establishmentname: establishmentname,
        establishedtype: establishedtype,
        streetaddress: streetaddress,
        unitNumber: unitNumber,
        country: country,
        state: state,
        city: city,
        pincode: pincode,
        ownername: ownername,
        ownerphone: ownerPhone.replace('+', ''),
        webSitelink: websiteLink,
        owneremail: owneremail,
        whyphloii: whyphloii,
        uniquefeatures: uniquefeatures,
        safeWord: safeWord,
        food: food,
        additional_information: additional_information,
        inpersonvisit: inpersonvisit,
        atmosphere_description: atmosphere_description,
        opentiming: openTiming,
        closetiming: closeTiming,
        customerservicenumber: customerServiceNumber.replace('+', ''),
        images: images,
      }))
    }
  }

  useEffect(() => {
    if (is_hotel_verified.status === "Success") {
      router.push("/establishment")
      setCitiesList([])
      dispatch(clear_onboard_hotel_state())
      setCountry("")
      setState("")
      setCity("")
      setCitiesList([])
      dispatch(clear_cities_data())
    }
    if (is_hotel_verified.status === "Error") {
      dispatch(clear_onboard_hotel_state())
    }
  }, [is_hotel_verified])

  useEffect(() => {
    if (hotelId) {
      dispatch(get_selected_hotel_details({ id: hotelId }))
    }
  }, [])

  useEffect(() => {
    if (selected_hotel_details?.status === "Success" && hotelId) {
      setEstablishmentname(selected_hotel_details?.data?.data?.hotel?.establishmentName)
      setEstablishedtype(selected_hotel_details?.data?.data?.hotel?.establishmentType)
      setStreetAddress(selected_hotel_details?.data?.data?.hotel?.address?.streetAddress)
      setUnitNumber(selected_hotel_details?.data?.data?.hotel?.address?.suiteUnitNumber)
      setCountry(selected_hotel_details?.data?.data?.hotel?.address?.country)
      setCity(selected_hotel_details?.data?.data?.hotel?.address?.city)
      setState(selected_hotel_details?.data?.data?.hotel?.address?.state)
      setPincode(selected_hotel_details?.data?.data?.hotel?.address?.pinCode)
      setWebsiteLink(selected_hotel_details?.data?.data?.hotel?.ownerDetails?.websiteLink)
      setOwnerEmail(selected_hotel_details?.data?.data?.hotel?.ownerDetails?.ownerEmail)
      setOwnerPhone(selected_hotel_details?.data?.data?.hotel?.ownerDetails?.ownerPhone)
      setUniqueFeatures(selected_hotel_details?.data?.data?.hotel?.uniqueFeatures)
      setInpersonvisit(selected_hotel_details?.data?.data?.hotel?.inPersonVisitAvailability)
      setWhyphloii(selected_hotel_details?.data?.data?.hotel?.why_want_phloi)
      setSafeWord(selected_hotel_details?.data?.data?.hotel?.safeWord)
      setImages(selected_hotel_details?.data?.data?.hotel?.images)
      setServiceValues(selected_hotel_details?.data?.data?.hotel?.services)
      setAtmosphere(selected_hotel_details?.data?.data?.hotel?.atmosphere)
      setOpenTiming(selected_hotel_details?.data?.data?.hotel?.openCloseTimings?.open)
      setCloseTiming(selected_hotel_details?.data?.data?.hotel?.openCloseTimings?.close)
      setCustomerServiceNumber(selected_hotel_details?.data?.data?.hotel?.customerServiceNumber)
      setAtmosphere_description(selected_hotel_details?.data?.data?.hotel?.atmosphere_description)
      setFood(selected_hotel_details?.data?.data?.hotel?.food)
      setAdditional_information(selected_hotel_details?.data?.data?.hotel?.additional_information)
    }
  }, [selected_hotel_details])

  useEffect(() => {
    if (is_hotel_updated?.status === "Success") {
      dispatch(clear_hotel_details_state())
      setCountry("")
      setState("")
      setCity("")
      setCitiesList([])
      dispatch(clear_cities_data())
      router.push(`/establishment/establishment-details/${hotelId}/${establishmentname}`)
    }
    if (is_hotel_updated?.status === "Error") {
      dispatch(clear_hotel_details_state())
    }
  }, [is_hotel_updated])

  const handleToggle = () => {
    dispatch(toggle_sidebar(false))
  }

  const handleBack = () => {
    router.back()
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar_index", JSON.stringify(0))
    }
  }

  return (
    <>
      <div onClick={() => handleToggle()}>
        {pathname !== "/establishment/onboarding" && <button className="mb-3 border-class" title="Back" onClick={() => handleBack()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill="#FBC42E" />
          <path d="M13.6799 17.7068C13.4266 17.7068 13.1732 17.6134 12.9732 17.4134L8.26656 12.7068C7.8799 12.3201 7.8799 11.6801 8.26656 11.2934L12.9732 6.58675C13.3599 6.20009 13.9999 6.20009 14.3866 6.58675C14.7732 6.97342 14.7732 7.61342 14.3866 8.00009L10.3866 12.0001L14.3866 16.0001C14.7732 16.3868 14.7732 17.0268 14.3866 17.4134C14.1999 17.6134 13.9466 17.7068 13.6799 17.7068Z" fill="black" />
        </svg></button>}
        <ul className={`${col == "col-lg-6" && "justify-content-start"} step_counter`}>
          {Array.from({ length: 3 }, (_, i) => {
            const stepNumber = i + 1;
            const isActive = step === stepNumber;
            const isDone = step > stepNumber;

            return (
              <React.Fragment key={stepNumber}>
                <li
                  className={`step_item ${isActive ? "active" : ""} ${isDone ? "done" : ""
                    }`}
                >
                  <span>{stepNumber}</span>
                  <p>
                    {stepNumber === 1 && "Establishment Details"}
                    {stepNumber === 2 && "Personal Details"}
                    {stepNumber === 3 && "Why Phloii Verified"}
                  </p>
                </li>
                {stepNumber < 3 && (
                  <li
                    className={`line ${isDone ? "done" : ""}`}
                  ></li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>


      {step === 1 && <EstablishmentDetails col={col} setStep={setStep} establishmentname={establishmentname} setEstablishmentname={setEstablishmentname} establishedtype={establishedtype} setEstablishedtype={setEstablishedtype} streetaddress={streetaddress} setStreetAddress={setStreetAddress} unitNumber={unitNumber} setUnitNumber={setUnitNumber} country={country} setCountry={setCountry} state={state} setState={setState} pincode={pincode} setPincode={setPincode} all_countries={all_countries} setCity={setCity} city={city} setCitiesList={setCitiesList} citiesList={citiesList} selected_hotel_details={selected_hotel_details} />}
      {step === 2 && <PersonalDetails col={col} setStep={setStep} ownername={ownername} setOwnername={setOwnername} ownerPhone={ownerPhone} setOwnerPhone={setOwnerPhone} websiteLink={websiteLink} setWebsiteLink={setWebsiteLink} owneremail={owneremail} setOwnerEmail={setOwnerEmail} />}
      {step === 3 && <WhyPhloiiVerified col={col} setStep={setStep} whyphloii={whyphloii} setWhyphloii={setWhyphloii} uniquefeatures={uniquefeatures} setUniqueFeatures={setUniqueFeatures} inpersonvisit={inpersonvisit} setInpersonvisit={setInpersonvisit} safeWord={safeWord} setSafeWord={setSafeWord} images={images} setImages={setImages} handleOnboardHotel={handleOnboardHotel} is_hotel_verified={is_hotel_verified} setFood={setFood} food={food} setServiceValues={setServiceValues} serviceValues={serviceValues} atmosphere={atmosphere} setAtmosphere={setAtmosphere} openTiming={openTiming} setOpenTiming={setOpenTiming} closeTiming={closeTiming} setCloseTiming={setCloseTiming} customerServiceNumber={customerServiceNumber} setCustomerServiceNumber={setCustomerServiceNumber} hotelId={hotelId} updateHotel={updateHotel} is_hotel_updated={is_hotel_updated} setAtmosphere_description={setAtmosphere_description} atmosphere_description={atmosphere_description} setAdditional_information={setAdditional_information} additional_information={additional_information} />}

    </>
  );
};

export default OnBoardingSteps;
