import React from 'react'
import SideBar from '@/Component/Sidebar/SideBar'
import '../onboarding/onboard.css'
import OnBoardingSteps from '../onboarding/onBoardingSteps'

export async function generateMetadata() {

  const metadata = {
    title: `Add new Establishment`,
    description: `Add new establishment`,
  };

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

const Page = () => {
  return (
    <SideBar>
        <div className='wrapper'>
           <h1 className='cmn-heading mb-3'>Add New Establishment</h1>
          <div className='steps_form'>
        
          <OnBoardingSteps col="col-lg-6"/>
          </div>
        </div>
    </SideBar>
  )
}

export default Page