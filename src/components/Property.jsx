/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function Property(props) {

  const navigate = useNavigate();
  const user = localStorage.getItem('user')
  const role = JSON.parse(user).role;
  const BaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000";

  

  const handleMore = ()=>{
    navigate("/fullDetails" ,  { state: { property: props } })
  }

  const handleDelete = async (uuid)=>{
    if(!props.setMyProperties) return;
    try {
      const res = await axios.delete(`${BaseUrl}/properties/${uuid}`);
      console.log("Delete response =", res.data);
      props.setMyProperties(props.myProperties.filter(property => property.uuid !== uuid));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  }
  return (
    <div className="property">
        <h2>{props.title}</h2>
        <div className="propertydiv2">
          <div className="propleft">
           <span><label>Location : </label> {props.location}</span>
            <span><label>Bedrooms : </label> {props.bedrooms}</span>
          </div>
            <button onClick={handleMore} >More</button>
        </div>
    </div>
  )
}
