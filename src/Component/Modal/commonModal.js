import React, { useEffect, useRef } from "react";
import "./modal.css";

const CommonModal = ({ show, onClose, children }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show, onClose]);

  return (
    <div
      className={`cmn_modal modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{
        background: show ? "rgb(255 255 255 / 50%)" : "none",
        display: show ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document" ref={modalRef}>
        <div className="modal-content position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            onClick={onClose}
            aria-label="Close"
            style={{ top: "10px", right: "10px", zIndex: 10 }}
          ></button>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
