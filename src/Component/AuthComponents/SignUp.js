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
  const [isTerms, setIsTerms] = useState(false);
  const is_signed_up = useSelector((store) => store.HOTEL_SIGNUP)
  const is_loggedIn = useSelector((store) => store.HOTEL_LOGIN);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!username && !email && !password && !phone && !profileImage) {
      setUsernameError("Username is required");
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setPhoneError("Phone is required")
      setProfileImageError("Profile Image is required")
      return
    }
    if (!profileImage) {
      setProfileImageError("Profile Image is required")
      return
    }
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
      console.log(is_loggedIn, "is_loggedIn");
      toast.success("Logged in");
      localStorage.setItem("phloii_token_auth", is_loggedIn?.data?.data);
      localStorage.setItem("phloii_user", is_loggedIn?.data?.email);
      localStorage.setItem("phloii_user_name", is_loggedIn?.data?.username);
      localStorage.setItem("phloii_user_phone", is_loggedIn?.data?.phone);
      localStorage.setItem("phloii_user_image", is_loggedIn?.data?.profileImage);
      localStorage.setItem("phloii_onboarding_done", is_loggedIn?.data?.isOnboradingDone);
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
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
      <div className="auth_form">
        <div className="text-center">
          <Image src="/assets/logo.svg" width={139} height={57} alt="logo" />
        </div>
        <h2 className="main_heading text-center mt-4">Create Account</h2>
        <p className="sort_desc text-center">
          Please fill out this form with the required information
        </p>
        <div className="mb-3">
          <label className="form-label cmn_label">Profile Image</label>
          <input
            type="file"
            className="form-control cmn_input"
            placeholder="Enter your name"
            onChange={handleFileChange}
          />
        </div>
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
          <label className="form-label cmn_label">Mobile Number</label>
          <input
            type="text"
            className="form-control cmn_input"
            placeholder="Enter your phone number"
            value={username}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
            style={phoneError ? { border: "1px solid red" } : {}}
          />
          {phoneError && (
            <span style={phoneError ? { color: "red", fontSize: "12px" } : {}}>
              {phoneError}
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
              type={showPassword ? "text" : "password"} // Toggle input type based on state
              className="form-control cmn_input"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              style={passwordError ? { border: "1px solid red" } : {}}
            />
            <div
              className="position-absolute end-0 me-3 mt-1"
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? <img src="/hide.svg" alt="hide" /> : <img src="/view.svg" alt="hide" />} {/* Toggle text */}
            </div>
          </div>
          <span className="password_input d-block pt-1">Password must contain atleast 8 chracter,including a number and letter</span>
          {passwordError && (
            <span style={passwordError ? { color: "red", fontSize: "12px" } : {}}>
              {passwordError}
            </span>
          )}
        </div>
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
        <p className="text-center loginAlready fadeColor mt-2 mb-0">
          {"Already have an account?"}{" "}
          <Link href="/establishment/login" className="text-white">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUP;
