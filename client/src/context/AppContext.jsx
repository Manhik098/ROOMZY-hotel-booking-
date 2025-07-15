import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";


// Set Axios base URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true; // ✅ ADD THIS LINE


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true); // 👈 track loading
  const [rooms,setRooms]=useState([])

  const fetchRooms = async () => {
  try {
    const token = await getToken();
    console.log("👉 Token:", token); // ✅ Add this

    const { data } = await axios.get("/api/rooms", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Add only if token exists
      },
      withCredentials: true,
    });

    console.log("✅ Got rooms:", data);
    setRooms(data.rooms);
  } catch (error) {
    console.error("❌ fetchRooms error:", error); // ✅ Catch real reason
    toast.error(error.message || "Failed to fetch rooms");
  }
};



const fetchUser = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setIsOwner(data.role === "hotelOwner");
      setSearchedCities(data.recentSearchedCities || []);
    }
  } catch (error) {
    toast.error("Failed to fetch user info");
    console.error("fetchUser error:", error);
  } finally {
    setLoadingUser(false);
  }
};



  useEffect(() => {
    if (user) {
      console.log("👤 User found, fetching user info...");
      fetchUser();
    } else {
      console.log("🚫 No user found");
      setLoadingUser(false);
    }
  }, [user]);
  
  useEffect(() => {
      fetchRooms();
    
  }, []);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    loadingUser,
    rooms,
    setRooms
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
