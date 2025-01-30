import React from 'react'
import CommonModal from '../Modal/commonModal'
import Button from '../Hotel/Button/Button'
import Image from 'next/image'
const ResetContent = ({show, onClose}) => {
console.log(onClose,"onClose")
  return (
    <CommonModal show={show} onClose={onClose}>
          <div className="auth_form">
        <div className="text-center">
          <Image src="/assets/logo.svg" width={139} height={57} alt="logo" />
        </div>
        <h2 className="main_heading text-center mt-2">Change Password</h2>
        <p className="sort_desc text-center">
        Create a new password. Ensure it differs from <br/>
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label cmn_label">
            New Password
          </label>
          <input
            type="password"
            className="form-control cmn_input"
            placeholder="New password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ConfirmPassword" className="form-label cmn_label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control cmn_input"
            placeholder="Re-enter password"
          />
        </div>
        

        <div className="mt-4">
          <Button text={'Submit'} className={"w-100"} buttonClick={onClose} />
        </div>
      </div>
    </CommonModal>
  )
}

export default ResetContent