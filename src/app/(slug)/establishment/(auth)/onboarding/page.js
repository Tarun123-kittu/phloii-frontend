'use client'
import React from "react";
import Image from "next/image";
import "./onboard.css";

import OnBoardingSteps from "./onBoardingSteps";
const Page = () => {
  // const dispatch = useDispatch()
  // const router = useRouter()
  // const [step, setStep] = useState(1)
  // // establishmentname,establishedtype,streetaddress,country,state,pincode,ownername,ownerphone,owneremail,whyphloii,unoquefeatures,inpersonvisit,images
  // const [establishmentname, setEstablishmentname] = useState('')
  // const [establishedtype, setEstablishedtype] = useState('')
  // const [streetaddress, setStreetAddress] = useState('')
  // const [unitNumber, setUnitNumber] = useState('')
  // const [country, setCountry] = useState('')
  // const [state, setState] = useState('')
  // const [pincode, setPincode] = useState('')
  // const [ownername, setOwnername] = useState('')
  // const [ownerPhone, setOwnerPhone] = useState('')
  // const [websiteLink, setWebsiteLink] = useState('')
  // const [owneremail, setOwnerEmail] = useState('')
  // const [whyphloii, setWhyphloii] = useState('')
  // const [uniquefeatures, setUniqueFeatures] = useState('')
  // const [inpersonvisit, setInpersonvisit] = useState('')
  // const [safeWord, setSafeWord] = useState('')
  // const [images, setImages] = useState([])
  // const all_countries = useSelector((store) => store.ALL_COUNTRIES?.data?.data)
  // const is_hotel_verified = useSelector((store) => store.ONBOARD_HOTEl)

  // useEffect(() => {
  //   dispatch(get_countries())
  // }, [])

  // const handleOnboardHotel = () => {
  //   dispatch(onboard_hotel({
  //     establishmentname: establishmentname,
  //     establishedtype: establishedtype,
  //     streetaddress: streetaddress,
  //     unitNumber: unitNumber,
  //     country: country,
  //     state: state,
  //     pincode: pincode,
  //     ownername: ownername,
  //     ownerphone: ownerPhone,
  //     webSitelink: websiteLink,
  //     owneremail: owneremail,
  //     whyphloii: whyphloii,
  //     uniquefeatures: uniquefeatures,
  //     safeWord: safeWord,
  //     inpersonvisit: inpersonvisit,
  //     images: images,
  //   }))
  // }

  // useEffect(() => {
  //   if (is_hotel_verified.status === "Success") {
  //     toast.success(is_hotel_verified?.data?.message)
  //     router.push("establishment")
  //     dispatch(clear_onboard_hotel_state())
  //   }
  //   if(is_hotel_verified.status === "Error"){
  //     toast.error(is_hotel_verified.error.message)
  //     dispatch(clear_onboard_hotel_state())
  //   }
  // }, [is_hotel_verified])
  return (
    <div className="onboard_wrapper">
      <div className={"header-card"}>
        <Image src="/assets/logo.svg" width={139} height={57} alt="logo" />
      </div>
      <div className="board_form">
        <div className="auth_form m-auto">
          <h2 className="main_heading text-center mt-2 mb-4">Registration Form</h2>
          <p className="sort_desc text-center text-white">
            Please fill out this form with the required information
          </p>
          {/* <ul className="step_counter">
            <li>
              <span>1</span>
              <p>
                Establishment <br />
                details
              </p>
            </li>
            <li className="line"></li>
            <li>
              <span>2</span>
              <p>Personal <br /> Details</p>
            </li>
            <li className="line"></li>
            <li>
              <span>3</span>
              <p>
                Why Phloii <br /> Verified
              </p>
            </li>
          </ul> */}
        </div>
       <OnBoardingSteps col="col-lg-12"/>
      </div>
    </div>
  );
};

export default Page;
