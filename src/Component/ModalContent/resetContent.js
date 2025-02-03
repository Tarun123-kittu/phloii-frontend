'use client'

import React, { useState, useEffect } from 'react'
import CommonModal from '../Modal/commonModal'
import Button from '../Hotel/Button/Button'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { changePassword, clear_change_password_state } from '@/utils/redux/slices/authSlice/changePassword'

const ResetContent = ({ show, onClose }) => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const isPasswordChanged = useSelector((store) => store.CHANGE_PASSWORD)
   const [confirmPasswrdError, setConfirmPasswrdError] = useState('')
  console.log(isPasswordChanged, "isPasswordChanged isPasswordChanged")

  const handleChangePassword = () => {
    if (!password && !newPassword && !confirmPassword) {
      setPasswordError("Current password is required")
      setNewPasswordError("New password is required")
      setConfirmPasswordError("Confirm password is required")
      return
    }

    if (!password) {
      setPasswordError("Current password is required")
      return
    }
    if (!newPassword) {
      setNewPasswordError("Current password is required")
      return
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Current password is required")
      return
    }
    if (newPassword !== confirmPassword) {
      setNewPasswordError("New password not matched !!")
      setConfirmPasswordError("Confirm password not matched !!")
      return
    }

    dispatch(changePassword({ password, newPassword, confirmPassword }))
  }

  useEffect(() => {
    if (isPasswordChanged.status === "Success") {
      toast.success("Password changed successfully !!")
      dispatch(clear_change_password_state())
      onClose()
    }
    if (isPasswordChanged.status === "Error") {
      toast.error(isPasswordChanged?.error?.message)
    }
  }, [isPasswordChanged])

  const handlePasswordChange = (e) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const newPassword = e.target.value;
    
    setNewPassword(newPassword);
    setNewPasswordError(""); // Corrected the reset for error message
  
    if (!passwordPattern.test(newPassword)) {
      setNewPasswordError(
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
      );
      return;
    }
  
    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswrdError("Confirm password doesn't match with password");
    } else {
      setConfirmPasswrdError("");
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswrdError("");
  
    if (newPassword && newConfirmPassword !== newPassword) {
      setConfirmPasswrdError("Confirm password doesn't match with password");
    } else {
      setConfirmPasswrdError("");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };

  return (
    <CommonModal show={show} onClose={onClose}>
      <div className="auth_form">
        <div className="text-center">
          <Image src="/assets/logo.svg" width={139} height={57} alt="logo" />
        </div>
        <h2 className="main_heading text-center mt-2">Change Password</h2>
        <p className="sort_desc text-center">
          Create a new password. Ensure it differs from <br />
          previous ones for security
        </p>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label cmn_label">
            Current Password
          </label>
          <input
            type="password"
            className="form-control cmn_input"
            placeholder="Enter your current password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError('') }}
            style={passwordError ? { border: "1px solid #ff00009c" } : {}}
          />
          {passwordError && (
            <span style={passwordError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
              {passwordError}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label cmn_label">New Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control cmn_input"
              placeholder="Please enter your password"
              value={newPassword}
              onChange={handlePasswordChange}
              style={newPasswordError ? { border: "1px solid red" } : {}}
              autoComplete="new-password"
            />
            <div
              className="position-absolute end-0 me-3 mt-1"
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? <img src="/hide.svg" alt="hide" /> : <img src="/view.svg" alt="hide" />}
            </div>
          </div>
          {newPasswordError ? <span className="password_input d-block pt-1 text-danger">
            {newPasswordError}
          </span> : <span className="password_input d-block pt-1">
          </span>}
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


        <div className="mt-4">
          <Button text={'Change Password'} className={"w-100"} buttonClick={handleChangePassword} loading={isPasswordChanged} />
        </div>
      </div>
    </CommonModal>
  )
}

export default ResetContent