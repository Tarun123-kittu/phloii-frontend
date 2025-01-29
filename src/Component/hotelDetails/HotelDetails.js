'use client'

import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar'
import { get_selected_hotel_details, clear_selected_hotel_details } from '@/utils/redux/slices/hotelOnboardingSlice/getSelectedHotelDetails'
import { useDispatch, useSelector } from 'react-redux'
import "./hotelDetails.css"
import ImageGallery from '../imagePreview/ImagePreview'
import Loader from '../loader/Loader'
import { useRouter } from 'next/navigation'
import { delete_subscription, clear_delete_subscription_state } from '@/utils/redux/slices/hotelOnboardingSlice/deleteSubscription'
import toast from 'react-hot-toast'
import DeleteModal from '../deleteModal/DeleteModal'
import Link from 'next/link'

const HotelDetailsComponent = ({ hotelId }) => {
    const router = useRouter()
    const handleEdit = () => {
        router.push(`/establishment/edit-establishment/${hotelId}/${hotel_details?.hotel?.establishmentName}`)
    }
    const dispatch = useDispatch()
    const [hotel_details, setHotel_details] = useState()
    const [show_image_preview, setShow_image_preview] = useState()
    const [images, setImages] = useState()
    const [index, setIndex] = useState(null)
    const [viewDeleteModal, setViewDeleteModal] = useState(false)
    const [customer_id, setCoustmer_id] = useState(null)
    const hotelDetails = useSelector((store) => store.SELECTED_HOTEL_DETAILS)
    const is_subscription_deleted = useSelector((store) => store.DELETE_SUBSCRIPTION)

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!localStorage.getItem('phloii_token_auth')) {
                router.push('/establishment/login')
            }
        }
    }, []);

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

    const handleDeleteSubscription = (customerId) => {
        setViewDeleteModal(true)
        setCoustmer_id(customerId)

    }

    useEffect(() => {
        if (is_subscription_deleted?.status === "Success") {
            toast.success("Subscription Cancelled Successfully")
            dispatch(get_selected_hotel_details({ id: hotelId }));
            setViewDeleteModal(false)
            dispatch(clear_delete_subscription_state())
        }
        if (is_subscription_deleted?.status === "Error") {
            toast.error(is_subscription_deleted?.error?.message)
            dispatch(clear_delete_subscription_state())
        }
    }, [is_subscription_deleted])

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const isPM = hours >= 12;
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; 
        const period = isPM ? 'PM' : 'AM';

        return `${formattedHours}:${formattedMinutes} ${period}`;
    };

    const handleCancelPlan = () => {
        dispatch(delete_subscription({ subscriptionId: customer_id }))
    }

    const closeModal = () => setViewDeleteModal(false)

    return (
        <SideBar>
            {hotelDetails?.status === "Loading" ? <Loader /> : <div className='wrapper'>
                <div className='dashboard_wrapper'>
                    <div className='dashboard_info'>
                        <div className='dashboard_head d-flex gap-3 align-items-center'>
                            <img src={hotel_details?.hotel?.images[0]} alt="user" className='user_profile_image' />
                            <div className='info flex-grow-1'>
                                <h3>{hotel_details?.hotel?.establishmentName || "Not Available"}</h3>
                                <span title={hotel_details?.hotel?.address?.streetAddress}>
                                    <svg className='me-1' width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.2545 8.62089C8.29645 8.62089 9.14112 7.77622 9.14112 6.73427C9.14112 5.69232 8.29645 4.84766 7.2545 4.84766C6.21256 4.84766 5.36789 5.69232 5.36789 6.73427C5.36789 7.77622 6.21256 8.62089 7.2545 8.62089Z" stroke="white" strokeWidth="0.907026" />
                                        <path d="M2.19437 5.63436C3.3856 0.397798 11.1437 0.403845 12.3289 5.64041C13.0243 8.71221 11.1135 11.3123 9.43848 12.9208C8.22307 14.0939 6.30017 14.0939 5.07871 12.9208C3.40978 11.3123 1.49898 8.70616 2.19437 5.63436Z" stroke="white" strokeWidth="0.907026" />
                                    </svg>
                                    {
                                        // hotel_details?.hotel?.address?.streetAddress?.length > 30
                                        //     ? hotel_details?.hotel?.address?.streetAddress.slice(0, 30) + "..."
                                        hotel_details?.hotel?.address?.streetAddress
                                    }
                                </span>
                            </div>
                          <div className='hotel_cta'>
                          <div className={hotel_details?.paymentDetails?.paymentStatus === "completed" ? "payment_info payment_success" : 'payment_info '}>
                                <img src="/assets/card-remove.svg" alt="payment type" /> Payment {hotel_details?.paymentDetails?.paymentStatus === "completed" ? "Completed" : hotel_details?.paymentDetails?.paymentStatus === "canceled" ? "Canceled " : "Pending"}
                            </div>
                            {hotel_details?.paymentDetails?.paymentStatus === "completed" && (
                                <button
                                    className="payment_info  d-flex align-items-center justify-content-center gap-2"
                                    onClick={() =>
                                        handleDeleteSubscription(hotel_details?.paymentDetails?.customerId)
                                    }
                                >
                                    Cancel Subscription
                                   
                                </button>
                            )}
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
                        <ul className='dash-list p-0 mb-4'>
                            {/* {hotel_details?.hotel?.food?.length > 0 && <li>
                                <span className='d-block'>Food</span>
                                <strong>{hotel_details?.hotel?.food?.join(", ")}</strong>
                            </li>}
                            {hotel_details?.hotel?.atmosphere?.length > 0 && <li>
                                <span className='d-block'>Atmosphere</span>
                                <strong>{hotel_details?.hotel?.atmosphere?.join(", ")}</strong>
                            </li>}
                            {hotel_details?.hotel?.services && <li>
                                <span className='d-block'>Services</span>
                                <strong>{hotel_details?.hotel?.services?.join(", ")}</strong>
                            </li>} */}
                            {hotel_details?.hotel?.openCloseTimings && <li>
                                <span className='d-block'>Open & Close Timing</span>
                                <strong>{formatTime(hotel_details?.hotel?.openCloseTimings?.open)} - {formatTime(hotel_details?.hotel?.openCloseTimings?.close)}</strong>
                            </li>}
                            {hotel_details?.hotel?.customerServiceNumber && <li>
                                <span className='d-block'>Coustmer Servce Number</span>
                                <strong>{hotel_details?.hotel?.customerServiceNumber}</strong>
                            </li>}
                        </ul>
                        {hotel_details?.hotel?.why_want_phloi && <div className='info'>
                            <label htmlFor="" className='info_label'>Why do you want to be on Phloii Verified?</label>
                            <p>{hotel_details?.hotel?.why_want_phloi}</p>
                        </div>}
                        {hotel_details?.hotel?.atmosphere_description && <div className='info'>
                            <label htmlFor="" className='info_label'>Please describe your atmosphere in great detail.</label>
                            <p>{hotel_details?.hotel?.atmosphere_description}</p>
                        </div>}
                        {hotel_details?.hotel?.food && <div className='info'>
                            <label htmlFor="" className='info_label'>Please explain what kind of food you serve (if you serve food)</label>
                            <p>{hotel_details?.hotel?.food}</p>
                        </div>}
                        {hotel_details?.hotel?.additional_information && <div className='info'>
                            <label htmlFor="" className='info_label'>Additional Information (Optional)</label>
                            <p>{hotel_details?.hotel?.additional_information}</p>
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
                                <span className='verified'>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="6.99854" cy="7" r="6" fill="white" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.790939 4.91769L1.17092 4.70909C1.4901 4.53029 1.6573 4.17269 1.5661 3.8449L1.4901 3.4277C1.39891 2.936 1.77889 2.4741 2.28047 2.4443L2.72125 2.4145C3.08603 2.3996 3.40522 2.1463 3.49641 1.8036L3.61801 1.3864C3.7548 0.894704 4.28678 0.641404 4.75796 0.835106L5.16833 0.999002C5.50272 1.1331 5.8827 1.04371 6.1259 0.775507L6.4147 0.447706C6.74907 0.0603074 7.34184 0.0603074 7.6762 0.417906L7.965 0.745708C8.20818 1.01391 8.6034 1.08841 8.93777 0.954303L9.39372 0.790407C9.86491 0.596706 10.4121 0.850005 10.5489 1.32681L10.6705 1.744C10.7617 2.0867 11.0808 2.3251 11.4457 2.34L11.8864 2.3549C12.4032 2.3698 12.7832 2.8317 12.692 3.3234L12.616 3.74059C12.5552 4.0833 12.7376 4.44089 13.0568 4.60479L13.4368 4.81339C13.8775 5.03689 14.0143 5.61799 13.7256 6.02026L13.4672 6.37787C13.2544 6.66097 13.2544 7.06329 13.4672 7.3464L13.7256 7.68906C14.0295 8.09138 13.8927 8.67248 13.4519 8.91086L13.0719 9.11947C12.7528 9.2983 12.5856 9.64096 12.6464 9.99856L12.7224 10.4158C12.8136 10.9075 12.4336 11.3694 11.932 11.3992L11.4912 11.429C11.1265 11.4439 10.8073 11.6972 10.7161 12.0398L10.5945 12.4571C10.4577 12.9488 9.9257 13.202 9.45452 13.0084L9.04413 12.8445C8.70976 12.7104 8.32977 12.7998 8.08659 13.068L7.79779 13.3958C7.46342 13.7831 6.85548 13.7831 6.52106 13.4106L6.23226 13.0829C5.9891 12.8147 5.59391 12.7402 5.25953 12.8743L4.84915 13.0382C4.37797 13.2319 3.8308 12.9785 3.69401 12.5018L3.57241 12.0846C3.48122 11.7419 3.16203 11.5035 2.79725 11.4886L2.35647 11.4737C1.83969 11.4587 1.45971 10.9969 1.5509 10.5052L1.6269 10.088C1.6877 9.74529 1.5053 9.38768 1.18612 9.2238L0.806139 9.01519C0.365359 8.7917 0.228566 8.2106 0.517352 7.80828L0.77574 7.45067C0.98853 7.16757 0.98853 6.7653 0.77574 6.4822L0.517352 6.13948C0.213366 5.73721 0.35016 5.15609 0.790939 4.91769ZM9.6889 3.94575C9.93444 3.94575 10.1511 4.03449 10.3243 4.21197C10.4976 4.37466 10.5843 4.6113 10.5843 4.84794C10.5843 5.08458 10.4832 5.32121 10.3099 5.4987L6.85847 9.32018C6.69961 9.49766 6.46855 9.58637 6.2375 9.58637C6.00645 9.58637 5.78984 9.49766 5.61655 9.32018L3.88363 7.2587C3.71034 7.096 3.62369 6.85937 3.62369 6.62273C3.62369 6.3861 3.71034 6.16424 3.88363 5.98676C4.05692 5.80929 4.28798 5.72052 4.51904 5.72052C4.75009 5.72052 4.96671 5.80929 5.14 5.98676L6.2375 6.96748L9.06793 4.21197C9.22679 4.03449 9.45785 3.94575 9.6889 3.94575Z" fill="url(#paint0_linear_4575_10290)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_4575_10290" x1="0.354004" y1="6.92075" x2="13.8889" y2="6.92075" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FBB90D" />
                                                <stop offset="1" stop-color="#22EBFF" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    {!hotel_details?.hotel?.adminVerified ? "Rejected" : "Approved"}</span>
                            </div>
                            <button onClick={handleEdit}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.77748 2.04544L3.02434 6.01801C2.88263 6.16887 2.74548 6.46601 2.71806 6.67173L2.54891 8.15287C2.48948 8.68773 2.87348 9.05344 3.40377 8.96201L4.87577 8.71058C5.08148 8.67401 5.36948 8.52315 5.5112 8.36773L9.26434 4.39515C9.91348 3.70944 10.2061 2.92773 9.19577 1.9723C8.19006 1.02601 7.42663 1.35973 6.77748 2.04544Z" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.1499 2.70898C6.34647 3.9707 7.37047 4.93527 8.64133 5.06327" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.08569 10.4572H10.3143" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className='text-light ms-2' >Edit</span>
                            </button>
                        </div>
                        <ul className='owner_details'>
                            <li><img src="/assets/mobile_icon.svg" alt="" /> <a href={`tel:${hotel_details?.hotel?.ownerDetails?.ownerPhone}`}>{hotel_details?.hotel?.ownerDetails?.ownerPhone}</a></li>
                            <li><img src="/assets/message_icon.svg" alt="" /> <a href={`mailto:${hotel_details?.hotel?.ownerDetails?.ownerEmail}`}>{hotel_details?.hotel?.ownerDetails?.ownerEmail}</a></li>
                            {hotel_details?.hotel?.ownerDetails?.websiteLink && <li><img src="/assets/globe_icon.svg" alt="" /> <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={hotel_details?.hotel?.ownerDetails?.websiteLink?.startsWith('http')
                                    ? hotel_details?.hotel?.ownerDetails?.websiteLink
                                    : `https://${hotel_details?.hotel?.ownerDetails?.websiteLink}`}
                            >
                                {hotel_details?.hotel?.ownerDetails?.websiteLink}
                            </Link>
                            </li>}
                        </ul>
                        <div className='hotel_image'>
                            <h5>Restaurant Photos</h5>
                            <img onClick={() => { setShow_image_preview(true); setImages(hotel_details?.hotel?.images); setIndex(0) }} src={hotel_details?.hotel?.images[0]} className='imge_one img-fluid' style={{cursor:"pointer"}} alt="" />
                            <ul className="image-grid mt-3">
                                {hotel_details?.hotel?.images?.slice(1, 5).map((image, i) => (
                                    <li
                                        onClick={() => {
                                            setShow_image_preview(true);
                                            setImages(hotel_details?.hotel?.images);
                                            setIndex(i);
                                        }}
                                        key={i}
                                        className="position-relative"
                                    >
                                        {i === 3 && hotel_details?.hotel?.images?.length > 5 && (
                                            <div className="view-more-overlay">
                                                <p className="view-more-text">View More</p>
                                            </div>
                                        )}
                                        <img src={image} className="img-fluid"  style={{cursor:"pointer"}} alt={`Hotel Image ${i + 1}`} />
                                    </li>
                                ))}
                            </ul>



                        </div>
                    </div>
                </div>
                {show_image_preview && <ImageGallery images={images} setShow_image_preview={setShow_image_preview} show_image_preview={show_image_preview} index={index} />}
                {viewDeleteModal && <DeleteModal isVisible={viewDeleteModal} onClose={closeModal} title={"Are You Sure"} message={"Do you want to cancel your subscription ?"} onConfirm={handleCancelPlan} is_subscription_deleted={is_subscription_deleted}/>}
            </div>}
        </SideBar>
    )
}

export default HotelDetailsComponent