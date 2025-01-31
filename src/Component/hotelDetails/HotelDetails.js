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
import { toggle_sidebar } from '@/utils/redux/slices/sidebarSlice/manageSidebar'

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
    const sidebarState = useSelector((state) => state.MANAGE_SIDEBAR.isSidebarOpen);
    console.log(sidebarState,"this is from the hotel details com")

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
        const [hours, minutes] = time?.split(':').map(Number);
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

    const handleToggle = () => {    
        dispatch(toggle_sidebar(false))
    }

    return (
        <SideBar>
            {hotelDetails?.status === "Loading" ? <Loader /> : <div className='wrapper'>
                <div onClick={ () => handleToggle()} className='dashboard_wrapper'>
                    <div className={`${hotel_details?.paymentDetails?.paymentStatus != "completed" && "pt-3"} dashboard_info`}>
                        <div className={`dashboard_head d-flex gap-3 align-items-center`}>
                            <img src={hotel_details?.hotel?.images[0]} alt="user" className='user_profile_image' />
                            <div className='info flex-grow-1'>
                                <h3 className='d-flex gap-2'>{hotel_details?.hotel?.establishmentName || "Not Available"}  <span className='verified' title={hotel_details?.hotel?.adminVerified === null
                                        ? "Verification Pending"
                                        : !hotel_details?.hotel?.adminVerified
                                            ? "Verification Rejected"
                                            : "Verification Approved"}>
                                {(!hotel_details?.hotel?.adminVerified || hotel_details?.hotel?.adminVerified === null) && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_231_477)">
                                            <path d="M6.41504 0.519918C6.87473 0.182762 7.42996 0.000976562 8.00004 0.000976562C8.57012 0.000976562 9.12535 0.182762 9.58504 0.519918L10.513 1.19992C10.666 1.31292 10.843 1.38592 11.031 1.41492L12.169 1.58992C12.7322 1.67658 13.253 1.94047 13.656 2.34327C14.059 2.74607 14.3231 3.26681 14.41 3.82992L14.585 4.96792C14.614 5.15492 14.687 5.33292 14.8 5.48592L15.48 6.41392C15.8172 6.87361 15.999 7.42884 15.999 7.99892C15.999 8.569 15.8172 9.12423 15.48 9.58392L14.8 10.5119C14.6885 10.6652 14.6148 10.8427 14.585 11.0299L14.41 12.1679C14.3233 12.7312 14.0593 13.2522 13.6563 13.6552C13.2533 14.0582 12.7323 14.3222 12.169 14.4089L11.031 14.5839C10.8438 14.6137 10.6663 14.6873 10.513 14.7989L9.58504 15.4789C9.12535 15.8161 8.57012 15.9979 8.00004 15.9979C7.42996 15.9979 6.87473 15.8161 6.41504 15.4789L5.48704 14.7989C5.33378 14.6873 5.15627 14.6137 4.96904 14.5839L3.83004 14.4099C3.26708 14.3231 2.74644 14.0591 2.34365 13.6563C1.94087 13.2535 1.6769 12.7329 1.59004 12.1699L1.41504 11.0319C1.3853 10.8447 1.31162 10.6672 1.20004 10.5139L0.52004 9.58592C0.182884 9.12623 0.00109863 8.571 0.00109863 8.00092C0.00109863 7.43084 0.182884 6.87561 0.52004 6.41592L1.20004 5.48792C1.31162 5.33466 1.3853 5.15714 1.41504 4.96992L1.59004 3.82992C1.6769 3.26696 1.94087 2.74631 2.34365 2.34353C2.74644 1.94075 3.26708 1.67678 3.83004 1.58992L4.96804 1.41492C5.15504 1.38592 5.33304 1.31292 5.48604 1.19992L6.41504 0.519918ZM8.69704 1.72892C8.4948 1.58087 8.25068 1.50107 8.00004 1.50107C7.7494 1.50107 7.50528 1.58087 7.30304 1.72892L6.37504 2.40892C6.02648 2.66395 5.62182 2.83164 5.19504 2.89792L4.05904 3.07192C3.81093 3.11006 3.58145 3.22633 3.40395 3.40383C3.22645 3.58133 3.11018 3.81081 3.07204 4.05892L2.89804 5.19592C2.83176 5.6227 2.66407 6.02736 2.40904 6.37592L1.72904 7.30292C1.42404 7.71792 1.42404 8.28292 1.72904 8.69692L2.40904 9.62492C2.66504 9.97292 2.83204 10.3769 2.89804 10.8049L3.07204 11.9409C3.15004 12.4509 3.55004 12.8499 4.05904 12.9279L5.19604 13.1019C5.62304 13.1679 6.02704 13.3349 6.37604 13.5909L7.30304 14.2709C7.71804 14.5759 8.28304 14.5759 8.69704 14.2709L9.62504 13.5909C9.9736 13.3359 10.3783 13.1682 10.805 13.1019L11.941 12.9279C12.451 12.8499 12.85 12.4499 12.928 11.9409L13.102 10.8039C13.168 10.3769 13.335 9.97292 13.591 9.62392L14.271 8.69692C14.576 8.28192 14.576 7.71692 14.271 7.30292L13.591 6.37492C13.336 6.02636 13.1683 5.6217 13.102 5.19492L12.928 4.05892C12.8899 3.81081 12.7736 3.58133 12.5961 3.40383C12.4186 3.22633 12.1891 3.11006 11.941 3.07192L10.804 2.89792C10.3773 2.83164 9.9726 2.66395 9.62404 2.40892L8.69704 1.72892ZM6.92004 6.08492C6.83027 6.26129 6.67542 6.39503 6.48747 6.45699C6.29952 6.51895 6.0947 6.50412 5.91763 6.41572C5.74057 6.32732 5.60563 6.17252 5.5422 5.98506C5.47878 5.7976 5.49202 5.59266 5.57904 5.41492C5.74804 5.07592 6.01504 4.71392 6.42804 4.43792C6.84604 4.15992 7.36904 3.99992 8.00004 3.99992C8.58802 3.99597 9.1619 4.1799 9.63804 4.52492C10.14 4.90192 10.5 5.48992 10.5 6.24992C10.5 6.69792 10.385 7.07992 10.171 7.39992C9.96604 7.70692 9.70104 7.91292 9.47904 8.06192C9.37004 8.13392 9.25904 8.19992 9.16604 8.25692L9.16004 8.26092C9.07203 8.31204 8.98534 8.36539 8.90004 8.42092C8.79364 8.48475 8.70004 8.56784 8.62404 8.66592C8.5127 8.82902 8.34152 8.94163 8.14766 8.97929C7.9538 9.01695 7.75291 8.97664 7.58859 8.86709C7.42427 8.75755 7.30979 8.58762 7.27 8.39419C7.2302 8.20075 7.26831 7.99943 7.37604 7.83392C7.56004 7.56992 7.79604 7.34492 8.06804 7.17292C8.17704 7.09992 8.28804 7.03392 8.38104 6.97792L8.38804 6.97392C8.48804 6.91292 8.57004 6.86392 8.64604 6.81292C8.7528 6.74918 8.84674 6.6661 8.92304 6.56792C8.96004 6.51392 9.00004 6.42692 9.00004 6.24992C9.00402 6.14744 8.9821 6.04561 8.93631 5.95385C8.89051 5.86208 8.82232 5.78335 8.73804 5.72492C8.52133 5.5752 8.26342 5.49657 8.00004 5.49992C7.63104 5.49992 7.40504 5.58992 7.26004 5.68692C7.11338 5.78704 6.99602 5.92442 6.92004 6.08492ZM9.00004 10.9999C9.00004 11.2651 8.89468 11.5195 8.70715 11.707C8.51961 11.8946 8.26526 11.9999 8.00004 11.9999C7.73482 11.9999 7.48047 11.8946 7.29293 11.707C7.1054 11.5195 7.00004 11.2651 7.00004 10.9999C7.00004 10.7347 7.1054 10.4803 7.29293 10.2928C7.48047 10.1053 7.73482 9.99992 8.00004 9.99992C8.26526 9.99992 8.51961 10.1053 8.70715 10.2928C8.89468 10.4803 9.00004 10.7347 9.00004 10.9999Z" fill="#FBC42E"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_231_477">
                                            <rect width="16" height="16" fill="white"/>
                                            </clipPath>
                                            </defs>
                                            </svg>}

                                    {hotel_details?.hotel?.adminVerified && <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="6.99854" cy="7" r="6" fill="white" />
                                
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0.790939 4.91769L1.17092 4.70909C1.4901 4.53029 1.6573 4.17269 1.5661 3.8449L1.4901 3.4277C1.39891 2.936 1.77889 2.4741 2.28047 2.4443L2.72125 2.4145C3.08603 2.3996 3.40522 2.1463 3.49641 1.8036L3.61801 1.3864C3.7548 0.894704 4.28678 0.641404 4.75796 0.835106L5.16833 0.999002C5.50272 1.1331 5.8827 1.04371 6.1259 0.775507L6.4147 0.447706C6.74907 0.0603074 7.34184 0.0603074 7.6762 0.417906L7.965 0.745708C8.20818 1.01391 8.6034 1.08841 8.93777 0.954303L9.39372 0.790407C9.86491 0.596706 10.4121 0.850005 10.5489 1.32681L10.6705 1.744C10.7617 2.0867 11.0808 2.3251 11.4457 2.34L11.8864 2.3549C12.4032 2.3698 12.7832 2.8317 12.692 3.3234L12.616 3.74059C12.5552 4.0833 12.7376 4.44089 13.0568 4.60479L13.4368 4.81339C13.8775 5.03689 14.0143 5.61799 13.7256 6.02026L13.4672 6.37787C13.2544 6.66097 13.2544 7.06329 13.4672 7.3464L13.7256 7.68906C14.0295 8.09138 13.8927 8.67248 13.4519 8.91086L13.0719 9.11947C12.7528 9.2983 12.5856 9.64096 12.6464 9.99856L12.7224 10.4158C12.8136 10.9075 12.4336 11.3694 11.932 11.3992L11.4912 11.429C11.1265 11.4439 10.8073 11.6972 10.7161 12.0398L10.5945 12.4571C10.4577 12.9488 9.9257 13.202 9.45452 13.0084L9.04413 12.8445C8.70976 12.7104 8.32977 12.7998 8.08659 13.068L7.79779 13.3958C7.46342 13.7831 6.85548 13.7831 6.52106 13.4106L6.23226 13.0829C5.9891 12.8147 5.59391 12.7402 5.25953 12.8743L4.84915 13.0382C4.37797 13.2319 3.8308 12.9785 3.69401 12.5018L3.57241 12.0846C3.48122 11.7419 3.16203 11.5035 2.79725 11.4886L2.35647 11.4737C1.83969 11.4587 1.45971 10.9969 1.5509 10.5052L1.6269 10.088C1.6877 9.74529 1.5053 9.38768 1.18612 9.2238L0.806139 9.01519C0.365359 8.7917 0.228566 8.2106 0.517352 7.80828L0.77574 7.45067C0.98853 7.16757 0.98853 6.7653 0.77574 6.4822L0.517352 6.13948C0.213366 5.73721 0.35016 5.15609 0.790939 4.91769Z"
                                                fill="url(#paint0_linear_4575_10290)"
                                            />
                                      
                                        <defs>
                                            <linearGradient id="paint0_linear_4575_10290" x1="0.354004" y1="6.92075" x2="13.8889" y2="6.92075" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FBB90D" />
                                                <stop offset="1" stopColor="#22EBFF" />
                                            </linearGradient>
                                        </defs>
                                    </svg>}
                                    {/* {hotel_details?.hotel?.adminVerified === null
                                        ? "Pending"
                                        : !hotel_details?.hotel?.adminVerified
                                            ? "Rejected"
                                            : "Approved"} */}
                                </span></h3>
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
                                {/* <div className={hotel_details?.paymentDetails?.paymentStatus === "completed" ? "payment_info payment_success" : 'payment_info '}>
                                    <img src="/assets/card-remove.svg" alt="payment type" /> Payment {hotel_details?.paymentDetails?.paymentStatus === "completed" ? "Completed" : hotel_details?.paymentDetails?.paymentStatus === "canceled" ? "Canceled " : "Pending"}
                                </div> */}
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
                        <ul className='dash-list p-0 mb-4 text-start'>
                            {hotel_details?.hotel?.establishmentType && (
                                <li>
                                    <span className='d-block'>Establishment Type</span>
                                    <strong className='mb-2 d-block'> {hotel_details?.hotel?.establishmentType}</strong>

                                </li>
                            )}
                            {hotel_details?.hotel?.address?.country && (
                                <li>
                                    <span className='d-block'>Country</span>
                                    <strong className='mb-2 d-block'> {hotel_details?.hotel?.address?.country}</strong>
                                    <span className='d-block'>Payment Status</span>
                                    <strong className='mb-2 d-block'> 
                                        {hotel_details?.paymentDetails?.paymentStatus === 'completed'
                                            ? 'Completed'
                                            : hotel_details?.paymentDetails?.paymentStatus === 'canceled'
                                                ? 'Canceled'
                                                : 'Pending'}
                                    </strong>
                                </li>
                            )}
                            {hotel_details?.hotel?.address?.state && (
                                <li>
                                    <span className='d-block'>State</span>
                                    <strong className='mb-2 d-block'> {hotel_details?.hotel?.address?.state}</strong>
                                    {hotel_details?.hotel?.openCloseTimings && (
                                        <>
                                            <span className='d-block'>Open & Close Timing</span>
                                            <strong className='mb-2 d-block'> 
                                                {formatTime(hotel_details?.hotel?.openCloseTimings?.open)} -{' '}
                                                {formatTime(hotel_details?.hotel?.openCloseTimings?.close)}
                                            </strong>
                                        </>
                                    )}
                                </li>
                            )}
                            {hotel_details?.hotel?.address?.pinCode && (
                                <li>
                                    <span className='d-block'>Pin/Zip Code</span>
                                    <strong className='mb-2 d-block'> {hotel_details?.hotel?.address?.pinCode}</strong>
                                    {hotel_details?.hotel?.customerServiceNumber && (
                                        <>
                                            <span className='d-block'>Customer Service Number</span>
                                            <strong className='mb-2 d-block'> {hotel_details?.hotel?.customerServiceNumber}</strong>
                                        </>
                                    )}
                                </li>
                            )}
                            {hotel_details?.hotel?.address?.suiteUnitNumber && (
                                <li>
                                    <span className='d-block'>Suite/Unit Number</span>
                                    <strong className='mb-2 d-block'> {hotel_details?.hotel?.address?.suiteUnitNumber}</strong>
                                    <span className='d-block'>City</span>
                                    <strong className='mb-2 d-block'> {hotel_details?.hotel?.address?.city}</strong>
                                </li>
                            )}
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
                               
                            </div>
                            <button onClick={handleEdit}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.77748 2.04544L3.02434 6.01801C2.88263 6.16887 2.74548 6.46601 2.71806 6.67173L2.54891 8.15287C2.48948 8.68773 2.87348 9.05344 3.40377 8.96201L4.87577 8.71058C5.08148 8.67401 5.36948 8.52315 5.5112 8.36773L9.26434 4.39515C9.91348 3.70944 10.2061 2.92773 9.19577 1.9723C8.19006 1.02601 7.42663 1.35973 6.77748 2.04544Z" stroke="white" strokeWidth="0.914286" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.1499 2.70898C6.34647 3.9707 7.37047 4.93527 8.64133 5.06327" stroke="white" strokeWidth="0.914286" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.08569 10.4572H10.3143" stroke="white" strokeWidth="0.914286" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
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
                            <img onClick={() => { setShow_image_preview(true); setImages(hotel_details?.hotel?.images); setIndex(0) }} src={hotel_details?.hotel?.images[0]} className='imge_one img-fluid' style={{ cursor: "pointer" }} alt="" />
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
                                        <img src={image} className="img-fluid" style={{ cursor: "pointer" }} alt={`Hotel Image ${i + 1}`} />
                                    </li>
                                ))}
                            </ul>



                        </div>
                    </div>
                </div>
                {show_image_preview && <ImageGallery images={images} setShow_image_preview={setShow_image_preview} show_image_preview={show_image_preview} index={index} />}
                {viewDeleteModal && <DeleteModal isVisible={viewDeleteModal} onClose={closeModal} title={"Are You Sure"} message={"Do you want to cancel your subscription ?"} onConfirm={handleCancelPlan} is_subscription_deleted={is_subscription_deleted} />}
            </div>}
        </SideBar>
    )
}

export default HotelDetailsComponent