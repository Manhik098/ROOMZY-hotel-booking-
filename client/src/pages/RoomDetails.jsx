import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setroom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setroom(room);
    room && setMainImage(room.images[0]);
  }, []);

  return (
    room && (
      <div class="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/*Room Details */}
        <div class="flex mt-6 flex-col md:flex-row items-start md:items-center gap-2">
          <h1 class="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span class="font-inter text-sm">{room.roomType}</span>
          </h1>
          <p class="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/*Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ Reviews</p>
        </div>

        {/*Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/*Room Images */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room-image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  key={index}
                  onClick={() => setMainImage(image)}
                  src={image}
                  alt="Room Image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer 
                    ${mainImage === image && "outline-3 outline-orange-500"}}`}
                />
              ))}
          </div>
        </div>

        {/*Room Highlights*/}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 class="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 "
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/*Room Price */}
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>

        {/* Chech-in Check-out Form */}
        <form class="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div class="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div class="flex flex-col">
              <label htmlFor="checkInDate" class="font-medium">
                Check-In
              </label>
              <input
                id="checkInDate"
                class="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="Check-In"
                required
                type="date"
              />
            </div>
            <div class="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div class="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div class="flex flex-col">
              <label for="checkOutDate" class="font-medium">
                Check-Out
              </label>
              <input
                id="checkOutDate"
                class="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="Check-Out"
                required
                type="date"
              />
            </div>
            <div class="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div class="flex flex-col">
              <label htmlFor="guests" class="font-medium">
                Guests
              </label>
              <input
                id="guests"
                class="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="0"
                required
                type="number"
                value="1"
              />
            </div>
          </div>
          <button
            type="submit"
            class="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            Check Availability
          </button>
        </form>

        {/*Common Specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div class="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>

        {/*Hosted By:- */}
        <div class="flex flex-col items-start gap-4">
            <div class="flex gap-4">
                <img class="h-14 w-14 md:h-18 md:w-18 rounded-full" alt="Host" src={room.hotel.owner.image}/>
                <div>
                    <p class="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
                    <div class="flex items-center mt-1">
                        <StarRating/>
                        <p class="ml-2">200+ reviews</p>
                    </div>
                </div>
            </div>
            
            <button class="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer" >Contact Now</button></div>
      </div>
    )
  );
};

export default RoomDetails;
