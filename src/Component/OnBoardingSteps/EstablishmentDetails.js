'use client'

import React, { useState, useEffect } from "react";
import Button from "../Hotel/Button/Button";
import CommonMapSelector from "../Common/CommonMapSelector";
import { toggle_sidebar } from "@/utils/redux/slices/sidebarSlice/manageSidebar";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Geocode helper for form submission
const getLatLongFromAddress = async (address) => {
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

  try {
    const response = await fetch('/api/maps/geocode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: formattedAddress }),
    });
    const data = await response.json();

    if (!response.ok || !data?.lat || !data?.lng) {
      return null;
    }

    return { lat: data.lat, lng: data.lng };
  } catch (error) {
    console.error('Geocode error:', error);
    return null;
  }
};


const EstablishmentDetails = ({ col, setStep, establishmentname, setEstablishmentname, establishedtype, setEstablishedtype, streetaddress, setStreetAddress, unitNumber, setUnitNumber, country, setCountry, state, setState, pincode, setPincode, all_countries, setCity, city, citiesList, setCitiesList, selected_hotel_details, setGeolocation }) => {
  const [states, setStates] = useState([])
  const dispatch = useDispatch()
  const [establishmentnameError, setEstablishmentError] = useState('')
  const [establishmenttypeError, setEstablishmentTypeError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [unitnumberError, setUnitNumberError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [stateError, setStateError] = useState('')
  const [cityError, setCityError] = useState('')
  const [pincodeError, setPincodeError] = useState('')
  const [addressValidationMessage, setAddressValidationMessage] = useState('')
  const [addressValidationType, setAddressValidationType] = useState('')
  const [isValidatingAddress, setIsValidatingAddress] = useState(false)
  const [mapLocation, setMapLocation] = useState(null);

  // Initialize map location once selected_hotel_details is available
  useEffect(() => {
    const hotel = selected_hotel_details?.data?.data?.hotel;
    const lat = hotel?.lat || hotel?.address?.lat || hotel?.latitude;
    const lng = hotel?.lng || hotel?.address?.lng || hotel?.longitude;

    if (lat && lng && !mapLocation) {
      setMapLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, [selected_hotel_details, mapLocation]);


  // Track city from map to persist it after API resets citiesList
  const [pendingCity, setPendingCity] = useState(null)

  const clearAddressValidation = () => {
    setAddressValidationMessage('')
    setAddressValidationType('')
  }

  const syncLocationWithForm = (locationData) => {
    if (locationData.lat && locationData.lng) {
      setMapLocation(locationData);
    }
    if (locationData.streetAddress) setStreetAddress(locationData.streetAddress);
    if (locationData.pinCode) setPincode(locationData.pinCode);

    // Auto-fill state and country (triggering backend city fetch in parent)
    if (locationData.state) setState(locationData.state);

    // Match country name with the standard list
    if (locationData.country) {
      const matched = all_countries?.find(c =>
        c.name.toLowerCase() === locationData.country.toLowerCase()
      );
      setCountry(matched ? matched.name : locationData.country);
    }

    // Handle city synchronization and persistence
    if (locationData.city) {
      if (!citiesList?.includes(locationData.city) && typeof setCitiesList === 'function') {
        setCitiesList([...(citiesList || []), locationData.city]);
      }
      setCity(locationData.city);
      setPendingCity(locationData.city); // Allow persistence across API-driven list resets
    }

    clearAddressValidation();
  };

  const handleMapLocationSelect = (locationData) => {
    syncLocationWithForm(locationData);
  };

  // Re-apply the city if the parent component's API call overwrites citiesList
  // and blanks out the dropdown during the re-render.
  useEffect(() => {
    if (pendingCity && citiesList && citiesList.length > 0) {
      if (!citiesList.includes(pendingCity) && typeof setCitiesList === 'function') {
        setCitiesList([...citiesList, pendingCity]);
      }
      setCity(pendingCity);
      // City is persisted until user manually changes it
    }
  }, [citiesList, pendingCity, setCity, setCitiesList]);

  // Handle manual city selection
  const handleCityChange = (e) => {
    const val = e.target.value;
    setCity(val);
    setCityError('');
    clearAddressValidation();
    setPendingCity(null); // Clear persistence on manual selection
  };

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

  // Redundant place helpers removed. Using CommonMapSelector instead.

  // const handleBackword = () => {
  //   setStep(1)
  // }
  useEffect(() => {
    if (country) {
      const countryData = all_countries?.find((el) => el.name === country);
      if (countryData?.states?.length > 0) {
        setStates(countryData.states);
      } else {
        setStates([]); // Reset if no states found
      }
    }
  }, [country, all_countries]); // Added all_countries to trigger re-load when data arrives

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
        <div className="col-lg-12">
          <CommonMapSelector
            initialLat={mapLocation?.lat}
            initialLng={mapLocation?.lng}
            value={streetaddress}
            onLocationSelect={handleMapLocationSelect}
          />
          {addressError && (
            <span style={{ color: "#ff00009c", fontSize: "12px" }}>
              {addressError}
            </span>
          )}
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
                setUnitNumber(value);
                setUnitNumberError('');
                clearAddressValidation();
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
              onChange={handleCityChange}
              style={cityError ? { border: "1px solid #ff00009c" } : {}}
              value={city}
              disabled={citiesList?.length === 0}
            >
              <option value="">Select city</option>
              {/* Ensure pre-filled city is visible even if not in API list */}
              {city && !citiesList?.includes(city) && (
                <option value={city}>{city}</option>
              )}
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
