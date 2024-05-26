import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MyProperty from "./MyProperty";
export default function SellerProfile() {
    // const user = useUser(state=>state.user);
    const [myProperties , setMyProperties] = useState([]);
    const BaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000"
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    useEffect(()=>{
        console.log("stored user = " , storedUser);
        if(storedUser == null)navigate("/")
    },[storedUser])
    const user = JSON.parse(storedUser);
    const role = user.role;
    console.log("role = " , role);
    const Useremail = JSON.parse(storedUser).email;

    

    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        rent: '',
        email:Useremail,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    useEffect(()=>{

        // console.log("user ,", user);

        const fetchdata = async ()=>{
            const res = await axios.post(`${BaseUrl}/getMyProperties` , {
                email : Useremail
            })
            // console.log("res =", res);
            setMyProperties(res.data);
        }

        fetchdata()

    } , [])

    const handleLogout = ()=>{
        localStorage.removeItem('user');
        navigate("/login")
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("form = " , form);
        try {
            const res = await axios.post(`${BaseUrl}/properties` , {form})
            console.log("res.data =", res.data);
            if(res.data){
                setMyProperties([...myProperties , res.data])
            }
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className="top">
        <div>
            <button className="logout" onClick={handleLogout}>Log Out</button>
        </div>
        <div>
            <div>
            {
                myProperties.length>0 ?
                myProperties.map((property , index)=>(
                    <div key={index}>
                    <MyProperty
                      title={property.title}
                      location={property.location}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                      description={property.description}
                      rent={property.rent}
                      email={property.email != null ? property.email : ""}
                      uuid={property.uuid}
                      myProperties={myProperties} 
                      setMyProperties={setMyProperties}
                    />
                  </div>
                )):""
            }
            </div>
            <div>
            {role==='seller'?
                (<form onSubmit={handleSubmit} className='regform'>
            <div className='inputGroup'>
                <input type="text" name="title" placeholder='Title' value={form.title} onChange={handleChange} />
            </div>
            <div>
                <input type="textarea" name="description" placeholder='Description' value={form.description} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="location" placeholder='Location' value={form.location} onChange={handleChange} />
            </div>
            <div>
                <input type="number" name="bedrooms" placeholder='Number Of Bed Rooms' value={form.bedrooms} onChange={handleChange} />
            </div>
            <div>
                <input type="number" name="bathrooms" placeholder='Number Of Bath Rooms' value={form.bathrooms} onChange={handleChange} />
            </div>
            <div>
                <input type="number" name="rent" placeholder='Rent' value={form.rent} onChange={handleChange} />
            </div>

            <button type="submit">Add Property</button>
        </form>):""}
            </div>
        </div>

    </div>
  )
}
