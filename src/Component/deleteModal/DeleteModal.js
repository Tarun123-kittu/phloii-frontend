import React from 'react';

const DeleteModal = ({ isVisible, onClose, onConfirm, title, message,is_subscription_deleted }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 30%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#000',
          borderRadius: '8px',
          padding: '20px',
          width: '400px',
          textAlign: 'center',
        }}
      >
        <h3 className='text-white'>{title}</h3>
        <p className='text-white'>{message}</p>
        {is_subscription_deleted?.status === "Loading"  && (
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    )}
        <div className='d-flex justify-content-center mt-4 gap-3'>
          <button
           className='grey_btn cmn_btn'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
           className='cmn_btn'
            onClick={onConfirm}
          >
            {is_subscription_deleted?.status === "Loading" ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
