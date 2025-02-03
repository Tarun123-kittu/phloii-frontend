'use client'

import React, { useState, useEffect } from "react";
import Button from "../Hotel/Button/Button";
import { toggle_sidebar } from "@/utils/redux/slices/sidebarSlice/manageSidebar";
import { useDispatch } from "react-redux";


const EstablishmentDetails = ({ col, setStep, establishmentname, setEstablishmentname, establishedtype, setEstablishedtype, streetaddress, setStreetAddress, unitNumber, setUnitNumber, country, setCountry, state, setState, pincode, setPincode, all_countries, setCity, city,citiesList,selected_hotel_details}) => {
  const [states, setStates] = useState([])
  const dispatch = useDispatch()
  const [establishmentnameError, setEstablishmentError] = useState('')
  const [establishmenttypeError, setEstablishmentTypeError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [unitnumberError, setUnitNumberError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [stateError, setStateError] = useState('')
  const [cityError,setCityError] = useState('')
  const [pincodeError, setPincodeError] = useState('')
  const handleForward = () => {
    if (!establishmentname && !establishedtype && !streetaddress && !unitNumber && !country && !state && !pincode) {
      setEstablishmentError("Please enter the establishment name")
      // setEstablishmentTypeError("Please Select the establishment type")
      setAddressError("Please enter the street address")
      setUnitNumberError("Please enter the unit number")
      setCountryError("Please select the country")
      setStateError("Please select the state")
      setPincodeError("Please enter the pincode")
    }
    if (!establishmentname) {
      setEstablishmentError("Please enter the establishment name")
      return
    }
    // if (!establishedtype) {
    //   setEstablishmentTypeError("Please Select the establishment type")
    //   return
    // }
    if (!streetaddress) {
      setAddressError("Please enter the street address")
      return
    }
    if (!unitNumber) {
      setUnitNumberError("Please enter the unit number")
      return
    }
    if (!country) {
      setCountryError("Please select the country")
      return
    }
    if (!state) {
      setStateError("Please select the state")
      return
    }
    if (!city) {
      setCityError("Please enter the city name")
      return
    }
    if (!pincode) {
      setPincodeError("Please enter the pincode")
      return
    }
    setStep(2)
  }
  // const handleBackword = () => {
  //   setStep(1)
  // }
  useEffect(() => {
    if (country) {
      const countryData = all_countries?.find((el) => el.name === country);
      if (countryData?.states?.length > 0) {
        setStates(countryData.states);
      }
    }
  }, [country,selected_hotel_details]);

  const handleToggle = () => {
    dispatch(toggle_sidebar(false))
  }

  return (
    <div onClick={() => handleToggle()} className="">
      <div onClick={() => handleToggle()} className="row">
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Establishment Name
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="Establishment name"
              value={establishmentname}
              onChange={(e) => { setEstablishmentname(e.target.value); setEstablishmentError("") }}
              style={establishmentnameError ? { border: "1px solid #ff00009c" } : {}}
            />
            {establishmentnameError && (
              <span style={establishmentnameError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                {establishmentnameError}
              </span>
            )}
          </div>
        </div>
        {/* <div className={col}>
          <div className="mb-3">
            <label for="type" className="form-label cmn_label">
              What type of establishment are you?
            </label>
            <select
              class="form-select cmn-select"
              aria-label="Default select example"
              style={establishmenttypeError ? { border: "1px solid red" } : {}}
              onChange={(e) => { setEstablishedtype(e.target.value); setEstablishmentTypeError('') }}
              value={establishedtype}
            >
              <option selected>Select establishment</option>
              <option value="coffee_shop">Coffee Shop</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Bar">Bar</option>
            </select>
            {establishmenttypeError && (
              <span style={establishmenttypeError ? { color: "red", fontSize: "12px" } : {}}>
                {establishmenttypeError}
              </span>
            )}
          </div>
        </div> */}
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Street Address
            </label>
            <input
              type="address"
              className="form-control cmn_input"
              placeholder="Enter street address"
              value={streetaddress}
              onChange={(e) => { setStreetAddress(e.target.value); setAddressError('') }}
              style={addressError ? { border: "1px solid #ff00009c" } : {}}
            />
            {addressError && (
              <span style={addressError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                {addressError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Suite/Unit Number
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="Enter unit number"
              value={unitNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setUnitNumber(value);
                  setUnitNumberError('');
                }
              }}
              style={unitnumberError ? { border: "1px solid #ff00009c" } : {}}
            />
            {unitnumberError && (
              <span style={{ color: "#ff00009c", fontSize: "12px" }}>
                {unitnumberError}
              </span>
            )}
          </div>
        </div>

        <div className={col}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label cmn_label">
              Country
            </label>
            <select
              class="form-select cmn-select"
              aria-label="Default select example"
              onChange={(e) => { setCountry(e.target.value); setCountryError('') }}
              style={countryError ? { border: "1px solid #ff00009c" } : {}}
              value={country}
            >
              <option selected value="">Select country</option>
              {all_countries?.map((country, i) => (
                <option key={i} value={country?.name}>{country?.name}</option>

              ))}
            </select>
            {countryError && (
              <span style={countryError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                {countryError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label cmn_label">
              State
            </label>
            <select
              className="form-select cmn-select"
              aria-label="Default select example"
              onChange={(e) => { setState(e.target.value); setStateError('') }}
              style={stateError ? { border: "1px solid #ff00009c" } : {}}
              value={state}
              disabled={country === ""}
            >
              <option selected>Select state</option>
              {states?.map((state, i) => (
                <option key={i} value={state?.name}>{state?.name}</option>
              ))}
            </select>
            {stateError && (
              <span style={stateError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                {stateError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label cmn_label">
              City
            </label>
            <select
              class="form-select cmn-select"
              aria-label="Default select example"
              onChange={(e) => { setCity(e.target.value); setCityError('') }}
              style={cityError ? { border: "1px solid #ff00009c" } : {}}
              value={city}
              disabled={citiesList?.length === 0}
            >
              <option>Select city</option>
              {citiesList?.map((city, i) => (
                <option key={i} value={city}>{city}</option>

              ))}
            </select>
            {pincodeError && (
              <span style={cityError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                {cityError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label cmn_label">
              Pin/Zip Code
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="Enter pin code"
              value={pincode}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) { // Regex to allow only digits
                  setPincode(value);
                  setPincodeError('');
                }
              }}
              style={pincodeError ? { border: "1px solid #ff00009c" } : {}}
            />
            {pincodeError && (
              <span style={pincodeError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                {pincodeError}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-3">
        {/* <Button buttonClick={handleBackword} text="Previous" className="grey_btn" /> */}
        <Button buttonClick={handleForward} text="Next" />
      </div>
    </div>
  );
};

export default EstablishmentDetails;
