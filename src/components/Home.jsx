import { useEffect, useState } from "react";
import { useUser } from "../store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Property from "./Property";
import SellerProfile from "./SellerProfile";

export default function Home() {
  const user = useUser((state) => state.user);
  const navigate = useNavigate();
  const setUser = useUser((state) => state.setUser);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const BaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000";

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("stored user = ", storedUser);
    if (!user && storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (!storedUser) {
      navigate("/");
    }
  }, [user, navigate, setUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/properties`);
        setProperties(res.data); // Ensure you correctly update the state with the resolved data
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  const sortProperties = (order) => {
    const sortedProperties = [...properties].sort((a, b) => {
      if (order === "lowToHigh") {
        return a.rent - b.rent;
      } else if (order === "highToLow") {
        return b.rent - a.rent;
      }
      return 0;
    });
    setProperties(sortedProperties);
  };

  const handleToggle = () => {
    const newSortOrder = sortOrder === "lowToHigh" ? "highToLow" : "lowToHigh";
    setSortOrder(newSortOrder);
    sortProperties(newSortOrder);
  };

  return (
    <div className="home">
      <div className="top">
        <div className="topdiv">
        {/* <h2 >Find Your Best Feel</h2> */}
        <Link className="profile" to={"/myprofile"}>Profile</Link>
        </div>
        <div>
          <button onClick={handleToggle}>
            Sort by Rent:{" "}
            {sortOrder === "lowToHigh" ? "Low to High" : "High to Low"}
          </button>
        </div>
      </div>
      <div>
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <div key={index}>
              <Property
                title={property.title}
                location={property.location}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                description={property.description}
                rent={property.rent}
                email={property.email != null ? property.email : ""}
                uuid={property.uuid}
              />
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>
    </div>
  );
}
