"use client";

import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from '../../app/page.module.css'
const Testimonials = () => {
  const [sliderRefLeft, sliderLeft] = useKeenSlider({
    loop: true,
  });

  const [sliderRefRight, sliderRight] = useKeenSlider({
    loop: true,
  });

  const handleNext = () => {
    sliderLeft.current?.next();
    sliderRight.current?.next();
  };

  const handlePrev = () => {
    sliderLeft.current?.prev();
    sliderRight.current?.prev();
  };

  const clients = [
        {   name: 'Cameron Williamson',
            designation:'Founder Gojek Corp.',
            review: 'Kerjarodi.com is an application for job seekers and workers who prioritize user comfort and the quality of services provided by our team', 
            image: 'assets/clientOne.png' 
        },
        {   name: 'John Snow',
            designation:'Founder Gojek Corp.',
            review: 'Kerjarodi.com is an application for job seekers and workers who prioritize user comfort and the quality of services provided by our team', 
            image: 'assets/clientOne.png' 
        },
        {   name: 'John Snow',
            designation:'Founder Gojek Corp.',
            review: 'Kerjarodi.com is an application for job seekers and workers who prioritize user comfort and the quality of services provided by our team', 
            image: 'assets/clientOne.png' 
        },
    
  ];

  return (
    <div className={`${styles.padding} ${styles.bg_black}`} style={{ position: 'relative' }}>
     <div className="container">
     <div className="row">
        {/* Left Column: Reviews */}
        <div className="col-md-6">
            <h2 className={`${styles.cmn_heading}`}>What do they <span>think about</span> <br />our App?</h2>
          <div ref={sliderRefLeft} className="keen-slider">
            {clients.map((client, index) => (
              <div className="keen-slider__slide" key={index}>
                <h2 className={styles.clientName}>{client.name}</h2>
                <p className={styles.designation}>{client.designation}</p>
                <h5 className={styles.review}>{client.review}</h5>
              </div>
            ))}
          </div>
            <div className={styles.navigations}>
            <button className='d-flex align-items-center justify-content-center' onClick={handlePrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.36922 10.869C7.42572 10.811 7.63906 10.563 7.8378 10.359C9.00292 9.076 12.0424 6.976 13.6332 6.335C13.8748 6.232 14.4856 6.014 14.812 6C15.1247 6 15.4228 6.072 15.7073 6.218C16.0619 6.422 16.3463 6.743 16.5022 7.122C16.6025 7.385 16.7584 8.172 16.7584 8.186C16.9143 9.047 17 10.446 17 11.992C17 13.465 16.9143 14.807 16.7867 15.681C16.772 15.695 16.6162 16.673 16.4457 17.008C16.133 17.62 15.5222 18 14.8685 18H14.812C14.3863 17.985 13.491 17.605 13.491 17.591C11.9859 16.949 9.01656 14.952 7.82319 13.625C7.82319 13.625 7.48709 13.284 7.34096 13.071C7.11301 12.765 7 12.386 7 12.007C7 11.584 7.12762 11.19 7.36922 10.869Z" fill="white"/>
            </svg>

        </button>
        <button className='d-flex align-items-center justify-content-center' onClick={handleNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6308 13.131C16.5743 13.189 16.3609 13.437 16.1622 13.641C14.9971 14.924 11.9576 17.024 10.3668 17.665C10.1252 17.768 9.51437 17.986 9.18802 18C8.8753 18 8.5772 17.928 8.29274 17.782C7.93814 17.578 7.65368 17.257 7.49781 16.878C7.39747 16.615 7.2416 15.828 7.2416 15.814C7.08573 14.953 7 13.554 7 12.008C7 10.535 7.08573 9.193 7.21335 8.319C7.22796 8.305 7.38383 7.327 7.55431 6.992C7.86702 6.38 8.47784 6 9.13151 6H9.18802C9.61374 6.015 10.509 6.395 10.509 6.409C12.0141 7.051 14.9834 9.048 16.1768 10.375C16.1768 10.375 16.5129 10.716 16.659 10.929C16.887 11.235 17 11.614 17 11.993C17 12.416 16.8724 12.81 16.6308 13.131Z" fill="white"/>
</svg>

        </button>
            </div>
        </div>

        {/* Right Column: Images */}
        <div className={`${styles.client_image} col-md-6`}>
          <div ref={sliderRefRight} className={` keen-slider`}>
            {clients.map((client, index) => (
              <div className="keen-slider__slide" key={index}>
            <img src={client?.image} className='img-fluid' />
              </div>
            ))}
          </div>
        </div>
      </div>
     </div>

    
    </div>
  );
};


export default Testimonials;
