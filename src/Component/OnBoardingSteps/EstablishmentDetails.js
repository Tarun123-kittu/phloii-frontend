import React from "react";
import Button from "../Hotel/Button/Button";

const EstablishmentDetails = ({ col }) => {
  return (
    <div className="mt-5">
      <div className="row">
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Establishment Name
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="Establishment name"
            />
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="type" className="form-label cmn_label">
              What type of establishment are you?
            </label>
            <select
              class="form-select cmn-select"
              aria-label="Default select example"
            >
              <option selected>select establishment</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Street Address
            </label>
            <input
              type="address"
              className="form-control cmn_input"
              placeholder="enter street address"
            />
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Suite/Unit Number
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="enter unit number"
            />
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="type" className="form-label cmn_label">
              Country
            </label>
            <select
              class="form-select cmn-select"
              aria-label="Default select example"
            >
              <option selected>select country</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="type" className="form-label cmn_label">
              State
            </label>
            <select
              class="form-select cmn-select"
              aria-label="Default select example"
            >
              <option selected>select state</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="type" className="form-label cmn_label">
              Pin/Zip Code
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="enter pin code"
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

export default EstablishmentDetails;
