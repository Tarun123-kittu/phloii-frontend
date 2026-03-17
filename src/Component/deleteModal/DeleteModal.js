import React from 'react';
import Button from '../Hotel/Button/Button';

const DeleteModal = ({ isVisible, onClose, onConfirm, title, message, is_subscription_deleted }) => {
  if (!isVisible) return null;

  return (
    <div
      className="delete_modal_overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        className="delete_modal_content"
        style={{
          backgroundColor: '#0e0e0e',
          borderRadius: '16px',
          padding: '30px',
          width: '420px',
          textAlign: 'center',
          border: '1px solid #333',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        }}
      >
        <div className="mb-3 d-flex justify-content-center">
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 59, 48, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.33 16.5H13.66" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 12.5H14.5" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h3 className="main_heading mb-2" style={{ color: '#fff', fontSize: '22px' }}>{title}</h3>
        <p className="sort_desc mb-4" style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.5' }}>{message}</p>

        <div className='d-flex justify-content-center gap-3 mt-2'>
          <Button
            className="grey_btn w-100"
            text="Cancel"
            buttonClick={onClose}
          />
          <Button
            className="w-100"
            text={is_subscription_deleted?.status === "Loading" ? "Deleting..." : "Delete"}
            loading={is_subscription_deleted}
            buttonClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
