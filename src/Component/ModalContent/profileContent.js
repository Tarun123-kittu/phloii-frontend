'use Client'

import React, { useState, useEffect } from "react";
import CommonModal from "../Modal/commonModal";
import Button from "../Hotel/Button/Button";
import Image from "next/image";
import "./modalContent.css";
import { updateProfile, clear_profile_update_slice } from "@/utils/redux/slices/profileSlice/updateProfile";
import { useDispatch, useSelector } from "react-redux";
import { PhoneInput } from 'react-international-phone';
import validator from "validator";
import toast from "react-hot-toast";
import { getProfile } from "@/utils/redux/slices/profileSlice/profile";

const ProfileContent = ({ show, onClose }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [profileImageError, setProfileImageError] = useState("")
  const [previewImage, setPreviewImage] = useState("")
  const [isImageChanged, setIsImageChanged] = useState(false)
  const profileDetails = useSelector((state) => state.PROFILE?.data);
  const isProfileUpdated = useSelector((store) => store.UPDATE_PROFILE)
  console.log(isProfileUpdated, "isProfileUpdated isProfileUpdated")


  useEffect(() => {
    if (profileDetails?.type === "success") {
      setPreviewImage(profileDetails?.data?.image)
      setUsername(profileDetails?.data?.username)
      setEmail(profileDetails?.data?.email)
      setPhone(profileDetails?.data?.phoneNumber?.toString())
    }
  }, [profileDetails])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      if (!fileType.includes("image/png") && !fileType.includes("image/jpeg")) {
        toast.error("Only PNG and JPG images are allowed.");
        setProfileImage("");
        return;
      }
      if (fileSize > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB.");
        setProfileImage("");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setIsImageChanged(true)
        setProfileImage(file);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("");
    setPreviewImage(profileDetails?.data?.image);
    setIsImageChanged(false)

    if (typeof document !== 'undefined') {
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!username && !email && !phone) {
      setUsernameError("Username is required");
      setEmailError("Email is required");
      setPhoneError("Phone is required");
      return;
    }

    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!phone) {
      setPhoneError("Phone is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailError("Email is not valid");
      return;
    }

    const requestData = { username, email, phone };
    if (profileImage) {
      requestData.image = profileImage;
    }

    dispatch(updateProfile(requestData));
  };

  useEffect(() => {
    if (isProfileUpdated?.status === "Success") {
      toast.success("Profile updated successfully")
      dispatch(getProfile())
      dispatch(clear_profile_update_slice())
      onClose()
    }
    if (isProfileUpdated?.status === "Error") {
      toast.error(isProfileUpdated?.error?.message)
    }
  }, [isProfileUpdated])

  return (
    <CommonModal show={show} onClose={onClose}>
      <div className="">
        <div className="profile_wrapper">
          <div className="profile_image position-relative">
            <div className="profile_image_upload position-relative">

              {!isImageChanged ? <svg onClick={handleFileChange} className="position-absolute end-0 top-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="#FBB90D" />
                <path d="M8.11763 8.82361H7.41176C7.03733 8.82361 6.67825 8.97235 6.41349 9.2371C6.14874 9.50186 6 9.86094 6 10.2354V16.5883C6 16.9627 6.14874 17.3218 6.41349 17.5865C6.67825 17.8513 7.03733 18 7.41176 18H13.7647C14.1391 18 14.4982 17.8513 14.7629 17.5865C15.0277 17.3218 15.1764 16.9627 15.1764 16.5883V15.8824" stroke="black" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M14.4705 7.41183L16.5881 9.52947M17.5658 8.53065C17.8438 8.25264 18 7.87558 18 7.48242C18 7.08926 17.8438 6.7122 17.5658 6.43419C17.2878 6.15618 16.9107 6 16.5175 6C16.1244 6 15.7473 6.15618 15.4693 6.43419L9.52936 12.353V14.4706H11.647L17.5658 8.53065Z" stroke="black" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
              </svg>
                :
                <svg onClick={handleRemoveImage} className="position-absolute end-0 top-0 z-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#FBB90D" />
                  <path d="M16.9119 18.0077L12.0039 13.092L7.09582 18.0077L6 16.9119L10.9158 12.0039L6 7.09582L7.09582 6L12.0039 10.9158L16.9119 6.00772L18 7.09582L13.092 12.0039L18 16.9119L16.9119 18.0077Z" fill="black" />
                </svg>}



              <input onChange={handleFileChange} type="file" className="form-control cmn_input" />
              <img src={previewImage} width={100} height={100} alt="profile_image" />
            </div>
          </div>
          <div className="profile_content">
            <h3 className="main_heading">My Profile</h3>
            <div className="auth_form">
              <div className="mb-3">
                <label htmlFor="name" className="form-label cmn_label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control cmn_input"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setUsernameError('') }}
                  style={usernameError ? { border: "1px solid #ff00009c" } : {}}
                />
                {usernameError && (
                  <span style={usernameError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                    {usernameError}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label cmn_label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control cmn_input"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                  style={emailError ? { border: "1px solid #ff00009c" } : {}}
                />
                {emailError && (
                  <span style={emailError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                    {emailError}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label cmn_label">
                  Phone
                </label>
                <PhoneInput
                  defaultCountry="ua"
                  value={phone}
                  onChange={(phone) => { setPhone(phone); setPhoneError(""); }}
                  style={phoneError ? { border: "1px solid #ff00009c" } : {}}
                />
                {phoneError && (
                  <span style={phoneError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
                    {phoneError}
                  </span>
                )}
              </div>
              <div className="text-end">
                <Button text="Cancel" className="grey_btn me-3" buttonClick={onClose} />
                <Button text={'Update Profile'} buttonClick={handleSignUp} loading={isProfileUpdated} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default ProfileContent;
