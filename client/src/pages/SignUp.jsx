import React from 'react'
import {Link} from "react-router-dom"

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>Join Us</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" id='username' placeholder='username' className='border p-3 rounded-lg' />
        <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg' />
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp 