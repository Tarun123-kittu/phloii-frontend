import React from 'react'
import SideBar from '@/Component/Sidebar/SideBar'
import '../../../onboarding/onboard.css'
import OnBoardingSteps from '../../../onboarding/onBoardingSteps'

export async function generateMetadata({ params }) {
  const { hotelId, name } = params;
  const decodedName = decodeURIComponent(name)

  const metadata = {
      title: `${decodedName}`,
      description: `Find details about hotel ${decodedName}. Discover amenities, reviews, and more.`,
  };

  return {
      title: metadata.title,
      description: metadata.description,
  };
}

const Page = ({ params }) => {
  const { hotelId } = params
  return (
    <SideBar>
      <div className='wrapper'>
        <h1 className='cmn-heading mb-3'>Edit Establishment</h1>
        <div className='steps_form'>

          <OnBoardingSteps col="col-lg-6" hotelId={hotelId} />
        </div>
      </div>
    </SideBar>
  )
}

export default Page