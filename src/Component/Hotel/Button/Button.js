import React from 'react'
import './Button.css'
const Button = ({className, text}) => {
  return (
    <button className={`${className} cmn_btn`}>{text}</button>
  )
}

export default Button