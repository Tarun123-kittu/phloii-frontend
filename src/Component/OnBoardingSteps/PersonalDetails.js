import React, { useState } from "react";
import Button from "../Hotel/Button/Button";

const PersonalDetails = ({ col, setStep, ownername, setOwnername, ownerPhone, setOwnerPhone, websiteLink, setWebsiteLink, owneremail, setOwnerEmail }) => {
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [websiteError, setWebsiteError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const handleForward = () => {
    if (!ownername && !ownerPhone && !owneremail) {
      setNameError("Please enter owner name")
      setWebsiteError("Please enter the website link")
      setPhoneError("Please enter owner phone number")
      setEmailError("Please enter owner email")
    }
    if (!ownername) {
      setNameError("Please enter owner name")
      return
    }
    if (!ownerPhone) {
      setPhoneError("Please enter owner phone number")
      return
    }
    if (!owneremail) {
      setEmailError("Please enter owner email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(owneremail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setStep(3)
  }

  const handleBackword = () => {
    setStep(1)
  }

  const validateWebsiteLink = (link) => {
    const regex = /^(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    return regex.test(link);
  };

  const handleBlur = () => {
    if (!websiteLink) {
      setWebsiteError("Website link is required.");
    } else if (!validateWebsiteLink(websiteLink)) {
      setWebsiteError("Please enter a valid website link.");
    } else {
      setWebsiteError(""); // Clear error if the link is valid
    }
  };
  return (
    <div className="">
      <div className="row">
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Owner Name
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="enter owner name"
              value={ownername}
              onChange={(e) => { setOwnername(e.target.value); setNameError('') }}
              style={nameError ? { border: "1px solid red" } : {}}
            />
            {nameError && (
              <span style={nameError ? { color: "red", fontSize: "10px" } : {}}>
                {nameError}
              </span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label cmn_label">
              Establishment Website Link
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="Enter website link"
              value={websiteLink}
              onChange={(e) => {
                setWebsiteLink(e.target.value);
                setWebsiteError(""); // Clear the error while typing
              }}
              onBlur={handleBlur} // Validate on blur
              style={websiteError ? { border: "1px solid red" } : {}}
            />
            {websiteError && (
              <span style={{ color: "red", fontSize: "10px" }}>{websiteError}</span>
            )}
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label cmn_label">
              Establishment/Owner Phone
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="Enter phone number"
              value={ownerPhone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setOwnerPhone(value);
                }
                if (value && !/^\d{10}$/.test(value)) {
                  setPhoneError('Phone number must be exactly 10 digits.');
                } else {
                  setPhoneError('');
                }
              }}
              style={phoneError ? { border: "1px solid red" } : {}}
            />
            {phoneError && (
              <span style={{ color: "red", fontSize: "10px" }}>
                {phoneError}
              </span>
            )}
          </div>
        </div>

        <div className={col}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cmn_label">
              Establishment/Owner Email
            </label>
            <input
              type="email"
              className="form-control cmn_input"
              placeholder="enter email"
              value={owneremail}
              onChange={(e) => { setOwnerEmail(e.target.value); setEmailError('') }}
              style={emailError ? { border: "1px solid red" } : {}}
            />
            {emailError && (
              <span style={emailError ? { color: "red", fontSize: "10px" } : {}}>
                {emailError}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-3">
        <Button buttonClick={handleBackword} text="Previous" className="grey_btn" />
        <Button buttonClick={handleForward} text="Next" />
      </div>
    </div>
  );
};

export default PersonalDetails;
