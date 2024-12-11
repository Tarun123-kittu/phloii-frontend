import React from 'react'
import './page.css'
import SideBar from '@/Component/Sidebar/SideBar'
const page = () => {
  return (
    <SideBar>

    <div className='wrapper'>
      <div className='dashboard_wrapper'>
        <div className='dashboard_info'> 
            <div className='dashboard_head d-flex gap-3 align-items-center'>
                <img src="assets/userImage.png" alt="user" className='user_image' />
                <div className='info flex-grow-1'>
                    <h3>Celestial Star Urban Luxury hotel</h3>
                    <span><svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.2545 8.62089C8.29645 8.62089 9.14112 7.77622 9.14112 6.73427C9.14112 5.69232 8.29645 4.84766 7.2545 4.84766C6.21256 4.84766 5.36789 5.69232 5.36789 6.73427C5.36789 7.77622 6.21256 8.62089 7.2545 8.62089Z" stroke="white" strokeWidth="0.907026"/>
                            <path d="M2.19437 5.63436C3.3856 0.397798 11.1437 0.403845 12.3289 5.64041C13.0243 8.71221 11.1135 11.3123 9.43848 12.9208C8.22307 14.0939 6.30017 14.0939 5.07871 12.9208C3.40978 11.3123 1.49898 8.70616 2.19437 5.63436Z" stroke="white" strokeWidth="0.907026"/>
                            </svg>
                            123 Main Street, Suite 101...
                    </span>
                </div>
                <div className='payment_info'>
           <img src="assets/card-remove.svg" alt="payment type"/>     Payment Padding
                </div>
            </div>
            <ul className='dash-list p-0 mb-4'>
              <li>
                <span className='d-block'>Establishment Type</span>
                <strong>Hotel</strong>
              </li>
              <li>
                <span className='d-block'>Country</span>
                <strong>USA</strong>
              </li>
              <li>
                <span className='d-block'>State</span>
                <strong>California</strong>
              </li>
              <li>
                <span className='d-block'>Pin/Zip Code</span>
                <strong>92101</strong>
              </li>
              <li>
                <span className='d-block'>Suite/ Unit Number</span>
                <strong>102</strong>
              </li>
            </ul>
            <div className='info'>
              <label htmlFor="" className='info_label'>Why do you want to be on Phloii Verified?</label>
              <p>Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une seconde à du texte standard. Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. </p>
            </div>
            <div className='info'>
              <label htmlFor="" className='info_label'>What makes your restaurant unique?</label>
              <p>Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une seconde à du texte standard. Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.  </p>
            </div>
            <div className='info'>
              <label htmlFor="" className='info_label'>Are you open to having a safe word that a person can say to get help?</label>
              <p>Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition d'humour </p>
            </div>
            <div className='info'>
              <label htmlFor="" className='info_label'>Are you open to an in-person visit? If yes, when is a good time to meet?</label>
              <p>Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition seconde à du texte standard. </p>
            </div>
        </div>
        <div className='owner_info'>
        <div className='owner_head d-flex align-items-center'>
          <div className='flex-grow-1'>
            <h3>Deepak Rawat</h3>
            <span>verified</span>
          </div>
          <button><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.77748 2.04544L3.02434 6.01801C2.88263 6.16887 2.74548 6.46601 2.71806 6.67173L2.54891 8.15287C2.48948 8.68773 2.87348 9.05344 3.40377 8.96201L4.87577 8.71058C5.08148 8.67401 5.36948 8.52315 5.5112 8.36773L9.26434 4.39515C9.91348 3.70944 10.2061 2.92773 9.19577 1.9723C8.19006 1.02601 7.42663 1.35973 6.77748 2.04544Z" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.1499 2.70898C6.34647 3.9707 7.37047 4.93527 8.64133 5.06327" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.08569 10.4572H10.3143" stroke="white" strokeWidth="0.914286" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Edit</button>
        </div>
        <ul className='owner_details'>
          <li><img src="assets/mobile_icon.svg" alt="" /> <a href="">+91 1234567890</a></li>
          <li><img src="assets/message_icon.svg" alt="" /> <a href="">+91 1234567890</a></li>
          <li><img src="assets/globe_icon.svg" alt="" /> <a href="">www.celestialstarthotel.com</a></li>
        </ul>
        <div className='hotel_image'> 
          <h5>Hotel Photos</h5>
            <img src="assets/hotel_one.png" className='imge_one img-fluid' alt="" />
            <ul className='image-grid mt-3'>
              <li>   <img src="assets/hotel_one.png" className=' img-fluid' alt="" /></li>
              <li>   <img src="assets/hotel_one.png" className=' img-fluid' alt="" /></li>
              <li>   <img src="assets/hotel_one.png" className=' img-fluid' alt="" /></li>
              <li className='position-relative view_more'> <span>View More</span>  <img src="assets/hotel_one.png" className=' img-fluid' alt="" /></li>
            </ul>
        </div>
        </div>
      </div>

    </div>
    </SideBar>
  )
}

export default page