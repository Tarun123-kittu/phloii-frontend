'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Hotel/Button/Button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { reset_password, clear_reset_password_state } from "@/utils/redux/slices/authSlice/resetPassword";
import { useRouter } from "next/navigation";

const ResetPassword = ({ token }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirPasswordError, setConfirmPasswordError] = useState('')
  const is_password_reset = useSelector((store) => store.RESET_PASSWORD)
  console.log(is_password_reset, "is_password_reset is_password_reset")

  const handleResetPassword = () => {
    if (!password) {
      setPasswordError("Password is required")
      return
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required")
      return
    }
    if (confirmPassword !== password) {
      toast.error("Password and confirm password is not matched !!")
      return
    }
    dispatch(reset_password({ password, confirmPassword, token }))
  }

  useEffect(() => {
    if (is_password_reset?.status === "Success") {
      toast.success(is_password_reset?.data?.message)
      router.push("/hotels/login")
      dispatch(clear_reset_password_state())
    }
    if (is_password_reset?.status === "Error") {
      toast.error(is_password_reset?.error?.message)
      dispatch(clear_reset_password_state())
    }
  }, [is_password_reset])
  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
      <div className="auth_form">
        <div className="text-center">
          <Image src="/assets/logo.png" width={139} height={57} alt="logo" />
        </div>
        <h2 className="main_heading text-center mt-2">Set a new password</h2>
        <p className="sort_desc text-center">
        Create a new password. Ensure it differs from <br/>
        previous ones for security
        </p>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label cmn_label">
            Password
          </label>
          <input
            type="password"
            className="form-control cmn_input"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ConfirmPassword" className="form-label cmn_label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control cmn_input"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value) }}
          />
        </div>

        <div className="mt-4">
          <Button buttonClick={handleResetPassword} text={is_password_reset?.status === "Loading" ? "Loading" : "Update Password"} className={"w-100"} />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword