import React from "react";
import Image from "next/image";
import Button from "../Hotel/Button/Button";
import Link from "next/link";
const Login = () => {
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
        <div class="mb-3">
          <label for="password" class="form-label cmn_label">
            Password
          </label>
          <input
            type="password"
            class="form-control cmn_input"
            placeholder="*********"
          />
        </div>
        <div class="form-check d-flex align-itmes-center gap-2">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label sub-text fadeColor mt-1" for="flexCheckDefault">
          Remember me
          </label>
          <Link href="/" className="sub-text text-hightLight ms-auto text-decoration-none mt-1">Forgot Password?</Link>
        </div>
        <div className="mt-4">
            <Button text="Sign up" className={"w-100"}/>  
        </div>
        <p className="text-center loginAlready fadeColor mt-2 mb-0">Don't have an account? <Link href="/" className="text-white">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
