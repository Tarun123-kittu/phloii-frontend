import React from "react";
import Image from "next/image";
import Button from "../Hotel/Button/Button";

const ResetPassword = () => {
  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
    <div className="auth_form">
      <div className="text-center">
        <Image src="/assets/logo.png" width={139} height={57} alt="logo" />
      </div>
      <h2 className="main_heading text-center mt-2">Create Account</h2>
      <p className="sort_desc text-center text-white">
        Please fill out this form with the required information
      </p>     
      <div class="mb-3">
        <label for="Password" class="form-label cmn_label">
          Password
        </label>
        <input
          type="password"
          class="form-control cmn_input"
          placeholder="Enter your new password"
        />
      </div>
      <div class="mb-3">
        <label for="ConfirmPassword" class="form-label cmn_label">
        Confirm Password
        </label>
        <input
          type="password"
          class="form-control cmn_input"
          placeholder="Re-enter password"
        />
      </div>
     
      <div className="mt-4">
          <Button text="Update Password" className={"w-100"}/>  
      </div>
     </div>
  </div>
  )
}

export default ResetPassword