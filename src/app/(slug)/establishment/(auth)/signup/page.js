import React from 'react'
import Image from 'next/image'
import SideImage from '@/Component/AuthComponents/sideImage'
import SignUp from '@/Component/AuthComponents/SignUp'

export async function generateMetadata() {

  const metadata = {
    title: `Establishment Create new account`,
    description: `Phloii Create new account`,
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
        <SignUp/>
        </div>
    </div>
    </div>
  )
}

export default page