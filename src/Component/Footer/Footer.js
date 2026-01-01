import React from 'react'
import './footer.css'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className={'footer'}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className='footer_logo'>
              <Image src="/assets/footer-logo.svg" width={200} height={57} className="img-fluid mb-3" alt="logo" />

            </div>

          </div>
          <div className="col-lg-8 text-center">
            <div className="footer_links">
              <div className="footer_cta">
                <h5>Quick Links</h5>
                <ul>
                  <li>

                    <Link href={'/block-contacts'}>Safety & Reporting</Link>
                  </li>
                  <li>
                    <Link href={'/cookie-policy'} >Cookie Policy</Link>
                  </li>
                  <li>
                    <Link  href={'/privacy-policy'}>Privacy Policy</Link>
                  </li>
                  <li>

                    <Link className="mb-0" href={'/child-safety-center'}>Child Safety Center</Link>
                  </li>

                </ul>


              </div>
              <div className="footer_cta">
                <h5>Help & Support</h5>
                <ul>
                  <li>

                    <Link href={'/contact-us'}>Contact Us</Link>
                  </li>
                  <li>

                    <Link href={'/help-support'}>Support</Link>
                  </li>



                </ul>


              </div>
            </div>

          </div>
        </div>
      </div>
      <p className="text-center mb-0 mt-5">© Copyright 2024 phloii.com</p>
    </footer>
  )
}

export default Footer