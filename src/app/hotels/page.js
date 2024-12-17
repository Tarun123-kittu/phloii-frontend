'use client'

import React, { useEffect, useState } from 'react';
import './page.css';
import SideBar from '@/Component/Sidebar/SideBar';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { get_hotels_details } from '@/utils/redux/slices/hotelOnboardingSlice/getHotelsDetails';
import ImageGallery from '@/Component/imagePreview/ImagePreview';

const Hotels = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [hotel_details, setHotel_details] = useState()
  const [images,setImages] = useState()
  const [show_image_preview,setShow_image_preview] = useState(false)
  const all_hotels = useSelector((store) => store.HOTEL_DETAILS)
  console.log(all_hotels,"this is the all hotels")
  if (!localStorage.getItem('phloii_token_auth')) {
    router.push('/hotels/login')
  }

  useEffect(() => {
    dispatch(get_hotels_details())
  }, [])

  useEffect(() => {
    if (all_hotels?.status === "Success") {
      setHotel_details(all_hotels?.data?.data)
    }
  }, [all_hotels])

  const handleViewHotel = (id) => {
router.push(`/hotels/hotel-details/${id}`)
  }

  return (
    <SideBar>
      <div className="wrapper">
        {hotel_details?.map((hotel, i) => (
          <>
            <div className="profile-card row mb-4" key={i}>

              <div className="col-md-3 profile-sidebar">
                <div className="d-flex justify-content-center">
                  <img src={hotel?.images[0]} alt="Profile" className="profile-img" />
                </div>
                <h5 className="mb-1">{hotel?.ownerDetails?.ownerName}</h5>
                <p className="text-muted mb-3">payment pending</p>
                <div className="contact-info text-start">
                  {hotel?.ownerDetails?.ownerPhone && <p><i className="bi bi-telephone"></i>{hotel?.ownerDetails?.ownerPhone}</p>}
                  {hotel?.ownerDetails?.ownerEmail && <p><i className="bi bi-envelope"></i>{hotel?.ownerDetails?.ownerEmail}</p>}
                  {hotel_details?.ownerDetails?.websiteLink && <p><i className="bi bi-globe"></i>{hotel_details?.ownerDetails?.websiteLink}</p>}
                </div>
              </div>


              <div className="col-md-9 hotel-details-wrapper p-0">
                <div className="d-flex hotel-details justify-content-between align-items-center">
                  <div className='col-3'>
                    <div className='d-flex align-items-center gap-2'>
                      <div className='hotel-img'>
                        <img src={hotel?.images[0]} alt="Hotel 1" />
                      </div>
                      <div className=''>
                        <h4 className="p-0 m-0">{hotel?.establishmentName}</h4>
                        <p className="location-text p-0 m-0"><i className="bi bi-geo-alt"></i>{hotel?.address?.streetAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className='col-7'>
                    <div className="row hotel-info">
                      {hotel?.address?.country && <div className="col p-0 ">
                        <p>Country</p>
                        <h6>{hotel?.address?.country}</h6>
                      </div>}
                      {hotel?.address?.state && <div className="col p-0">
                        <p>State</p>
                        <h6>{hotel?.address?.state}</h6>
                      </div>}
                      {hotel?.address?.pinCode && <div className="col p-0">
                        <p>Pin/Zip Code</p>
                        <h6>{hotel?.address?.pinCode}</h6>
                      </div>}
                      {hotel?.address?.suiteUnitNumber && <div className="col p-0">
                        <p>Suite/Unit Number</p>
                        <h6>{hotel?.address?.suiteUnitNumber}</h6>
                      </div>}
                    </div>
                  </div>
                  <button onClick={() => handleViewHotel(hotel?._id)} className="edit-btn">  View</button>
                </div>





                <div className='hotel-photo-wrapper'>
                  <h5>Hotel Photos</h5>
                  <div className=" hotel-photos ">
                    <div className="- p-0">
                      <img src={hotel?.images[1]} alt="Hotel 1" />
                    </div>
                    <div className=" p-0">
                      <img src={hotel?.images[2]} alt="Hotel 2" />
                    </div>
                    <div onClick={() => {setImages(hotel?.images);setShow_image_preview(true)}} className="p-0 view-more">
                      <img src={hotel?.images[3]} alt="Hotel 3" className="view-more-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
        {show_image_preview && <ImageGallery images={images} setShow_image_preview={setShow_image_preview} show_image_preview={show_image_preview}/>}
      </div>
      {/* <div className='wrapper'>
        <div className='dashboard_wrapper'>
          <div className='dashboard_info'>
            <div className='dashboard_head d-flex gap-3 align-items-center'>
              <img src="assets/userImage.png" alt="user" className='user_image' />
              <div className='info flex-grow-1'>
                <h3>{hotel_details?.establishmentName || "Not Available"}</h3>
                <span>
                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.2545 8.62089C8.29645 8.62089 9.14112 7.77622 9.14112 6.73427C9.14112 5.69232 8.29645 4.84766 7.2545 4.84766C6.21256 4.84766 5.36789 5.69232 5.36789 6.73427C5.36789 7.77622 6.21256 8.62089 7.2545 8.62089Z" stroke="white" strokeWidth="0.907026" />
                    <path d="M2.19437 5.63436C3.3856 0.397798 11.1437 0.403845 12.3289 5.64041C13.0243 8.71221 11.1135 11.3123 9.43848 12.9208C8.22307 14.0939 6.30017 14.0939 5.07871 12.9208C3.40978 11.3123 1.49898 8.70616 2.19437 5.63436Z" stroke="white" strokeWidth="0.907026" />
                  </svg>
                  {hotel_details?.address?.streetAddress}
                </span>
              </div>
              <div className='payment_info'>
                <img src="assets/card-remove.svg" alt="payment type" /> Payment {hotel_details?.hotelPayments?.paymentStatus}
              </div>
            </div>
            <ul className='dash-list p-0 mb-4'>
              {hotel_details?.establishmentType && <li>
                <span className='d-block'>Establishment Type</span>
                <strong>{hotel_details?.establishmentType}</strong>
              </li>}
              {hotel_details?.address?.country && <li>
                <span className='d-block'>Country</span>
                <strong>{hotel_details?.address?.country}</strong>
              </li>}
              {hotel_details?.address?.state && <li>
                <span className='d-block'>State</span>
                <strong>{hotel_details?.address?.state}</strong>
              </li>}
              {hotel_details?.address?.pinCode && <li>
                <span className='d-block'>Pin/Zip Code</span>
                <strong>{hotel_details?.address?.pinCode}</strong>
              </li>}
              {hotel_details?.address?.suiteUnitNumber && <li>
                <span className='d-block'>Suite/Unit Number</span>
                <strong>{hotel_details?.address?.suiteUnitNumber}</strong>
              </li>}
            </ul>
            {hotel_details?.why_want_phloi && <div className='info'>
              <label htmlFor="" className='info_label'>Why do you want to be on Phloii Verified?</label>
              <p>{hotel_details?.why_want_phloi}</p>
            </div>}
            {hotel_details?.uniqueFeatures && <div className='info'>
              <label htmlFor="" className='info_label'>What makes your restaurant unique?</label>
              <p>{hotel_details?.uniqueFeatures}</p>
            </div>}
            {hotel_details?.safeWord && <div className='info'>
              <label htmlFor="" className='info_label'>Are you open to having a safe word that a person can say to get help?</label>
              <p>{hotel_details?.safeWord}</p>
            </div>}
            {hotel_details?.inPersonVisitAvailability && <div className='info'>
              <label htmlFor="" className='info_label'>Are you open to an in-person visit? If yes, when is a good time to meet?</label>
              <p>{hotel_details?.inPersonVisitAvailability}</p>
            </div>}
          </div>
          <div className='owner_info'>
            <div className='owner_head d-flex align-items-center'>
              <div className='flex-grow-1'>
                <h3>{hotel_details?.ownerDetails?.ownerName}</h3>
                <span>{!hotel_details?.adminVerified ? "Not Verified" : "Verified"}</span>
              </div>
              <button>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.77748 2.04544L3.02434 6.01801C2.88263 6.16887 2.74548 6.46601 2.71806 6.67173L2.54891 8.15287C2.48948 8.68773 2.87348 9.05344 3.40377 8.96201L4.87577 8.71058C5.08148 8.67401 5.36948 8.52315 5.5112 8.36773L9.26434 4.39515C9.91348 3.70944 10.2061 2.92773 9.19577 1.9723C8.19006 1.02601 7.42663 1.35973 6.77748 2.04544Z" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M6.1499 2.70898C6.34647 3.9707 7.37047 4.93527 8.64133 5.06327" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2.08569 10.4572H10.3143" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
               <span className='text-light'>Edit</span> 
              </button>
            </div>
            <ul className='owner_details'>
              <li><img src="assets/mobile_icon.svg" alt="" /> <a href="">{hotel_details?.ownerDetails?.ownerPhone}</a></li>
              {hotel_details?.ownerDetails?.websiteLink && <li><img src="assets/message_icon.svg" alt="" /> <a href="">{hotel_details?.ownerDetails?.websiteLink}</a></li>}
              <li><img src="assets/globe_icon.svg" alt="" /> <a href="">{hotel_details?.ownerDetails?.ownerEmail}</a></li>
            </ul>
            <div className='hotel_image'>
              <h5>Hotel Photos</h5>
              <img src={hotel_details?.images[0]} className='imge_one img-fluid' alt="" />
              <ul className="image-grid mt-3">
                {hotel_details?.images?.slice(1).map((image, i) => (
                  <li key={i}>
                    <img src={image} className="img-fluid" alt={`Hotel Image ${i + 1}`} />
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </div> */}
    </SideBar>
  );
};

export default Hotels;



