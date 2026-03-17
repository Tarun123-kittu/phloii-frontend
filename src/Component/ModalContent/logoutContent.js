'use client'

import React from 'react'
import Image from 'next/image'
import Button from '../Hotel/Button/Button'

const LogoutContent = ({ onConfirm, onCancel }) => {
    return (
        <div className="auth_form">
            <div className="text-center">
                <Image src="/assets/logo.svg" width={139} height={57} alt="logo" />
            </div>
            <h2 className="main_heading text-center mt-3">Logout Confirmation</h2>
            <p className="sort_desc text-center mb-4">
                Are you sure you want to logout from your account?
            </p>
            <div className="d-flex gap-3 justify-content-center">
                <Button
                    text="Cancel"
                    className="grey_btn w-100"
                    buttonClick={onCancel}
                />
                <Button
                    text="Logout"
                    className="w-100"
                    buttonClick={onConfirm}
                />
            </div>
        </div>
    )
}

export default LogoutContent
