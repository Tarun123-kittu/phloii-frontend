import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './header.css'
const Header = () => {
  return (
    <header className={'header'}>
    <div className="container">

   <div className="d-flex justify-content-between align-items-center">
   <Link href="/" className="cursor-pointer"><Image src="/assets/logo.svg" width={139} height={57} alt="logo" /></Link> <Link href={'/establishment/login'} target='_blank' className={"rister_est"}>Register Establishment</Link>
   </div>
    </div>
  </header>
  )
}

export default Header