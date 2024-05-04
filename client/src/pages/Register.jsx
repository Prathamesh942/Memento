import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e)=>{
        e.preventDefault();
        try {
            console.log("hii");
            const res = await axios.post("http://localhost:3000/api/v1/users/register", {username, email, password});
            console.log(res);
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }
  return (
    <main className=' w-screen h-screen flex justify-center items-center bg-[#fff7fe]'>
        <div className=' flex flex-row-reverse aspect-video w-[60vw] border-2 border-zinc-400 rounded-lg shadow-xl bg-white'>
            <div className=' flex-1 flex justify-center items-center border-l border-zinc-200 '>
                <img className=' w-[70%] h-[70%] object-cover' src="https://cdn.dribbble.com/users/1537480/screenshots/7187709/media/0f57b370e5555c4018dac4983a2bf340.png?resize=1000x750&vertical=center" alt="" />
            </div>
            <div className=' flex-1 flex flex-col justify-center items-center'>
                <h1 className=' flex-1 flex justify-center items-end text-3xl font-semibold'>Let's begin!</h1>
                <form className=' w-[60%] flex flex-[6] flex-col gap-10 justify-center items-center'>
                    <input onChange={(e)=>{setUsername(e.target.value)}} className=' border-b border-zinc-500 text-lg p-1' type="text" placeholder='Username' />
                    <input onChange={(e)=>{setEmail(e.target.value)}} className=' border-b border-zinc-500 text-lg p-1' type="text" placeholder='Email' />
                    <input onChange={(e)=>{setPassword(e.target.value)}} className=' border-b border-zinc-500 text-lg p-1' type="text" placeholder='Password' />
                    <div className=' w-[100%] flex flex-col  items-center justify-center'>
                        <button onClick={handleRegister} className=' bg-zinc-600 text-white w-[100%] py-2 rounded-md my-5'>Register</button>
                        <Link to={"/login"}><span className=' text-sm text-zinc-400 text-center'>Already have an account?</span></Link>
                    </div>
                </form>
            </div>
        </div>
    </main>
  )
}

export default Register