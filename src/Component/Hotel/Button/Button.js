import React from 'react'
import './Button.css'
const Button = ({ className, text, buttonClick, loading }) => {
  return (
  
       <button onClick={(e) => buttonClick(e)} className={`${className} cmn_btn`}>{text}  {loading?.status === "Loading" && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}</button>
   
  
  )
}

export default Button