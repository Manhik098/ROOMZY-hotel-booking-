// import React, { useEffect, useState } from "react";
// import HotelCard from "./Hotelcard";
// import Title from "./Title";
// import { useAppContext } from "../context/AppContext";

// const RecommendedHotels = () => {
//   const { rooms, searchedCities } = useAppContext();
//   const [recommended, setRecommended] = useState([]);

//   const filterHotels = () => {
//   const normalizedCities = searchedCities.map((city) =>
//     city.trim().toLowerCase()
//   );

//   const filteredHotels = rooms.filter((room) =>
//     room?.hotel?.city &&
//     normalizedCities.includes(room.hotel.city.trim().toLowerCase())
//   );

//   console.log("🏨 Filtered Hotels:", filteredHotels);
//   setRecommended(filteredHotels);
// };


//   useEffect(() => {
//     if (rooms.length && searchedCities.length) {
//       filterHotels();
//     }
//   }, [rooms, searchedCities]);

//   return recommended.length > 0 ? (
//     <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
//       <Title
//         title="Recommended Hotels"
//         subTitle="Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Discover your escape, and start your journey today."
//       />

//       <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
//         {recommended.slice(0, 4).map((room, index) => (
//           <HotelCard key={room._id} room={room} index={index} />
//         ))}
//       </div>
//     </div>
//   ) : null;
// };

// export default RecommendedHotels;
