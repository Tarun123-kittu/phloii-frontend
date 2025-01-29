'use client'

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import "../../app/(slug)/establishment/page.css"
import SideBar from '@/Component/Sidebar/SideBar';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { get_hotels_details } from '@/utils/redux/slices/hotelOnboardingSlice/getHotelsDetails';
import ImageGallery from '@/Component/imagePreview/ImagePreview';
import Link from 'next/link';
import { toggle_sidebar } from '@/utils/redux/slices/sidebarSlice/manageSidebar';
import Loader from '../loader/Loader';
const Establishment = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [hotel_details, setHotel_details] = useState()
  const [images, setImages] = useState()
  const [index, setIndex] = useState(null)
  const [show_image_preview, setShow_image_preview] = useState(false)
  const [show_page_preview2, setShow_page_preview2] = useState('')
  const all_hotels = useSelector((store) => store.HOTEL_DETAILS)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem('phloii_token_auth')) {
        router.push('/establishment/login')
      }
    }
    setShow_page_preview2(localStorage.getItem('phloii_token_auth'))
  }, []);

  useEffect(() => {
    dispatch(get_hotels_details())
  }, [])

  useEffect(() => {
    if (all_hotels?.status === "Success") {
      setHotel_details(all_hotels?.data?.data)
    }
  }, [all_hotels])

  const handleViewHotel = (id, name) => {
    router.push(`/establishment/establishment-details/${id}/${decodeURIComponent(name)}`)
  }

   const handleToggle = () => {    
        dispatch(toggle_sidebar(false))
    }

  return (
    <>
      <Head>
        <title>Establishment Information</title>
        <meta name="description" content="Find details about hotels. Discover amenities, reviews, and more." />
      </Head>
      <SideBar>
        {all_hotels?.status === "Loading" ? <Loader /> : <div onClick={ () => handleToggle()} className="wrapper">
          <h5 className='text-white mb-3'>Establishment Information</h5>
          {hotel_details?.length === 0 ? <img src='/noData.svg' /> : hotel_details?.map((hotel, i) => (
            
            <div className="profile-card m-0  row mb-4" key={i}>

              <div className="col-md-12 col-lg-3  profile-sidebar">
                <div className="d-flex justify-content-center hotel_user position-relative">
                  <img src={hotel?.images[0]} alt="Profile" className="profile-img position-relative mt-3 " />
                </div>
                <h5 className="mb-1">{hotel?.ownerDetails?.ownerName}</h5>
                <p className="pending_pay mb-3">payment {hotel?.hotelPayments?.paymentStatus}</p>
                <ul className="owner_details px-2">
                  {hotel?.ownerDetails?.ownerPhone && <li><img src="/assets/mobile_icon.svg" alt="" /> <a href={`tel:${hotel?.ownerDetails?.ownerPhone}`}>{hotel?.ownerDetails?.ownerPhone}</a></li>}
                  {hotel?.ownerDetails?.ownerEmail && <li><img src="/assets/message_icon.svg" alt="" /> <a href={`mailto:${hotel?.ownerDetails?.ownerEmail}`}>{hotel?.ownerDetails?.ownerEmail}</a></li>}
                  {hotel?.ownerDetails?.websiteLink && <li className='pb-0'><img src="/assets/globe_icon.svg" alt="" /> <Link target='_blank' href={hotel?.ownerDetails?.websiteLink}>{hotel?.ownerDetails?.websiteLink}</Link></li>}
                </ul>
              </div>


              <div className="col-md-12 col-lg-9 hotel-details-wrapper p-0">
                <div className="d-flex hotel-details justify-content-between align-items-center">

                  <ul className='dash-list p-0 mb-0 w-100 align-items-center m-0'>
                    <li>
                      <span className='d-block hotel_name'>{hotel?.establishmentName}</span>
                      <span className='hotel_address text-nowrap' title={hotel?.address?.streetAddress}>
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.2545 8.62089C8.29645 8.62089 9.14112 7.77622 9.14112 6.73427C9.14112 5.69232 8.29645 4.84766 7.2545 4.84766C6.21256 4.84766 5.36789 5.69232 5.36789 6.73427C5.36789 7.77622 6.21256 8.62089 7.2545 8.62089Z" stroke="white" strokeWidth="0.907026" />
                          <path d="M2.19437 5.63436C3.3856 0.397798 11.1437 0.403845 12.3289 5.64041C13.0243 8.71221 11.1135 11.3123 9.43848 12.9208C8.22307 14.0939 6.30017 14.0939 5.07871 12.9208C3.40978 11.3123 1.49898 8.70616 2.19437 5.63436Z" stroke="white" strokeWidth="0.907026" />
                        </svg>{
                          hotel?.address?.streetAddress?.length > 20
                            ? hotel.address.streetAddress.slice(0, 20) + "..."
                            : hotel.address.streetAddress
                        }

                      </span>
                    </li>
                    {/* {hotel?.establishmentType && <li>
                      <span className='d-block'>Establishment Type</span>
                      <strong>{hotel?.establishmentType}</strong>
                    </li>} */}
                    {/* {hotel?.address?.country && <li>
                      <span className='d-block'>Country</span>
                      <strong>{hotel?.address?.country}</strong>
                    </li>}
                    {hotel?.address?.state && <li>
                      <span className='d-block'>State</span>
                      <strong>{hotel?.address?.state}</strong>
                    </li>}
                    {hotel?.address?.pinCode && <li>
                      <span className='d-block'>Pin/Zip Code</span>
                      <strong>{hotel?.address?.pinCode}</strong>
                    </li>}
                    {hotel?.address?.suiteUnitNumber && <li>
                      <span className='d-block'>Suite/Unit Number</span>
                      <strong>{hotel?.address?.suiteUnitNumber}</strong>
                    </li>} */}
                    <li>
                      <button onClick={() => handleViewHotel(hotel?._id, hotel?.establishmentName)} className="edit-btn">  View</button>
                    </li>
                  </ul>

                </div>





                <div className='hotel-photo-wrapper'>
                  <h5>Establishment Photos</h5>
                  <div className=" hotel-photos ">
                    <div onClick={() => { setImages(hotel?.images); setShow_image_preview(true); setIndex(0) }} className="- p-0">
                      <img src={hotel?.images[0]} alt="Hotel 1" />
                    </div>
                    <div onClick={() => { setImages(hotel?.images); setShow_image_preview(true); setIndex(1) }} className=" p-0">
                      <img src={hotel?.images[1]} alt="Hotel 2" />
                    </div>
                    <div onClick={() => { setImages(hotel?.images); setShow_image_preview(true); setIndex(0) }} className="p-0 view-more">
                      <img src={hotel?.images[2]} alt="Hotel 3" className="view-more-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          ))}
          {show_image_preview && <ImageGallery images={images} setShow_image_preview={setShow_image_preview} show_image_preview={show_image_preview} index={index} />}
        </div>}
      </SideBar>
    </>
  );
};

export default Establishment;



