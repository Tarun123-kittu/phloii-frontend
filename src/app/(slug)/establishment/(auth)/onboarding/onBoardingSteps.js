'use client'

import React, { useState, useEffect } from "react";
import "./onboard.css";
import EstablishmentDetails from "@/Component/OnBoardingSteps/EstablishmentDetails";
import PersonalDetails from "@/Component/OnBoardingSteps/PersonalDetails";
import WhyPhloiiVerified from "@/Component/OnBoardingSteps/WhyPhloiiVerified";
import { useDispatch, useSelector } from "react-redux";
import { get_countries } from "@/utils/redux/slices/countriesSlice/getCountries";
import { onboard_hotel, clear_onboard_hotel_state } from "@/utils/redux/slices/hotelOnboardingSlice/HotelOnboarding";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { get_selected_hotel_details, clear_selected_hotel_details } from "@/utils/redux/slices/hotelOnboardingSlice/getSelectedHotelDetails";
import { update_hotel_details, clear_hotel_details_state } from "@/utils/redux/slices/hotelOnboardingSlice/updateHotelDetails";
import { toggle_sidebar } from "@/utils/redux/slices/sidebarSlice/manageSidebar";


const OnBoardingSteps = ({ col, hotelId }) => {
  const dispatch = useDispatch()
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
  const [ownerPhone, setOwnerPhone] = useState('')
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
  const [atmosphere_description, setAtmosphere_description] = useState('')
  const [customerServiceNumber, setCustomerServiceNumber] = useState('')
  const all_countries = useSelector((store) => store.ALL_COUNTRIES?.data?.data)
  const is_hotel_verified = useSelector((store) => store.ONBOARD_HOTEl)
  const selected_hotel_details = useSelector((store) => store.SELECTED_HOTEL_DETAILS)
  const is_hotel_updated = useSelector((store) => store.UPDATE_HOTEL_DETAILS)
  const profileDetails = useSelector((state) => state.PROFILE?.data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('phloii_user_name') && localStorage.getItem('phloii_user')) {
        setOwnername((localStorage.getItem('phloii_user_name')))
      }
    }
  }, []);

  useEffect(() => {
    if (profileDetails?.type === "success") {
      setOwnername(profileDetails?.data?.username)
    }
  }, [profileDetails])

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
      ownerphone: ownerPhone,
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
      customerservicenumber: customerServiceNumber,
      images: images,
    }))
  }

  const updateHotel = () => {
    if (hotelId) {
      const hotelDetails = selected_hotel_details?.data?.data?.hotel;
      if (
        establishmentname === hotelDetails?.establishmentName &&
        streetaddress === hotelDetails?.address?.streetAddress &&
        unitNumber === hotelDetails?.address?.suiteUnitNumber &&
        country === hotelDetails?.address?.country &&
        state === hotelDetails?.address?.state &&
        city === hotelDetails?.address?.city &&
        pincode === hotelDetails?.address?.pinCode &&
        ownername === hotelDetails?.ownerDetails?.ownerName &&
        ownerPhone === hotelDetails?.ownerDetails?.ownerPhone &&
        owneremail === hotelDetails?.ownerDetails?.ownerEmail &&
        whyphloii === hotelDetails?.why_want_phloi &&
        uniquefeatures === hotelDetails?.uniqueFeatures &&
        safeWord === hotelDetails?.safeWord &&
        inpersonvisit === hotelDetails?.inPersonVisitAvailability &&
        atmosphere_description === hotelDetails?.atmosphere_description &&
        openTiming === hotelDetails?.openCloseTimings?.open &&
        closeTiming === hotelDetails?.openCloseTimings?.close &&
        customerServiceNumber === hotelDetails?.customerServiceNumber &&
        (food === hotelDetails?.food || hotelDetails?.food === undefined || hotelDetails?.food === null) &&
        (additional_information === hotelDetails?.additional_information || hotelDetails?.additional_information === undefined || hotelDetails?.additional_information === null) &&
        (websiteLink === hotelDetails?.website_link || hotelDetails?.website_link === "" || hotelDetails?.website_link === null)
      ) {
        toast.error("It seems you haven't made any changes to update. Please make some changes to update.");
      }
      else {
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
          ownerphone: ownerPhone,
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
          customerservicenumber: customerServiceNumber,
          images: images,
        }))
      }
    }
  }

  useEffect(() => {
    if (is_hotel_verified.status === "Success") {
      toast.success(is_hotel_verified?.data?.message)
      router.push("/establishment")
      dispatch(clear_onboard_hotel_state())
    }
    if (is_hotel_verified.status === "Error") {
      toast.error(is_hotel_verified.error.message)
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
      console.log(selected_hotel_details,"this is the selected hotel details")
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
  }, [])

  useEffect(() => {
    if (is_hotel_updated?.status === "Success") {
      toast.success(is_hotel_updated?.data?.message)
      dispatch(clear_hotel_details_state())
      router.push(`/establishment/establishment-details/${hotelId}/${establishmentname}`)
    }
    if (is_hotel_updated?.status === "Error") {
      toast.error(is_hotel_updated?.error?.message)
      dispatch(clear_hotel_details_state())
    }
  }, [is_hotel_updated])

  const handleToggle = () => {
    dispatch(toggle_sidebar(false))
  }

  return (
    <>
      <div onClick={() => handleToggle()}>
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
                    {stepNumber === 1 && "Establishment details"}
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


      {step === 1 && <EstablishmentDetails col={col} setStep={setStep} establishmentname={establishmentname} setEstablishmentname={setEstablishmentname} establishedtype={establishedtype} setEstablishedtype={setEstablishedtype} streetaddress={streetaddress} setStreetAddress={setStreetAddress} unitNumber={unitNumber} setUnitNumber={setUnitNumber} country={country} setCountry={setCountry} state={state} setState={setState} pincode={pincode} setPincode={setPincode} all_countries={all_countries} setCity={setCity} city={city} />}
      {step === 2 && <PersonalDetails col={col} setStep={setStep} ownername={ownername} setOwnername={setOwnername} ownerPhone={ownerPhone} setOwnerPhone={setOwnerPhone} websiteLink={websiteLink} setWebsiteLink={setWebsiteLink} owneremail={owneremail} setOwnerEmail={setOwnerEmail} />}
      {step === 3 && <WhyPhloiiVerified col={col} setStep={setStep} whyphloii={whyphloii} setWhyphloii={setWhyphloii} uniquefeatures={uniquefeatures} setUniqueFeatures={setUniqueFeatures} inpersonvisit={inpersonvisit} setInpersonvisit={setInpersonvisit} safeWord={safeWord} setSafeWord={setSafeWord} images={images} setImages={setImages} handleOnboardHotel={handleOnboardHotel} is_hotel_verified={is_hotel_verified} setFood={setFood} food={food} setServiceValues={setServiceValues} serviceValues={serviceValues} atmosphere={atmosphere} setAtmosphere={setAtmosphere} openTiming={openTiming} setOpenTiming={setOpenTiming} closeTiming={closeTiming} setCloseTiming={setCloseTiming} customerServiceNumber={customerServiceNumber} setCustomerServiceNumber={setCustomerServiceNumber} hotelId={hotelId} updateHotel={updateHotel} is_hotel_updated={is_hotel_updated} setAtmosphere_description={setAtmosphere_description} atmosphere_description={atmosphere_description} setAdditional_information={setAdditional_information} additional_information={additional_information} />}

    </>
  );
};

export default OnBoardingSteps;
