'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./onboard.css";
import EstablishmentDetails from "@/Component/OnBoardingSteps/EstablishmentDetails";
import PersonalDetails from "@/Component/OnBoardingSteps/PersonalDetails";
import WhyPhloiiVerified from "@/Component/OnBoardingSteps/WhyPhloiiVerified";
import { useDispatch, useSelector } from "react-redux";
import { get_countries } from "@/utils/redux/slices/countriesSlice/getCountries";
import { onboard_hotel, clear_onboard_hotel_state } from "@/utils/redux/slices/hotelOnboardingSlice/HotelOnboarding";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Page = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [step, setStep] = useState(1)
  // establishmentname,establishedtype,streetaddress,country,state,pincode,ownername,ownerphone,owneremail,whyphloii,unoquefeatures,inpersonvisit,images
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
    <div className="onboard_wrapper">
      <header className={"header-card"}>
        <Image src="/assets/logo.png" width={139} height={57} alt="logo" />
      </header>
      <div className="board_form">
        <div className="auth_form">
          <h2 className="main_heading text-center mt-2">Registration Form</h2>
          <p className="sort_desc text-center text-white">
            Please fill out this form with the required information
          </p>
          <ul className="step_counter">
            <li>
              <span>1</span>
              <p>
                Establishment <br />
                details
              </p>
            </li>
            <li className="line"></li>
            <li>
              <span>2</span>
              <p>Personal <br /> Details</p>
            </li>
            <li className="line"></li>
            <li>
              <span>3</span>
              <p>
                Why Phloii <br /> Verified
              </p>
            </li>
          </ul>
        </div>
        {step === 1 && <EstablishmentDetails col="col-lg-12" setStep={setStep} establishmentname={establishmentname} setEstablishmentname={setEstablishmentname} establishedtype={establishedtype} setEstablishedtype={setEstablishedtype} streetaddress={streetaddress} setStreetAddress={setStreetAddress} unitNumber={unitNumber} setUnitNumber={setUnitNumber} country={country} setCountry={setCountry} state={state} setState={setState} pincode={pincode} setPincode={setPincode} all_countries={all_countries} />}
        {step === 2 && <PersonalDetails col="col-lg-12" setStep={setStep} ownername={ownername} setOwnername={setOwnername} ownerPhone={ownerPhone} setOwnerPhone={setOwnerPhone} websiteLink={websiteLink} setWebsiteLink={setWebsiteLink} owneremail={owneremail} setOwnerEmail={setOwnerEmail} />}
        {step === 3 && <WhyPhloiiVerified col="col-lg-12" setStep={setStep} whyphloii={whyphloii} setWhyphloii={setWhyphloii} uniquefeatures={uniquefeatures} setUniqueFeatures={setUniqueFeatures} inpersonvisit={inpersonvisit} setInpersonvisit={setInpersonvisit} safeWord={safeWord} setSafeWord={setSafeWord} images={images} setImages={setImages} handleOnboardHotel={handleOnboardHotel} is_hotel_verified={is_hotel_verified} />}
      </div>
    </div>
  );
};

export default Page;
