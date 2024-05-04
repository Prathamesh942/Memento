import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/v1/users/login", {
                username: username,
                password: password
            }, {
                withCredentials: true // Send cookies with the request
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
  return (
    <main className=' w-screen h-screen flex justify-center items-center bg-[#fff7fe]'>
        <div className=' flex aspect-video w-[60vw] border-2 border-zinc-400 rounded-lg shadow-xl bg-white'>
            <div className=' flex-1 flex justify-center items-center border-r border-zinc-200 '>
                <img className=' w-[70%] h-[70%] object-cover' src="https://i.pinimg.com/564x/09/a6/f2/09a6f2e96136c6072d939f679c435785.jpg" alt="" />
            </div>
            <div className=' flex-1 flex flex-col justify-center items-center'>
                <h1 className=' flex-1 flex justify-center items-end text-3xl font-semibold'>Welcome Back!</h1>
                <form className=' w-[60%] flex flex-[6] flex-col gap-10 justify-center items-center'>
                    <input onChange={(e)=>{setUsername(e.target.value)}} className=' border-b border-zinc-500 text-lg p-1' type="text" placeholder='Username' />
                    <input onChange={(e)=>{setPassword(e.target.value)}} className=' border-b border-zinc-500 text-lg p-1' type="text" placeholder='Password' />
                    <div className=' w-[100%] flex flex-col items-center justify-center'>
                        <button onClick={handleLogin} className=' bg-zinc-600 text-white w-[100%] py-2 rounded-md my-5'>Login</button>
                        <Link to={"/register"}> <span className=' text-sm text-zinc-400 text-center'>Don't have an account?</span></Link>
                    </div>
                    

                </form>
            </div>
        </div>
    </main>
  )
}

export default Login