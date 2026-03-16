'use client'

import React, { useState, useEffect } from "react";
import Button from "../Hotel/Button/Button";
import { toggle_sidebar } from "@/utils/redux/slices/sidebarSlice/manageSidebar";
import { useDispatch } from "react-redux";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const getPlaceAutocompleteSuggestions = async (input) => {
  if (!GOOGLE_MAPS_API_KEY || !input) {
    return [];
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data?.predictions) {
      return data.predictions;
    }
    return [];
  } catch {
    return [];
  }
};

const getPlaceDetails = async (placeId) => {
  if (!GOOGLE_MAPS_API_KEY || !placeId) {
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,address_components&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data?.result) {
      const addressComponents = data.result.address_components || [];
      const details = {
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
      };

      addressComponents.forEach((component) => {
        const types = component.types;
        if (types.includes('street_number')) {
          details.streetAddress = component.long_name + ' ' + (details.streetAddress || '');
        }
        if (types.includes('route')) {
          details.streetAddress += component.long_name;
        }
        if (types.includes('locality')) {
          details.city = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          details.state = component.long_name;
        }
        if (types.includes('country')) {
          details.country = component.long_name;
        }
        if (types.includes('postal_code')) {
          details.pinCode = component.long_name;
        }
      });

      return details;
    }
    return null;
  } catch {
    return null;
  }
};

const getLatLongFromAddress = async (address) => {
  if (!GOOGLE_MAPS_API_KEY) {
    return null;
  }

  const formattedAddress = [
    address?.streetAddress,
    address?.suiteUnitNumber,
    address?.city,
    address?.state,
    address?.pinCode,
    address?.country,
  ]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join(', ');

  if (!formattedAddress) {
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data?.status !== 'OK') {
      return null;
    }

    const location = data?.results?.[0]?.geometry?.location;
    if (!location) {
      return null;
    }

    return { lat: location.lat, lng: location.lng };
  } catch {
    return null;
  }
};


const EstablishmentDetails = ({ col, setStep, establishmentname, setEstablishmentname, establishedtype, setEstablishedtype, streetaddress, setStreetAddress, unitNumber, setUnitNumber, country, setCountry, state, setState, pincode, setPincode, all_countries, setCity, city,citiesList,selected_hotel_details, setGeolocation}) => {
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
  const [addressValidationMessage, setAddressValidationMessage] = useState('')
  const [addressValidationType, setAddressValidationType] = useState('')
  const [isValidatingAddress, setIsValidatingAddress] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [autocompleteLoading, setAutocompleteLoading] = useState(false)

  const clearAddressValidation = () => {
    setAddressValidationMessage('')
    setAddressValidationType('')
  }

  // Debounced autocomplete handler
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (streetaddress && streetaddress.length > 2) {
        setAutocompleteLoading(true)
        const results = await getPlaceAutocompleteSuggestions(streetaddress)
        setSuggestions(results)
        setShowSuggestions(true)
        setAutocompleteLoading(false)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [streetaddress])

  const handleForward = async () => {
    if (isValidatingAddress) return

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

    setIsValidatingAddress(true)
    clearAddressValidation()

    try {
      const geolocation = await getLatLongFromAddress({
        streetAddress: streetaddress,
        suiteUnitNumber: unitNumber,
        city,
        state,
        pinCode: pincode,
        country,
      })

      if (!geolocation) {
        setAddressError("Address is invalid. Please check the address.")
        setAddressValidationMessage("Address is invalid. Please check and try again.")
        setAddressValidationType('error')
        return
      }

      setAddressError('')
      setAddressValidationMessage("Address is valid.")
      setAddressValidationType('success')
      if (setGeolocation) setGeolocation(geolocation)
      setStep(2)
    } finally {
      setIsValidatingAddress(false)
    }
  }

  const handlePlaceSelection = async (placeId) => {
    try {
      const placeDetails = await getPlaceDetails(placeId)
      if (placeDetails) {
        const { streetAddress, city, state, country, pinCode } = placeDetails
        
        if (streetAddress) setStreetAddress(streetAddress)
        if (city) setCity(city)
        if (state) setState(state)
        if (country) setCountry(country)
        if (pinCode) setPincode(pinCode)
        
        clearAddressValidation()
      }
      setSuggestions([])
      setShowSuggestions(false)
    } catch (error) {
      console.error('Error selecting place:', error)
    }
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
          <div className="mb-3" style={{ position: 'relative' }}>
            <label htmlFor="email" className="form-label cmn_label">
              Street Address
            </label>
            <input
              type="address"
              className="form-control cmn_input"
              placeholder="Enter street address"
              value={streetaddress}
              onChange={(e) => { setStreetAddress(e.target.value); setAddressError(''); clearAddressValidation() }}
              style={addressError ? { border: "1px solid #ff00009c" } : {}}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {autocompleteLoading && (
              <span style={{ fontSize: "12px", color: "#666" }}>
                Loading suggestions...
              </span>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                zIndex: 10,
                maxHeight: '200px',
                overflowY: 'auto',
                marginTop: '4px'
              }}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handlePlaceSelection(suggestion.place_id)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                      _hover: { backgroundColor: '#f5f5f5' }
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    <div style={{ fontSize: "14px", color: "#333" }}>
                      {suggestion.main_text}
                    </div>
                    <div style={{ fontSize: "12px", color: "#999" }}>
                      {suggestion.secondary_text}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                  clearAddressValidation();
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
              className="form-select cmn-select"
              aria-label="Default select example"
              onChange={(e) => { setCountry(e.target.value); setCountryError(''); clearAddressValidation() }}
              style={countryError ? { border: "1px solid #ff00009c" } : {}}
              value={country}
            >
              <option value="">Select country</option>
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
              onChange={(e) => { setState(e.target.value); setStateError(''); clearAddressValidation() }}
              style={stateError ? { border: "1px solid #ff00009c" } : {}}
              value={state}
              disabled={country === ""}
            >
              <option value="">Select state</option>
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
              className="form-select cmn-select"
              aria-label="Default select example"
              onChange={(e) => { setCity(e.target.value); setCityError(''); clearAddressValidation() }}
              style={cityError ? { border: "1px solid #ff00009c" } : {}}
              value={city}
              disabled={citiesList?.length === 0}
            >
              <option value="">Select city</option>
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
                  clearAddressValidation();
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
        <Button
          buttonClick={handleForward}
          text={isValidatingAddress ? "Validating..." : "Next"}
          loading={{ status: isValidatingAddress ? "Loading" : "Idle" }}
        />
      </div>
      {addressValidationMessage && (
        <div style={{ color: addressValidationType === 'success' ? '#39d98a' : '#ff00009c', fontSize: '12px', marginTop: '8px' }}>
          {addressValidationMessage}
        </div>
      )}
    </div>
  );
};

export default EstablishmentDetails;
