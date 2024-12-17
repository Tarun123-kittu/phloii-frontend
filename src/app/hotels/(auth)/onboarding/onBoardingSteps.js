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
const OnBoardingSteps = ({col}) => {
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
  const all_countries = useSelector((store) => store.ALL_COUNTRIES?.data?.data)
  const is_hotel_verified = useSelector((store) => store.ONBOARD_HOTEl)
  console.log(is_hotel_verified, "is_hotel_verified is_hotel_verified")

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
      images: images,
    }))
  }

  useEffect(() => {
    if (is_hotel_verified.status === "Success") {
      toast.success(is_hotel_verified?.data?.message)
      router.push("/hotels")
      dispatch(clear_onboard_hotel_state())
    }
    if(is_hotel_verified.status === "Error"){
      toast.error(is_hotel_verified.error.message)
      dispatch(clear_onboard_hotel_state())
    }
  }, [is_hotel_verified])
  return (
            <>
            <ul className={`${col== "col-lg-6" && "justify-content-start"} step_counter`}>
            {Array.from({ length: 3 }, (_, i) => {
                const stepNumber = i + 1;
                const isActive = step === stepNumber; // Current step
                const isDone = step > stepNumber; // Completed step

                return (
                <React.Fragment key={stepNumber}>
                    <li
                    className={`step_item ${isActive ? "active" : ""} ${
                        isDone ? "done" : ""
                    }`}
                    >
                    <span>{stepNumber}</span>
                    <p>
                        {stepNumber === 1 && "Establishment details"}
                        {stepNumber === 2 && "Personal Details"}
                        {stepNumber === 3 && "Why Phloii Verified"}
                    </p>
                    </li>
                    {/* Add the line only between steps */}
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
        {step === 3 && <WhyPhloiiVerified col={col} setStep={setStep} whyphloii={whyphloii} setWhyphloii={setWhyphloii} uniquefeatures={uniquefeatures} setUniqueFeatures={setUniqueFeatures} inpersonvisit={inpersonvisit} setInpersonvisit={setInpersonvisit} safeWord={safeWord} setSafeWord={setSafeWord} images={images} setImages={setImages} handleOnboardHotel={handleOnboardHotel} is_hotel_verified={is_hotel_verified} />}
    
   </>
  );
};

export default OnBoardingSteps;
