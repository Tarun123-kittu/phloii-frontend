import React from 'react'
import HotelDetailsComponent from '@/Component/hotelDetails/HotelDetails'

const HotelDetails = ({params}) => {
    const {hotelId} = params
  return (
    <HotelDetailsComponent hotelId={hotelId}/>
  )
}

export default HotelDetails