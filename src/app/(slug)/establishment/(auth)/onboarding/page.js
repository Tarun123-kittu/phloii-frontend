'use client'
import React from "react";
import Image from "next/image";
import "./onboard.css";

import OnBoardingSteps from "./onBoardingSteps";
const Page = () => {
  return (
    <div className="onboard_wrapper">
      <div className={"header-card"}>
        <Image src="/assets/logo.svg" width={139} height={57} alt="logo" />
      </div>
      <div className="board_form">
        <div className="auth_form m-auto">
          <h2 className="main_heading text-center mt-2 mb-4">Registration Form</h2>
          <p className="sort_desc text-center text-white">
            Please fill out this form with the required information
          </p>
        </div>
       <OnBoardingSteps col="col-lg-12"/>
      </div>
    </div>
  );
};

export default Page;
