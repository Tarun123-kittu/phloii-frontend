import React from 'react'
import './Button.css'
const Button = ({ className, text, buttonClick, loading }) => {
  return (
    <>
      {loading?.status !== "Loading" && <button onClick={(e) => buttonClick(e)} className={`${className} cmn_btn`}>{text}</button>}
      {loading?.status === "Loading" && <button className={`${className} cmn_btn`}>Updating</button>}
    </>
  )
}

export default Button