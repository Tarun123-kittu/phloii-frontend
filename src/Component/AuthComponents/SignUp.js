"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Hotel/Button/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  hotel_signup,
  clear_hotel_signup_state,
} from "@/utils/redux/slices/authSlice/signUp";
import validator from "validator";
import toast from "react-hot-toast";
import { hotel_login, clear_hotel_login_state } from "@/utils/redux/slices/authSlice/login";
import { PhoneInput } from 'react-international-phone';

const SignUP = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [profileImageError, setProfileImageError] = useState("")
  const [previewImage, setPreviewImage] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [confirmPasswrdError, setConfirmPasswrdError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isTerms, setIsTerms] = useState(false);
  const is_signed_up = useSelector((store) => store.HOTEL_SIGNUP)
  const is_loggedIn = useSelector((store) => store.HOTEL_LOGIN);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!username && !email && !password && !phone) {
      setUsernameError("Username is required");
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setPhoneError("Phone is required")
      // setProfileImageError("Profile Image is required")
      return
    }
    // if (!profileImage) {
    //   setProfileImageError("Profile Image is required")
    //   return
    // }
    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!phone) {
      setPhoneError("Phone is required")
      return
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validator.isEmail) {
      setEmailError("Email is not valid");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswrdError("Confirm password doesn't matched with password")
      return
    }
    if (!isTerms) {
      toast.error("Please review and accept the Terms of Service.")
      return
    }
    dispatch(hotel_signup({ username, email, password, phone, profileImage }));
  };

  useEffect(() => {
    if (is_signed_up?.status === "Success") {
      dispatch(hotel_login({ email, password }))
      dispatch(clear_hotel_signup_state())
    }
    if (is_signed_up?.status === "Error") {
      toast.error(is_signed_up?.error?.message)
      dispatch(clear_hotel_signup_state())
    }
  }, [is_signed_up])

  useEffect(() => {
    if (is_loggedIn?.status === "Success") {
      toast.success("Your Account has been created..");
      localStorage.setItem("phloii_token_auth", is_loggedIn?.data?.data);
      localStorage.setItem("phloii_user", is_loggedIn?.data?.email);
      localStorage.setItem("phloii_user_name", is_loggedIn?.data?.username);
      if (is_loggedIn?.data?.isOnboradingDone) {
        router.push("/establishment");
      } else {
        router.push("/establishment/onboarding");
      }

      dispatch(clear_hotel_login_state());
    }

    if (is_loggedIn?.status === "Error") {
      toast.error(is_loggedIn?.error?.message);
      dispatch(clear_hotel_login_state())
    }
  }, [is_loggedIn]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };

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
        setProfileImage(file);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setProfileImage("");
    setPreviewImage("");

    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    
    if (confirmPassword && e.target.value !== confirmPassword) {
      setConfirmPasswrdError("Confirm password doesn't matched with password");
    } else {
      setConfirmPasswrdError("");
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswrdError("");
  
    if (password && e.target.value !== password) {
      setConfirmPasswrdError("Confirm password doesn't matched with password");
    } else {
      setConfirmPasswrdError("");
    }
  };

  return (
    <div className="auth-wrapper d-flex  align-items-center justify-content-center">
      <div className="h-100 overflow-auto w-100">
        <div className="auth_form h-100 pt-4">
          <div className="text-center">
            <Image src="/assets/logo.svg" width={139} height={57} alt="logo" />
          </div>
          <h2 className="main_heading text-center mt-4">Create Account</h2>
          <p className="sort_desc text-center">
            Please fill out this form with the required information
          </p>

          <div className="mb-3">
            <label className="form-label cmn_label">Name</label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              style={usernameError ? { border: "1px solid red" } : {}}
            />
            {usernameError && (
              <span style={usernameError ? { color: "red", fontSize: "12px" } : {}}>
                {usernameError}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label cmn_label">Email</label>
            <input
              type="email"
              className="form-control cmn_input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.toLowerCase());
                setEmailError("");
              }}
              autoComplete="false"
              style={emailError ? { border: "1px solid red" } : {}}
            />
            {emailError && (
              <span style={emailError ? { color: "red", fontSize: "12px" } : {}}>
                {emailError}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label cmn_label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control cmn_input"
                placeholder="Please enter your password"
                value={password}
                onChange={handlePasswordChange}
                style={passwordError ? { border: "1px solid red" } : {}}
                autoComplete="new-password"
              />
              <div
                className="position-absolute end-0 me-3 mt-1"
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? <img src="/hide.svg" alt="hide" /> : <img src="/view.svg" alt="hide" />}
              </div>
            </div>
            <span className="password_input d-block pt-1">
              Password must contain at least 8 characters, including a number and letter
            </span>
            {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label cmn_label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                className="form-control cmn_input"
                placeholder="Please enter your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                style={confirmPasswrdError ? { border: "1px solid red" } : {}}
              />
              <div
                className="position-absolute end-0 me-3 mt-1"
                onClick={togglePasswordVisibilityConfirm}
              >
                {!showPasswordConfirm ? <img src="/hide.svg" alt="hide" /> : <img src="/view.svg" alt="hide" />}
              </div>
            </div>
            {confirmPasswrdError && <span style={{ color: "red", fontSize: "12px" }}>{confirmPasswrdError}</span>}
          </div>
          <div className="mb-3">
            <label className="form-label cmn_label">Mobile Number</label>
            {/* <input
            type="text"
            className="form-control cmn_input"
            placeholder="Enter your phone number"
            value={username}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
            style={phoneError ? { border: "1px solid red" } : {}}
          /> */}
            <PhoneInput
              defaultCountry="ua"
              value={phone}
              onChange={(phone) => { setPhone(phone); setPhoneError(""); }}
            />
            {phoneError && (
              <span style={phoneError ? { color: "red", fontSize: "12px" } : {}}>
                {phoneError}
              </span>
            )}
          </div>


          {/* <div className="mb-3 ">
            <label className="form-label cmn_label">Profile Image</label>
            <div className="d-flex gap-2">
              {previewImage && <div className="position-relative">
                <svg onClick={() => handleRemoveImage()} className="doscard_image position-absolute end-0 cursor-pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="14" height="14" rx="7" fill="#FF9900" />
                  <path d="M10.71 11.5383L7 7.8225L3.29 11.5383L2.46167 10.71L6.1775 7L2.46167 3.29L3.29 2.46167L7 6.1775L10.71 2.4675L11.5325 3.29L7.8225 7L11.5325 10.71L10.71 11.5383Z" fill="black" />
                </svg>

                <Image src={previewImage} width={40} height={40} className="upload_profile" alt="logo" />
              </div>}
              <div className="position-relative add_profile flex-grow-1">
                <input
                  type="file"
                  className="form-control cmn_input"
                  placeholder="Enter your name"
                  onChange={handleFileChange}
                />
                <p>Upload Image</p>
              </div>
            </div>
          </div> */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isTerms}
              id="flexCheckDefault"
              onChange={() => setIsTerms(!isTerms)}
            />
            <label className="form-check-label sub-text fadeColor">
              I have read and agree to the{" "}
              <span className="text-hightLight text-decoration-underline">
                <a className="text-hightLight text-decoration-underline" href="https://phloii.com/privacy-policy" target="_bkank">Terms of Service</a>
              </span>
            </label>
          </div>
          <div className="mt-4">
            <Button buttonClick={handleSignUp} text={is_signed_up?.status !== "Loading" ? "Signup" : "Loading"} className="w-100" />
          </div>
          <p className="text-center loginAlready fadeColor mt-2 mb-0 pb-4">
            {"Already have an account?"}{" "}
            <Link href="/establishment/login" className="text-white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUP;