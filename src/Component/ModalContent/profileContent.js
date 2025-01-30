import React from "react";
import CommonModal from "../Modal/commonModal";
import Button from "../Hotel/Button/Button";
import Image from "next/image";
import "./modalContent.css";
const ProfileContent = ({ show, onClose }) => {
  console.log(onClose, "onClose");
  return (
    <CommonModal show={show} onClose={onClose}>
      <div className="">
        <div className="profile_wrapper">
          <div className="profile_image position-relative">
          <div className="profile_image_upload position-relative">
        
          <svg className="position-absolute end-0 top-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="#FBB90D"/>
            <path d="M8.11763 8.82361H7.41176C7.03733 8.82361 6.67825 8.97235 6.41349 9.2371C6.14874 9.50186 6 9.86094 6 10.2354V16.5883C6 16.9627 6.14874 17.3218 6.41349 17.5865C6.67825 17.8513 7.03733 18 7.41176 18H13.7647C14.1391 18 14.4982 17.8513 14.7629 17.5865C15.0277 17.3218 15.1764 16.9627 15.1764 16.5883V15.8824" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.4705 7.41183L16.5881 9.52947M17.5658 8.53065C17.8438 8.25264 18 7.87558 18 7.48242C18 7.08926 17.8438 6.7122 17.5658 6.43419C17.2878 6.15618 16.9107 6 16.5175 6C16.1244 6 15.7473 6.15618 15.4693 6.43419L9.52936 12.353V14.4706H11.647L17.5658 8.53065Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>


          <input type="file" className="form-control cmn_input" />
          <Image src="/assets/profile-circle.svg" width={100} height={100} alt="profile_image" />
          </div>
          </div>
          <div className="profile_content">
            <h3 className="main_heading">My Profile</h3>
            <div className="auth_form">
              <div className="mb-3">
                <label htmlFor="name" className="form-label cmn_label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control cmn_input"
                  placeholder="Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label cmn_label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control cmn_input"
                  placeholder="Enter Your Email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label cmn_label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control cmn_input"
                  placeholder="Name"
                />
              </div>
              <div className="text-end">
                    <Button text="Cancel" className="grey_btn me-3"/>
                    <Button text="Submit"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default ProfileContent;
