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
  const [foodValues, setFoodValues] = useState([])
  const [serviceValues, setServiceValues] = useState([])
  const [atmosphere, setAtmosphere] = useState([])
  const [openTiming, setOpenTiming] = useState('')
  const [closeTiming, setCloseTiming] = useState('')
  const [customerServiceNumber, setCustomerServiceNumber] = useState('')
  const all_countries = useSelector((store) => store.ALL_COUNTRIES?.data?.data)
  const is_hotel_verified = useSelector((store) => store.ONBOARD_HOTEl)
  const selected_hotel_details = useSelector((store) => store.SELECTED_HOTEL_DETAILS)
  const is_hotel_updated = useSelector((store) => store.UPDATE_HOTEL_DETAILS)

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
      pincode: pincode,
      ownername: ownername,
      ownerphone: ownerPhone,
      webSitelink: websiteLink,
      owneremail: owneremail,
      whyphloii: whyphloii,
      uniquefeatures: uniquefeatures,
      safeWord: safeWord,
      inpersonvisit: inpersonvisit,
      food: foodValues,
      atmosphere: atmosphere,
      services: serviceValues,
      opentiming: openTiming,
      closetiming: closeTiming,
      customerservicenumber: customerServiceNumber,
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
        pincode: pincode,
        ownername: ownername,
        ownerphone: ownerPhone,
        webSitelink: websiteLink,
        owneremail: owneremail,
        whyphloii: whyphloii,
        uniquefeatures: uniquefeatures,
        safeWord: safeWord,
        inpersonvisit: inpersonvisit,
        food: foodValues,
        atmosphere: atmosphere,
        services: serviceValues,
        opentiming: openTiming,
        closetiming: closeTiming,
        customerservicenumber: customerServiceNumber,
        images: images,
      }))
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
    if (selected_hotel_details?.status === "Success") {
      setEstablishmentname(selected_hotel_details?.data?.data?.hotel?.establishmentName)
      setEstablishedtype(selected_hotel_details?.data?.data?.hotel?.establishmentType)
      setStreetAddress(selected_hotel_details?.data?.data?.hotel?.address?.streetAddress)
      setUnitNumber(selected_hotel_details?.data?.data?.hotel?.address?.suiteUnitNumber)
      setCountry(selected_hotel_details?.data?.data?.hotel?.address?.country)
      setState(selected_hotel_details?.data?.data?.hotel?.address?.state)
      setPincode(selected_hotel_details?.data?.data?.hotel?.address?.pinCode)
      setOwnername(selected_hotel_details?.data?.data?.hotel?.ownerDetails?.ownerName)
      setOwnerPhone(selected_hotel_details?.data?.data?.hotel?.ownerDetails?.ownerPhone)
      setWebsiteLink(selected_hotel_details?.data?.data?.hotel?.ownerDetails?.websiteLink)
      setOwnerEmail(selected_hotel_details?.data?.data?.hotel?.ownerDetails?.ownerEmail)
      setUniqueFeatures(selected_hotel_details?.data?.data?.hotel?.uniqueFeatures)
      setInpersonvisit(selected_hotel_details?.data?.data?.hotel?.inPersonVisitAvailability)
      setWhyphloii(selected_hotel_details?.data?.data?.hotel?.why_want_phloi)
      setSafeWord(selected_hotel_details?.data?.data?.hotel?.safeWord)
      setImages(selected_hotel_details?.data?.data?.hotel?.images)
      setFoodValues(selected_hotel_details?.data?.data?.hotel?.food)
      setServiceValues(selected_hotel_details?.data?.data?.hotel?.services)
      setAtmosphere(selected_hotel_details?.data?.data?.hotel?.atmosphere)
      setOpenTiming(selected_hotel_details?.data?.data?.hotel?.openCloseTimings?.open)
      setCloseTiming(selected_hotel_details?.data?.data?.hotel?.openCloseTimings?.close)
      setCustomerServiceNumber(selected_hotel_details?.data?.data?.hotel?.customerServiceNumber)
    }
  }, [])

  useEffect(() => {
    if (is_hotel_updated?.status === "Success") {
      toast.success(is_hotel_updated?.data?.message)
      dispatch(clear_hotel_details_state())
      router.push(`/establishment/establishment-details/${hotelId}/${establishmentname}`)
    }
    if(is_hotel_updated?.status === "Error"){
      toast.error(is_hotel_updated?.error?.message)
      dispatch(clear_hotel_details_state())
    }
  }, [is_hotel_updated])
  return (
    <>
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

      {step === 1 && <EstablishmentDetails col={col} setStep={setStep} establishmentname={establishmentname} setEstablishmentname={setEstablishmentname} establishedtype={establishedtype} setEstablishedtype={setEstablishedtype} streetaddress={streetaddress} setStreetAddress={setStreetAddress} unitNumber={unitNumber} setUnitNumber={setUnitNumber} country={country} setCountry={setCountry} state={state} setState={setState} pincode={pincode} setPincode={setPincode} all_countries={all_countries} />}
      {step === 2 && <PersonalDetails col={col} setStep={setStep} ownername={ownername} setOwnername={setOwnername} ownerPhone={ownerPhone} setOwnerPhone={setOwnerPhone} websiteLink={websiteLink} setWebsiteLink={setWebsiteLink} owneremail={owneremail} setOwnerEmail={setOwnerEmail} />}
      {step === 3 && <WhyPhloiiVerified col={col} setStep={setStep} whyphloii={whyphloii} setWhyphloii={setWhyphloii} uniquefeatures={uniquefeatures} setUniqueFeatures={setUniqueFeatures} inpersonvisit={inpersonvisit} setInpersonvisit={setInpersonvisit} safeWord={safeWord} setSafeWord={setSafeWord} images={images} setImages={setImages} handleOnboardHotel={handleOnboardHotel} is_hotel_verified={is_hotel_verified} setFoodValues={setFoodValues} foodValues={foodValues} setServiceValues={setServiceValues} serviceValues={serviceValues} atmosphere={atmosphere} setAtmosphere={setAtmosphere} openTiming={openTiming} setOpenTiming={setOpenTiming} closeTiming={closeTiming} setCloseTiming={setCloseTiming} customerServiceNumber={customerServiceNumber} setCustomerServiceNumber={setCustomerServiceNumber} hotelId={hotelId} updateHotel={updateHotel} is_hotel_updated={is_hotel_updated}/>}

    </>
  );
};

export default OnBoardingSteps;
