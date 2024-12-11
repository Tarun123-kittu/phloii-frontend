import React from "react";
import Button from "../Hotel/Button/Button";
const WhyPhloiiVerified = ({ col }) => {
  return (
    <div className="mt-5">
      <div className="row">
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Why do you want to be on Phloii Verified?
            </label>
            <textarea
              rows={5}
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
            />
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              What makes your restaurant unique?
            </label>
            <textarea
              rows={5}
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
            />
          </div>
        </div>
        <div className="col-12">
          <div className="mb-3">
            <label for="type" className="form-label cmn_label">
              Please upload 5 pictures of your Establishment:
            </label>
            <div className="add_file">
              <div className="d-flex justify-content-between align-items-center pe-3 position-relative">
                <input
                  type="file"
                  className="form-control cmn_input"
                  placeholder="enter website link"
                />
                <div className="flex-grow-1">
                  <p className="px-3 pt-2">
                    <svg
                      className="me-1"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5596 6.6748C15.2596 6.9073 16.3621 8.2948 16.3621 11.3323V11.4298C16.3621 14.7823 15.0196 16.1248 11.6671 16.1248H6.7846C3.4321 16.1248 2.0896 14.7823 2.0896 11.4298V11.3323C2.0896 8.3173 3.1771 6.9298 5.8321 6.6823"
                        stroke="#888888"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.22998 11.2501V2.71515"
                        stroke="#888888"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.7423 4.38732L9.22979 1.87482L6.71729 4.38732"
                        stroke="#888888"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Drag and drop files here our upload
                  </p>
                  <span className="px-3 pb-3 d-block pt-1">
                    Accepted file types JPEG,PND
                  </span>
                </div>
                <Button text="Upload" className={"upload_btn"} />
              </div>
            </div>
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Are you open to having a safe word that a person can say to get
              help?
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
            />
          </div>
        </div>
        <div className={col}>
          <div className="mb-3">
            <label for="email" className="form-label cmn_label">
              Are you open to an in-person visit? If yes, when is a good time to
              meet?
            </label>
            <input
              type="text"
              className="form-control cmn_input"
              placeholder="write message"
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end gap-3">
        <Button text="Previous" className="grey_btn" />
        <Button text="Done" />
      </div>
    </div>
  );
};

export default WhyPhloiiVerified;
