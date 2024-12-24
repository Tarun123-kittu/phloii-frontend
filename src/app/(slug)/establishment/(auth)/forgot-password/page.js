import React from 'react'
import SideImage from '@/Component/AuthComponents/sideImage'
import ForgotPassword from '@/Component/AuthComponents/ForgotPassword'

export async function generateMetadata() {

  const metadata = {
    title: `Establishment Forgot Password`,
    description: `Phloii forgot passoword`,
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
        <div className="col-md-6 p-0">
        <SideImage/>
        </div>
        <div className="col-md-6 p-0">
        <ForgotPassword/>
        </div>
    </div>
    </div>
  )
}

export default page