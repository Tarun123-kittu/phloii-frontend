import React from 'react'
import SideBar from '@/Component/Sidebar/SideBar'
import '../../onboarding/onboard.css'
import OnBoardingSteps from '../../onboarding/onBoardingSteps'
const Page = ({params}) => {
  const {hotelId} = params
  return (
    <SideBar>
      <div className='wrapper'>
        <h1 className='cmn-heading mb-3'>Edit Hotel</h1>
        <div className='steps_form'>

          <OnBoardingSteps col="col-lg-6" hotelId={hotelId}/>
        </div>
      </div>
    </SideBar>
  )
}

export default Page