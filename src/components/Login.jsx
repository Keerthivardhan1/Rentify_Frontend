import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../store';
import { useNavigate } from 'react-router-dom';
import house from '../../public/house2.svg'

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const setUser = useUser(state => state.setUser);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // eslint-disable-next-line no-undef
    const BaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000"

    useEffect(()=>{
        const user = localStorage.getItem("user");
    if(user){
        navigate("/home")
    } 
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BaseUrl}/login`, form)
            .then(response => {
                console.log('Logged in successfully!', response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                navigate("/home")
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
            });
    };

    return (
        <div className='registerpage'>
            <form onSubmit={handleSubmit}>
            <div>
                <input type="email" name="email" placeholder='Email' value={form.email} onChange={handleChange} />
            </div>
            <div>
                <input type="password" name="password" placeholder='Password' value={form.password} onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
        </form>
        <img className='img' src={house} alt="" />
        </div>
    );
};

export default Login;
