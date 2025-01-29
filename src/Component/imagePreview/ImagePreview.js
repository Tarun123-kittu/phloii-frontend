"use client"; 

import React, { useState } from "react";
import "./imagePreview.css";

const ImageGallery = ({ images, setShow_image_preview, show_image_preview, index }) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const openPopup = (index) => {
    setCurrentIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setShow_image_preview(false);
  };

  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX); // Store the initial touch position
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX); // Store the final touch position
    if (touchStart - touchEnd > 100) {
      // Swipe left
      showNextImage();
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      showPreviousImage();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            style={{
              width: "150px",
              height: "100px",
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: "8px",
            }}
            onClick={() => openPopup(index)}
          />
        ))}
      </div>

      {/* Image Popup */}
      {show_image_preview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onTouchStart={handleTouchStart} // Detect touch start
          onTouchEnd={handleTouchEnd}     // Detect touch end
        >
          {/* Close Button */}
          <button
            onClick={closePopup}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
              fontSize: "40px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            &times; {/* Close Icon */}
          </button>

          {/* Previous Button */}
          <button
            onClick={showPreviousImage}
            style={{
              position: "absolute",
              left: "20px",
              color: "white",
              fontSize: "30px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            &#10094; {/* Left Arrow */}
          </button>

          {/* Current Image */}
          <img
            src={images[currentIndex]}
            alt={`Popup Image ${currentIndex + 1}`}
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />

          {/* Next Button */}
          <button
            onClick={showNextImage}
            style={{
              position: "absolute",
              right: "20px",
              color: "white",
              fontSize: "30px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            &#10095; {/* Right Arrow */}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
