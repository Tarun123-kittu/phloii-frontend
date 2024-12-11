import React from "react";
import Button from "../Hotel/Button/Button";
const PersonalDetails = ({ col }) => {
  return (
    <div className="mt-5">
      <div className="row">
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Owner Name
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="enter owner name"
            />
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="type" className="form-label cmn_label">
              Establishment Website link
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="enter website link"
            />
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Establishment/Owner Phone
            </label>
            <input
              type="address"
              className="form-control cmn_input"
              placeholder="enter phone number"
            />
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Establishment/Owner Email
            </label>
            <input
              type="email"
              className="form-control cmn_input"
              placeholder="enter email"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-3">
        <Button text="Previous" className="grey_btn" />
        <Button text="Next" />
      </div>
    </div>
  );
};

export default PersonalDetails;
