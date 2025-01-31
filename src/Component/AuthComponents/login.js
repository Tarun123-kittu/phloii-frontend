"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Hotel/Button/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  hotel_login,
  clear_hotel_login_state,
} from "@/utils/redux/slices/authSlice/login";
import validator from "validator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedinError,setLoggedInError] = useState('')
  const is_loggedIn = useSelector((store) => store.HOTEL_LOGIN);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('phloii_token_auth') && localStorage.getItem('phloii_remember_me')) {
        router.push('/establishment')
      }
      else {
        localStorage.clear()
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedInError('')
    if (!email && !password) {
      setemailError("Email is required");
      setPasswordError("Password is required");
      return
    }

    if (!email) {
      setemailError("Email is required");
      return;
    }

    if (!validator.isEmail(email)) {
      setemailError("Email is not valid");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    dispatch(hotel_login({ email, password }));
  };

  useEffect(() => {
    if (is_loggedIn?.status === "Success") {
      toast.success("Logged in");
      localStorage.setItem("phloii_token_auth", is_loggedIn?.data?.data);
      localStorage.setItem("phloii_user", is_loggedIn?.data?.email);
      localStorage.setItem("phloii_user_name", is_loggedIn?.data?.username);
      localStorage.setItem("phloii_onboarding_done", is_loggedIn?.data?.isOnboradingDone);
      if (is_loggedIn?.data?.isOnboradingDone) {
        router.push("/establishment");
      } else {
        router.push("/establishment/onboarding");
      }

      dispatch(clear_hotel_login_state());
    }

    if (is_loggedIn?.status === "Error") {
      setLoggedInError(is_loggedIn?.error?.message);
      dispatch(clear_hotel_login_state())
    }
  }, [is_loggedIn]);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('phloii_remember_me', email)
    }
  }, [rememberMe])
  // if (localStorage.getItem('phloii_token_auth')) {
  //   router.push('establishment')
  // }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
      <div className="auth_form">
        <div className="text-center">
          <Image src="/assets/logo.svg" width={139} height={57} alt="logo" />
        </div>
        <h2 className="main_heading text-center mt-4">Login Account</h2>
        <p className="sort_desc text-center">
          Welcome back! Please log in to access your account
        </p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label cmn_label">
            Email
          </label>
          <input
            type="email"
            className="form-control cmn_input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value.toLowerCase());
              setemailError("");
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
          <label htmlFor="password" className="form-label cmn_label">
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
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
              className="position-absolute end-0 me-3 mt-1 top-0"
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? <img src="/hide.svg" alt="hide" /> : <img src="/view.svg" alt="hide" />} {/* Toggle text */}
            </div>
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#007BFF",
              }}
            >
              {showPassword ? (
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.5 7.5C7.01472 7.5 5 9.51472 5 12C5 14.4853 7.01472 16.5 9.5 16.5C11.9853 16.5 14 14.4853 14 12C14 9.51472 11.9853 7.5 9.5 7.5ZM7.5 12C7.5 10.6193 8.61929 9.5 10 9.5C11.3807 9.5 12.5 10.6193 12.5 12C12.5 13.3807 11.3807 14.5 10 14.5C8.61929 14.5 7.5 13.3807 7.5 12ZM20 12C20 12 16.5 18 10 18C3.5 18 0 12 0 12C0 12 3.5 6 10 6C16.5 6 20 12 20 12ZM10 8C6 8 3 12 3 12C3 12 6 16 10 16C14 16 17 12 17 12C17 12 14 8 10 8Z"
                  />
                </svg>
              ) : (
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.165 9.21496C11.8953 9.21496 11.6462 9.38246 11.5046 9.62596L10.4611 11.3665C10.3303 11.5824 10.1032 11.7099 9.87758 11.7099C9.65193 11.7099 9.42482 11.5824 9.29406 11.3665L8.25056 9.62596C8.10996 9.38246 7.86093 9.21496 7.5912 9.21496C7.32148 9.21496 7.07245 9.38246 6.93084 9.62596L5.88733 11.3665C5.75656 11.5824 5.52946 11.7099 5.30381 11.7099C5.07816 11.7099 4.85105 11.5824 4.72029 11.3665L3.67678 9.62596C3.53618 9.38246 3.28715 9.21496 3.01743 9.21496C2.7477 9.21496 2.49868 9.38246 2.35707 9.62596C1.70127 10.6815 1.35218 12.0271 1.35218 13.3749C1.35218 14.7227 1.70127 16.0683 2.35707 17.1239C2.49868 17.3674 2.7477 17.5349 3.01743 17.5349C3.28715 17.5349 3.53618 17.3674 3.67678 17.1239L4.72029 15.3833C4.85105 15.1674 5.07816 15.0399 5.30381 15.0399C5.52946 15.0399 5.75656 15.1674 5.88733 15.3833L6.93084 17.1239C7.07245 17.3674 7.32148 17.5349 7.5912 17.5349C7.86093 17.5349 8.10996 17.3674 8.25056 17.1239L9.29406 15.3833C9.42482 15.1674 9.65193 15.0399 9.87758 15.0399C10.1032 15.0399 10.3303 15.1674 10.4611 15.3833L11.5046 17.1239C11.6462 17.3674 11.8953 17.5349 12.165 17.5349C12.4347 17.5349 12.6837 17.3674 12.8253 17.1239C13.4811 16.0683 13.8302 14.7227 13.8302 13.3749C13.8302 12.0271 13.4811 10.6815 12.8253 9.62596C12.6837 9.38246 12.4347 9.21496 12.165 9.21496Z"
                  />
                </svg>
              )}
            </span>
          </div>
          <span className="password_input d-block pt-1">Password must contain atleast 8 chracter,including a number and letter</span>
          {passwordError && (
            <span
              style={passwordError ? { color: "red", fontSize: "12px" } : {}}
            >
              {passwordError}
            </span>
          )}
          <p className="loggederror">{loggedinError}</p>
        </div>
        <div>
        </div>
        <div className="form-check d-flex align-itmes-center gap-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={rememberMe}
            onChange={(e) => setRememberMe(!rememberMe)}
          />
          <label
            className="form-check-label sub-text fadeColor mt-1 "
            htmlFor="flexCheckDefault"
          >
            Remember me
          </label>
          <Link
            href="/establishment/forgot-password"
            className="sub-text text-hightLight ms-auto text-decoration-none mt-1"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4">
          <Button
            type="button"
            disabled={is_loggedIn?.status === "Loading"}
            buttonClick={handleLogin}
            text={is_loggedIn?.status !== "Loading" ? "Signin" : "Loading"}
            className={"w-100"}
          />
        </div>
        <p className="text-center loginAlready fadeColor mt-2 mb-0">
          {"Don't have an account? "}
          <Link href="/establishment/signup" className="text-white">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
