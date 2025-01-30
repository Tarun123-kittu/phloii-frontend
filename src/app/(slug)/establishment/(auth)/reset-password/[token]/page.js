import React from 'react'
import SideImage from '@/Component/AuthComponents/sideImage'
import ResetPassword from '@/Component/AuthComponents/ResetPassword'

export async function generateMetadata() {

  const metadata = {
    title: `Establishment Reset Password`,
    description: `Phloii Reset passoword`,
  };

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

const page = ({params}) => {
  const {token} = params
  return (
    <div className='mh-100-vh'> 
    <div className='row m-0'>
        <div className="col-md-6 p-0 mobile_blank">
        <SideImage/>
        </div>
        <div className="col-md-12 col-lg-6 p-0">
        <ResetPassword token={token}/>
        </div>
    </div>
    </div>
  )
}

export default page