import React from 'react'
import SideBar from '@/Component/Sidebar/SideBar'
import '../onboarding/onboard.css'
const Page = () => {
  return (
    <SideBar>
        <div className='wrapper'>
           <h1 className='cmn-heading mb-3'>Add New Hotel</h1>
          <div className='steps_form'>
          <ul className="step_counter justify-content-start mt-0">
            <li>
              <span>1</span>
              <p>
                Establishment 
                details
              </p>
            </li>
          <li className="line"></li>
            <li>
              <span>2</span>
              <p>Personal  Details</p>
            </li>
            <li className="line"></li>
            <li>
              <span>3</span>
              <p>
                Why Phloii  Verified
              </p>
            </li>
          </ul>
          </div>
        </div>
    </SideBar>
  )
}

export default Page