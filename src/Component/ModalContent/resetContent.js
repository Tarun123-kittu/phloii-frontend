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
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const isPasswordChanged = useSelector((store) => store.CHANGE_PASSWORD)
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
          <label htmlFor="newPassword" className="form-label cmn_label">
            New Password
          </label>
          <input
            type="password"
            className="form-control cmn_input"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setNewPasswordError('') }}
            style={newPasswordError ? { border: "1px solid #ff00009c" } : {}}
          />
          {newPasswordError && (
            <span style={newPasswordError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
              {newPasswordError}
            </span>
          )}
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
            onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError('') }}
            style={confirmPasswordError ? { border: "1px solid #ff00009c" } : {}}
          />
          {confirmPasswordError && (
            <span style={confirmPasswordError ? { color: "#ff00009c", fontSize: "12px" } : {}}>
              {confirmPasswordError}
            </span>
          )}
        </div>


        <div className="mt-4">
          <Button text={'Change Password'} className={"w-100"} buttonClick={handleChangePassword} loading={isPasswordChanged}/>
        </div>
      </div>
    </CommonModal>
  )
}

export default ResetContent