'use client'

import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar'
import { get_selected_hotel_details, clear_selected_hotel_details } from '@/utils/redux/slices/hotelOnboardingSlice/getSelectedHotelDetails'
import { useDispatch, useSelector } from 'react-redux'
import "./hotelDetails.css"
import ImageGallery from '../imagePreview/ImagePreview'
import Loader from '../loader/Loader'

const HotelDetailsComponent = ({ hotelId }) => {
    console.log(hotelId, "hotelId hotelId hotelId")
    const dispatch = useDispatch()
    const [hotel_details, setHotel_details] = useState()
    const [show_image_preview, setShow_image_preview] = useState()
    const [images, setImages] = useState()
    const [index, setIndex] = useState(null)
    const hotelDetails = useSelector((store) => store.SELECTED_HOTEL_DETAILS)

    useEffect(() => {
        dispatch(clear_selected_hotel_details());
    }, [dispatch]);

    useEffect(() => {
        if (hotelId) {
            dispatch(get_selected_hotel_details({ id: hotelId }));
        }
    }, [dispatch, hotelId]);

    useEffect(() => {
        if (hotelDetails?.status === 'Success') {
            setHotel_details(hotelDetails?.data?.data);
        }
    }, [hotelDetails]);
    return (
        <SideBar>
            {hotelDetails?.status === "Loading" ? <Loader /> : <div className='wrapper'>
                <div className='dashboard_wrapper'>
                    <div className='dashboard_info'>
                        <div className='dashboard_head d-flex gap-3 align-items-center'>
                            <img src="/assets/userImage.png" alt="user" className='user_image' />
                            <div className='info flex-grow-1'>
                                <h3>{hotel_details?.hotel?.establishmentName || "Not Available"}</h3>
                                <span title={hotel_details?.hotel?.address?.streetAddress}>
                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.2545 8.62089C8.29645 8.62089 9.14112 7.77622 9.14112 6.73427C9.14112 5.69232 8.29645 4.84766 7.2545 4.84766C6.21256 4.84766 5.36789 5.69232 5.36789 6.73427C5.36789 7.77622 6.21256 8.62089 7.2545 8.62089Z" stroke="white" strokeWidth="0.907026" />
                                        <path d="M2.19437 5.63436C3.3856 0.397798 11.1437 0.403845 12.3289 5.64041C13.0243 8.71221 11.1135 11.3123 9.43848 12.9208C8.22307 14.0939 6.30017 14.0939 5.07871 12.9208C3.40978 11.3123 1.49898 8.70616 2.19437 5.63436Z" stroke="white" strokeWidth="0.907026" />
                                    </svg>
                                    {hotel_details?.hotel?.address?.streetAddress.slice(0,30) + "..."}
                                </span>
                            </div>
                            <div className={'payment_info'}>
                                <img src="/assets/card-remove.svg" alt="payment type" /> Payment pending
                            </div>
                        </div>
                        <ul className='dash-list p-0 mb-4'>
                            {hotel_details?.hotel?.establishmentType && <li>
                                <span className='d-block'>Establishment Type</span>
                                <strong>{hotel_details?.hotel?.establishmentType}</strong>
                            </li>}
                            {hotel_details?.hotel?.address?.country && <li>
                                <span className='d-block'>Country</span>
                                <strong>{hotel_details?.hotel?.address?.country}</strong>
                            </li>}
                            {hotel_details?.hotel?.address?.state && <li>
                                <span className='d-block'>State</span>
                                <strong>{hotel_details?.hotel?.address?.state}</strong>
                            </li>}
                            {hotel_details?.hotel?.address?.pinCode && <li>
                                <span className='d-block'>Pin/Zip Code</span>
                                <strong>{hotel_details?.hotel?.address?.pinCode}</strong>
                            </li>}
                            {hotel_details?.hotel?.address?.suiteUnitNumber && <li>
                                <span className='d-block'>Suite/Unit Number</span>
                                <strong>{hotel_details?.hotel?.address?.suiteUnitNumber}</strong>
                            </li>}
                        </ul>
                        {hotel_details?.hotel?.why_want_phloi && <div className='info'>
                            <label htmlFor="" className='info_label'>Why do you want to be on Phloii Verified?</label>
                            <p>{hotel_details?.hotel?.why_want_phloi}</p>
                        </div>}
                        {hotel_details?.hotel?.uniqueFeatures && <div className='info'>
                            <label htmlFor="" className='info_label'>What makes your restaurant unique?</label>
                            <p>{hotel_details?.hotel?.uniqueFeatures}</p>
                        </div>}
                        {hotel_details?.hotel?.safeWord && <div className='info'>
                            <label htmlFor="" className='info_label'>Are you open to having a safe word that a person can say to get help?</label>
                            <p>{hotel_details?.hotel?.safeWord}</p>
                        </div>}
                        {hotel_details?.hotel?.inPersonVisitAvailability && <div className='info'>
                            <label htmlFor="" className='info_label'>Are you open to an in-person visit? If yes, when is a good time to meet?</label>
                            <p>{hotel_details?.hotel?.inPersonVisitAvailability}</p>
                        </div>}
                    </div>
                    <div className='owner_info'>
                        <div className='owner_head d-flex align-items-center'>
                            <div className='flex-grow-1'>
                                <h3>{hotel_details?.hotel?.ownerDetails?.ownerName}</h3>
                                <span className='verified'><span className='cmn_btn'></span> {!hotel_details?.hotel?.adminVerified ? "Not Verified" : "Verified"}</span>
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
                            <li><img src="/assets/mobile_icon.svg" alt="" /> <a href="">{hotel_details?.hotel?.ownerDetails?.ownerPhone}</a></li>
                            {hotel_details?.hotel?.ownerDetails?.websiteLink && <li><img src="/assets/message_icon.svg" alt="" /> <a href="">{hotel_details?.hotel?.ownerDetails?.websiteLink}</a></li>}
                            <li><img src="/assets/globe_icon.svg" alt="" /> <a href="">{hotel_details?.hotel?.ownerDetails?.ownerEmail}</a></li>
                        </ul>
                        <div className='hotel_image'>
                            <h5>Hotel Photos</h5>
                            <img onClick={() => { setShow_image_preview(true); setImages(hotel_details?.hotel?.images); setIndex(-1) }} src={hotel_details?.hotel?.images[0]} className='imge_one img-fluid' alt="" />
                            <ul className="image-grid mt-3">
                                {hotel_details?.hotel?.images?.slice(1).map((image, i) => (
                                    <li onClick={() => { setShow_image_preview(true); setImages(hotel_details?.hotel?.images); setIndex(i) }} key={i}>
                                        <img src={image} className="img-fluid" alt={`Hotel Image ${i + 1}`} />
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
                {show_image_preview && <ImageGallery images={images} setShow_image_preview={setShow_image_preview} show_image_preview={show_image_preview} index={index} />}
            </div>}
        </SideBar>
    )
}

export default HotelDetailsComponent