import React from 'react'
import Image from 'next/image'
import SideImage from '@/Component/AuthComponents/sideImage'
import Login from '@/Component/AuthComponents/login'

export async function generateMetadata() {

  const metadata = {
    title: `Establishment Login`,
    description: `Phloii Sign In with your establishment account`,
  };

  return {
    title: metadata.title,
    description: metadata.description,
  };
}


const page = () => {
  return (
    <div className='mh-100-vh'>
      <div className='row'>
        <div className="col-md-6 p-0 mobile_blank">
          <SideImage />
        </div>
        <div className="col-md-12 col-lg-6 p-0">
          <Login />
        </div>
      </div>
    </div>
  )
}

export default page