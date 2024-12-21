'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Hotel/Button/Button";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { forgot_password, clear_forgot_password_state } from "@/utils/redux/slices/authSlice/forgotPassword";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const ForgotPassword = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setemail] = useState('')
  const [emailError, setemailError] = useState('')
  const is_email_sent = useSelector((store) => store.FORGOT_PASSWORD)

  const handleSendEmail = () => {
    if (!email) {
      setemailError("Please enter your email")
      return
    }
    if (!validator.isEmail(email)) {
      setemailError("Email is not valid");
      return;
    }
    dispatch(forgot_password({ email }))
  }

  useEffect(() => {
    if (is_email_sent?.status === "Success") {
      toast.success(is_email_sent?.data?.message)
      router.push("/establishment/login")
      dispatch(clear_forgot_password_state())
    }
    if (is_email_sent?.status === "Error") {
      toast.error(is_email_sent?.error?.message)
      dispatch(clear_forgot_password_state())
    }
  }, [is_email_sent])
  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
      <div className="auth_form">
        <div className="text-center">
          <Image src="/assets/logo.png" width={139} height={57} alt="logo" />
        </div>
        <h2 className="main_heading text-center mt-4">Forget Password</h2>
        <p className="sort_desc text-center">
          Please fill out this form with the required information
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

        <div className="mt-4">
          <Button buttonClick={handleSendEmail} text={is_email_sent?.status === "Loading" ? "Loading" : "Send"} className={"w-100"} />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword