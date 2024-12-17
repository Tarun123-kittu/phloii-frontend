'use client'

import React, { useState, useEffect } from "react";
import Button from "../Hotel/Button/Button";

const WhyPhloiiVerified = ({ col, setStep, whyphloii, setWhyphloii, uniquefeatures, setUniqueFeatures, inpersonvisit, setInpersonvisit, safeWord, setSafeWord, images, setImages ,handleOnboardHotel,is_hotel_verified}) => {
  const [errors, setErrors] = useState("");
  const [whyPhloiiError, setWhyPhloiiError] = useState('')
  const [uniqueError, setUniqueError] = useState('')
  const [imagesError, setImagesError] = useState('')
  const [safeError, setSafeError] = useState('')
  const [inpersonError, setInPersonError] = useState('')

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
    if (!inpersonvisit) {
      setInPersonError("Please enter are you open to in-person visit")
      return
    }
    handleOnboardHotel()
  }


  const handleFileChange = (e) => {
    setImagesError('')
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
  };


  return (
    <div className="mt-5">
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
                {imagesError && (
                  <span style={imagesError ? { color: "red", fontSize: "10px" } : {}}>
                    {imagesError}
                  </span>
                )}

               {images.length < 0 && <div className="flex-grow-1">
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
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        width={50}
                        className="rounded"
                      />
                   
                       <svg   onClick={() => handleRemoveImage(index)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="url(#paint0_linear_4573_9679)"/>
                      <path d="M9.16992 14.83L14.8299 9.17004" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.8299 14.83L9.16992 9.17004" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <defs>
                      <linearGradient id="paint0_linear_4573_9679" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FBB90D"/>
                      <stop offset="1" stop-color="#22EBFF"/>
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

              {errors && (
                <div className="alert alert-danger mt-2">
                  <pre>{errors}</pre>
                </div>
              )}

              
            </div>
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
      </div>
      <div className="d-flex justify-content-end gap-3">
        <Button buttonClick={handleBackword} text="Previous" className="grey_btn" />
        <Button buttonClick={handleForward} text={is_hotel_verified.status === "Loading" ? "Loading" : "Done"} />
      </div>
    </div>
  );
};

export default WhyPhloiiVerified;
