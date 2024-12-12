import React from "react";
import Image from "next/image";
import Button from "../Hotel/Button/Button";
import Link from "next/link";
const ForgotPassword = () => {
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
        <label for="email" class="form-label cmn_label">
          Email
        </label>
        <input
          type="email"
          class="form-control cmn_input"
          placeholder="Enter your email"
        />
      </div>
     
      <div className="mt-4">
          <Button text="Send" className={"w-100"}/>  
      </div>
      <p className="text-center loginAlready fadeColor mt-2 mb-0">
  {`Don&apos;t  have an account?`} <Link href="/" className="text-white">Login</Link>
</p>
    </div>
  </div>
  )
}

export default ForgotPassword