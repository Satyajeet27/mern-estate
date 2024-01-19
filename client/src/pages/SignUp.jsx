import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [formData, setFormData]= useState({})
  const [error, setError]= useState(null)
  const [loading, setLoading]= useState(false)
  const navigate= useNavigate()
  const handleChange= (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
    const res= await fetch("/api/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    const data= await res.json()
    if(!data.success){
      setError(data.message)
      setLoading(false)
      return
    }
    setLoading(false)
    setError(null)
    navigate("/sign-in")
    console.log(data)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
    
  }
  // console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>Join Us</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" id='username' placeholder='username' className='border p-3 rounded-lg'  onChange={handleChange}/>
        <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg'  onChange={handleChange}/>
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg'  onChange={handleChange}/>
        <button type='Submit' disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading?"Loading...":"Sign Up"}</button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp 