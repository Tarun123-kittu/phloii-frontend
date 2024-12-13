import React from 'react'
import './Button.css'
const Button = ({className, text, buttonClick}) => {
  return (
    <button onClick={(e)=>buttonClick(e)} className={`${className} cmn_btn`}>{text}</button>
  )
}

export default Button