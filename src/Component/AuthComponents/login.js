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
  const is_loggedIn = useSelector((store) => store.HOTEL_LOGIN);

    useEffect(() => {
      if (typeof window !== "undefined") {
        if (localStorage.getItem('phloii_token_auth') && localStorage.getItem('phloii_remember_me')) {
          router.push('/establishment')
        }
        else{
          localStorage.clear()
        }
      }
    }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email) {
      setemailError("Email is required");
      return;
    }

    if (!validator.isEmail(email)) {
      setemailError("Email is not valid");
      return;
    }

    if (!password) {
      setPasswordError("Password is requires");
      return;
    }
    dispatch(hotel_login({ email, password }));
  };

  useEffect(() => {
    if (is_loggedIn?.status === "Success") {
      console.log(is_loggedIn, "is_loggedIn");
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
      toast.error(is_loggedIn?.error?.message);
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

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
      <div className="auth_form">
        <div className="text-center">
          <Image src="/assets/logo.png" width={139} height={57} alt="logo" />
        </div>
        <h2 className="main_heading text-center mt-4">Login Account</h2>
        <p className="sort_desc text-center">
          Welcome back! Please log in to access your account
        </p>
        <div class="mb-3">
          <label for="email" class="form-label cmn_label">
            Email
          </label>
          <input
            type="email"
            class="form-control cmn_input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
              setemailError("");
            }}
            style={emailError ? { border: "1px solid red" } : {}}
          />
          {emailError && (
            <span style={emailError ? { color: "red", fontSize: "10px" } : {}}>
              {emailError}
            </span>
          )}
        </div>
        <div class="mb-3">
          <label for="password" class="form-label cmn_label">
            Password
          </label>
          <input
            type="password"
            class="form-control cmn_input"
            placeholder="*********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            style={passwordError ? { border: "1px solid red" } : {}}
          />
          {passwordError && (
            <span
              style={passwordError ? { color: "red", fontSize: "10px" } : {}}
            >
              {passwordError}
            </span>
          )}
        </div>
        <div class="form-check d-flex align-itmes-center gap-2">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={rememberMe}
            onChange={(e) => setRememberMe(!rememberMe)}
          />
          <label
            class="form-check-label sub-text fadeColor mt-1"
            for="flexCheckDefault"
          >
            Remember me
          </label>
          <Link
            href="establishment/forgot-password"
            className="sub-text text-hightLight ms-auto text-decoration-none mt-1"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4">
          <Button
            buttonClick={handleLogin}
            text={is_loggedIn?.status !== "Loading" ? "Signin" : "Loading"}
            className={"w-100"}
          />
        </div>
        <p className="text-center loginAlready fadeColor mt-2 mb-0">
          {"Dont have an account? "}
          <Link href="/establishment/signup" className="text-white">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
