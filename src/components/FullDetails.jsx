import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import house from "../../public/house3.svg";

export default function FullDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);

  const property = location.state?.property;
  const BaseUrl =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000";
  console.log(property);

  // Redirect to home if property is undefined
  if (!property) {
    navigate("/");
    return null;
  }

  const handleInterest = async () => {
    if(seller) return;
    try {
      const response = await axios.post(`${BaseUrl}/property/interest`, {
        email:property.email
      });
      console.log("res  =" ,  response);

      setSeller(response.data);
      console.log("seller = ", seller);
    } catch (error) {
      console.error(
        "There was an error expressing interest in the property:",
        error
      );
    }
  };

  return (
    <div className="fulldetpage">
      <div className="fulldet">
        <img className="img" src={house} alt="" />
        <div className="card">
          <div>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
          </div>
          <div className="sellercard">
            <span>Bedrooms: {property.bedrooms}</span>
            <span>Bathrooms: {property.bathrooms}</span>
            <span>Rent: {property.rent}</span>
          </div>
          <div>
            <button onClick={handleInterest}>I'm Interested</button>
          </div>
          <div>
            <span>{property.email != null ? property.email : ""}</span>
          </div>
          <div>
            {seller && (
              <div className="sellercard">
                <h2>Seller Details</h2>
                <p>Name: {seller.firstName}</p>
                <p>Email: {seller.email}</p>
                <p>Mobile no: {seller.phoneNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1>Reviews</h1>
      </div>
    </div>

  );
}
