'use client'

import React, { useState, useEffect } from "react";
import Button from "../Hotel/Button/Button";
import Multiselect from 'multiselect-react-dropdown';
import { delete_hotel_image, clear_delete_hotel_image } from "@/utils/redux/slices/hotelOnboardingSlice/deleteHotelimage";
import { useDispatch, useSelector } from "react-redux";

const WhyPhloiiVerified = ({ col, setStep, whyphloii, setWhyphloii, uniquefeatures, setUniqueFeatures, inpersonvisit, setInpersonvisit, safeWord, setSafeWord, images, setImages, handleOnboardHotel, is_hotel_verified, setFoodValues, foodValues, setServiceValues, serviceValues, atmosphere, setAtmosphere, openTiming, setOpenTiming, closeTiming, setCloseTiming, customerServiceNumber, setCustomerServiceNumber, hotelId, updateHotel, is_hotel_updated }) => {
  console.log(customerServiceNumber, "customerServiceNumber customerServiceNumber")
  const dispatch = useDispatch()
  const [errors, setErrors] = useState("");
  const [whyPhloiiError, setWhyPhloiiError] = useState('')
  const [uniqueError, setUniqueError] = useState('')
  const [imagesError, setImagesError] = useState('')
  const [safeError, setSafeError] = useState('')
  const [inpersonError, setInPersonError] = useState('')
  const [foodError, setFoodError] = useState('')
  const [serviceError, setServiceError] = useState('')
  const [openError, setOpenError] = useState('')
  const [closeError, setCloseError] = useState('')
  const [atmosphereError, setAtmosphereError] = useState('')
  const [selectedFood, setSelectedFood] = useState([])
  const [selectedService, setSelectedService] = useState([])
  const [selectedAtmosphere, setSelectedAtmosphere] = useState([])
  const [serviceNumberError, setServiceNumberError] = useState('')

  const handleBackword = () => {
    setStep(2)
  }

  const handleForward = () => {
    if (!whyphloii && !inpersonvisit) {
      setWhyPhloiiError("Please enter why do you want to be on phloii")
      setInPersonError("Please enter are you open to in-person visit")
    }
    if (!whyphloii) {
      setWhyPhloiiError("Please enter why do you want to be on phloii")
      return
    }
    if(images?.length < 5){
      setImagesError('Please upload atleast 5 images')
      return
    }
    if (!inpersonvisit) {
      setInPersonError("Please enter are you open to in-person visit")
      return
    }
    if (foodValues?.length === 0) {
      setFoodError("Please select the food prefrences")
      return
    }
    if (serviceValues?.length === 0) {
      setServiceError("Please select the Service Prefrences")
      return
    }
    if (atmosphere?.length === 0) {
      setAtmosphereError("Please select the Service Prefrences")
      return
    }
    if (!openTiming) {
      setOpenError("Please Enter the open timing")
      return
    }
    if (!closeTiming) {
      setCloseError("Please Enter the close timing")
      return
    }
    if (!customerServiceNumber) {
      setServiceNumberError("Please Enter the customer service number")
      return
    }
    if (hotelId) {
      updateHotel()
    } else {
      handleOnboardHotel()
    }
  }


  const handleFileChange = (e) => {
    setImagesError('');
    const files = Array.from(e.target.files);
    validateFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    validateFiles(files);
  };

  const validateFiles = (files) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    let validFiles = [];
    let errorMessages = "";

    files.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        validFiles.push(file);
      } else {
        errorMessages += `${file.name} is not a valid file type.\n`;
      }
    });

    if (validFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...validFiles]);
    }

    setErrors(errorMessages);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    dispatch(delete_hotel_image({ index, id: hotelId }))
  };

  const getPreviewSrc = (image) => {
    return image instanceof File ? URL.createObjectURL(image) : image;
  };

  const FoodOptions = [
    { name: 'veg' },
    { name: 'vegan' },
  ]
  const Services = [
    { name: 'wifi' },
    { name: 'parking' },
  ]
  const atmosphereOption = [
    { name: 'cozy' },
    { name: 'romantic' },
  ]

  const handleSelect = (selectedList) => {
    setFoodError('')
    const food = selectedList.map((item) => item.name);
    setSelectedFood(selectedList);
    setFoodValues(food)
  };


  const handleRemove = (selectedList) => {
    const food = selectedList.map((item) => item.name);
    setSelectedFood(selectedList);
    setFoodValues(days)
  };

  const handleSelectService = (selectedList) => {
    setServiceError('')
    const service = selectedList.map((item) => item.name);
    setSelectedService(selectedList);
    setServiceValues(service)
  };


  const handleRemoveService = (selectedList) => {
    const service = selectedList.map((item) => item.name);
    setSelectedService(selectedList);
    setServiceValues(service)
  };

  const handleSelectAtmosphere = (selectedList) => {
    setAtmosphereError('')
    const atmo = selectedList.map((item) => item.name);
    setSelectedAtmosphere(selectedList);
    setAtmosphere(atmo)
  };


  const handleRemoveAtmosphere = (selectedList) => {
    const atmo = selectedList.map((item) => item.name);
    setSelectedAtmosphere(selectedList);
    setAtmosphere(atmo)
  };

  useEffect(() => {
    const formattedFoodValues = foodValues.map(food => ({ name: food }));
    setSelectedFood(formattedFoodValues)
  }, [foodValues])

  useEffect(() => {
    const formattedFoodValues = serviceValues.map(food => ({ name: food }));
    setSelectedService(formattedFoodValues)
  }, [serviceValues])

  useEffect(() => {
    const formattedFoodValues = atmosphere.map(food => ({ name: food }));
    setSelectedAtmosphere(formattedFoodValues)
  }, [atmosphere])


  return (
    <div className="">
      <div className="row">
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Why do you want to be on Phloii Verified?
            </label>
            <textarea
              rows={5}
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
              value={whyphloii}
              onChange={(e) => { setWhyphloii(e.target.value); setWhyPhloiiError('') }}
              style={whyPhloiiError ? { border: "1px solid red" } : {}}
            />
            {whyPhloiiError && (
              <span style={whyPhloiiError ? { color: "red", fontSize: "10px" } : {}}>
                {whyPhloiiError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              What makes your restaurant unique?
            </label>
            <textarea
              rows={5}
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
              value={uniquefeatures}
              onChange={(e) => { setUniqueFeatures(e.target.value); setUniqueError('') }}
              style={uniqueError ? { border: "1px solid red" } : {}}
            />
            {whyPhloiiError && (
              <span style={uniqueError ? { color: "red", fontSize: "10px" } : {}}>
                {uniqueError}
              </span>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="type" className="form-label cmn_label">
              Please upload 5 pictures of your Establishment:
            </label>
            <div
              className="add_file"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="d-flex justify-content-between align-items-center p-3 position-relative">
                <input
                  type="file"
                  className="form-control cmn_input"
                  multiple
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  style={imagesError ? { border: "1px solid red" } : {}}
                />
                {images.length === 0 && <div className="flex-grow-1">
                  <p className="px-3 pt-2">
                    Drag and drop files here or upload
                  </p>
                  <span className="px-3 pb-3 d-block pt-1">
                    Accepted file types: JPEG, PNG
                  </span>
                </div>}
                {images.length > 0 && (
                  <div className="preview flex-grow-1">
                    {images.map((image, index) => (
                      <div key={index} className="image-view">
                        <img
                          src={getPreviewSrc(image)}
                          alt="hotel"
                          width={50}
                          className="rounded"
                          onError={(e) => { e.target.onerror = null; e.target.src = 'default-image-path'; }}
                        />
                        <svg
                          onClick={() => handleRemoveImage(index)}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                            fill="url(#paint0_linear_4573_9679)"
                          />
                          <path
                            d="M9.16992 14.83L14.8299 9.17004"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.8299 14.83L9.16992 9.17004"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4573_9679"
                              x1="2"
                              y1="12"
                              x2="22"
                              y2="12"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#FBB90D" />
                              <stop offset="1" stop-color="#22EBFF" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  buttonClick={handleRemoveImage}
                  text="Upload"
                  className={"upload_btn"}
                />
              </div>
            </div>
            {imagesError && (
              <span style={imagesError ? { color: "red", fontSize: "10px" } : {}}>
                {imagesError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Are you open to having a safe word that a person can say to get
              help?
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
              value={safeWord}
              onChange={(e) => { setSafeWord(e.target.value); setSafeError('') }}
              style={uniqueError ? { border: "1px solid red" } : {}}
            />
            {safeError && (
              <span style={safeError ? { color: "red", fontSize: "10px" } : {}}>
                {safeError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Are you open to an in-person visit? If yes, when is a good time to
              meet?
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
              value={inpersonvisit}
              onChange={(e) => { setInpersonvisit(e.target.value); setInPersonError('') }}
              style={uniqueError ? { border: "1px solid red" } : {}}
            />
            {inpersonError && (
              <span style={inpersonError ? { color: "red", fontSize: "10px" } : {}}>
                {inpersonError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Food Prefrences
            </label>
            <Multiselect
              options={FoodOptions}
              selectedValues={selectedFood}
              onSelect={handleSelect}
              onRemove={handleRemove}
              displayValue="name"
            />
            {foodError && (
              <span style={foodError ? { color: "red", fontSize: "10px" } : {}}>
                {foodError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Services
            </label>
            <Multiselect
              options={Services}
              selectedValues={selectedService}
              onSelect={handleSelectService}
              onRemove={handleRemoveService}
              displayValue="name"
            />
            {serviceError && (
              <span style={serviceError ? { color: "red", fontSize: "10px" } : {}}>
                {serviceError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Atmosphere
            </label>
            <Multiselect
              options={atmosphereOption}
              selectedValues={selectedAtmosphere}
              onSelect={handleSelectAtmosphere}
              onRemove={handleRemoveAtmosphere}
              displayValue="name"
            />
            {atmosphereError && (
              <span style={atmosphereError ? { color: "red", fontSize: "10px" } : {}}>
                {atmosphereError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Coustmer Service Number
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
              value={customerServiceNumber}
              onChange={(e) => { setCustomerServiceNumber(e.target.value); setServiceNumberError('') }}
              style={serviceNumberError ? { border: "1px solid red" } : {}}
            />
            {serviceNumberError && (
              <span style={serviceError ? { color: "red", fontSize: "10px" } : {}}>
                {serviceNumberError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Open Timings
            </label>
            <input
              type="time"
              className="form-control cmn_input"
              value={openTiming}
              onChange={(e) => {
                const inputTime = e.target.value.trim();
                const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i; // Regex to check 12-hour format
                const match = inputTime.match(timeRegex);

                if (match) {
                  let [_, hours, minutes, period] = match;
                  hours = parseInt(hours, 10);
                  minutes = parseInt(minutes, 10);

                  // Convert to 24-hour format if AM/PM is provided
                  if (period?.toUpperCase() === "PM" && hours < 12) {
                    hours += 12;
                  } else if (period?.toUpperCase() === "AM" && hours === 12) {
                    hours = 0;
                  }

                  const militaryTime = `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`;
                  setOpenTiming(militaryTime); // Set the time in 24-hour format
                  setOpenError(""); // Clear any existing error
                } else if (/^\d{2}:\d{2}$/.test(inputTime)) {
                  // If user enters valid 24-hour format, accept it directly
                  setOpenTiming(inputTime);
                  setOpenError(""); // Clear the error
                } else {
                  setOpenError("Invalid time format. Use HH:MM AM/PM or 24-hour format.");
                }
              }}
              style={openError ? { border: "1px solid red" } : {}}
            />
            {openError && (
              <span style={{ color: "red", fontSize: "10px" }}>
                {openError}
              </span>
            )}
          </div>
        </div>;

        <div className={col}>
          <div className="mb-3">
            <label htmlFor="close-timings" className="form-label cmn_label">
              Close Timings
            </label>
            <input
              type="time"
              id="close-timings"
              className="form-control cmn_input"
              value={closeTiming}
              onChange={(e) => {
                const inputTime = e.target.value.trim();
                const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i; // Regex to check 12-hour format
                const match = inputTime.match(timeRegex);

                if (match) {
                  let [_, hours, minutes, period] = match;
                  hours = parseInt(hours, 10);
                  minutes = parseInt(minutes, 10);

                  // Convert to 24-hour format if AM/PM is provided
                  if (period?.toUpperCase() === "PM" && hours < 12) {
                    hours += 12;
                  } else if (period?.toUpperCase() === "AM" && hours === 12) {
                    hours = 0;
                  }

                  const militaryTime = `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`;
                  setCloseTiming(militaryTime); // Set the time in 24-hour format
                  setCloseError(""); // Clear any existing error
                } else if (/^\d{2}:\d{2}$/.test(inputTime)) {
                  // If user enters valid 24-hour format, accept it directly
                  setCloseTiming(inputTime);
                  setCloseError(""); // Clear the error
                } else {
                  setCloseError("Invalid time format. Use HH:MM AM/PM or 24-hour format.");
                }
              }}
              style={closeError ? { border: "1px solid red" } : {}}
            />
            {closeError && (
              <span style={{ color: "red", fontSize: "10px" }}>
                {closeError}
              </span>
            )}
          </div>
        </div>


      </div>
      <div className="d-flex justify-content-end gap-3">
        <Button buttonClick={handleBackword} text="Previous" className="grey_btn" />
        <Button buttonClick={handleForward} text={is_hotel_verified.status === "Loading" || is_hotel_updated?.status === "Loading" ? "Loading" : "Done"} />
      </div>
    </div>
  );
};

export default WhyPhloiiVerified;
