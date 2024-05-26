import  {  useState } from 'react';
import axios from 'axios';
import { useUser } from '../store';
import {Link, useNavigate} from 'react-router-dom'
import house from '../../public/house.svg'

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'buyer'
    });

    const navigate = useNavigate();
    const BaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000";
    
    // useEffect(()=>{
    //     const user = localStorage.getItem("user");
    // if(user){
    //     navigate("/home")
    // }
    // }, [])


    const setUser = useUser(state => state.setUser);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BaseUrl}/register`, form)
            .then(response => {
                console.log('Registered successfully!', response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                navigate("/home")
            })
            .catch(error => {
                console.error('There was an error registering!', error);
            });
    };

    return (
        <div className='registerpage'>
            <form onSubmit={handleSubmit} className='regform'>
            <div className='inputGroup'>
                <input type="text" name="firstName" placeholder='First Name' value={form.firstName} onChange={handleChange} />
                {/* <label>First Name:</label> */}
            </div>
            <div>
                <input type="text" name="lastName" placeholder='Last Name' value={form.lastName} onChange={handleChange} />
            </div>
            <div>
                <input type="email" name="email" placeholder='Email' value={form.email} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="phoneNumber" placeholder='Phone Number' value={form.phoneNumber} onChange={handleChange} />
            </div>
            <div>
                <input type="password" name="password" placeholder='Password' value={form.password} onChange={handleChange} />
            </div>
            <div className='role' >
                <label>Role:</label>
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
            </div>
            <button type="submit">Register</button>
            <div>
                Already registerd. . . <Link to={"/login"} >Login</Link>
            </div>
        </form>
        <img className='img regimg' src={house} alt="" />
        </div>
    );
};

export default Register;
