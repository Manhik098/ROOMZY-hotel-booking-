import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({room,index}) => {
  return (
    <>
        <Link to={'/rooms/'+ room._id} onClick={()=>scrollTo(0,0)} key={room._id}
            class="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
        >
            <img src={room.images[0]} alt='' />
            {index%2==0 && <p class="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">Best Seller</p>}
            <div class="p-4 pt-5">
                <div class="flex items-center justify-between">
                    <p class="font-playfair text-xl font-medium text-gray-800">{room.hotel.name}</p>
                    <div class="flex items-center gap-1">
                        <img src={assets.starIconFilled} alt="star-icon" /> 4.5 
                    </div>
                </div>
                <div class="flex items-center gap-1 text-sm">
                    <img src={assets.locationIcon} alt="location-icon" />
                    <span>{room.hotel.address}</span>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <p><span class="text-xl text-gray-800">${room.pricePerNight}</span>/night</p>
                    <button class="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">Book Now</button>
                </div>
            </div>
        </Link>
    </>
  )
}

export default HotelCard
