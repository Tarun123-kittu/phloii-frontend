import React from "react";
import Image from "next/image";
import "./onboard.css";
import EstablishmentDetails from "@/Component/OnBoardingSteps/EstablishmentDetails";
import PersonalDetails from "@/Component/OnBoardingSteps/PersonalDetails";
import WhyPhloiiVerified from "@/Component/OnBoardingSteps/WhyPhloiiVerified";
const Page = () => {
  return (
    <div className="onboard_wrapper">
      <header className={"header-card"}>
        <Image src="/assets/logo.png" width={139} height={57} alt="logo" />
      </header>
      <div className="board_form">
        <div className="auth_form">
          <h2 className="main_heading text-center mt-2">Registration Form</h2>
          <p className="sort_desc text-center text-white">
            Please fill out this form with the required information
          </p>
          <ul className="step_counter">
            <li>
              <span>1</span>
              <p>
                Establishment <br />
                details
              </p>
            </li>
          <li className="line"></li>
            <li>
              <span>2</span>
              <p>Personal <br/> Details</p>
            </li>
            <li className="line"></li>
            <li>
              <span>3</span>
              <p>
                Why Phloii <br /> Verified
              </p>
            </li>
          </ul>
        </div>
        {/* <EstablishmentDetails col="col-lg-12"/> */}
        {/* <PersonalDetails col="col-lg-12"/>  */}
        <WhyPhloiiVerified col="col-lg-12"/>
      </div>
    </div>
  );
};

export default Page;
