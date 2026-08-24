import React from 'react'
import { useState,useContext } from 'react'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'



const Signup = () => {

 const [name,setName]=useState('')
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [error,setError]=useState('')
 const [loading,setLoading]=useState(false)
const navigate=useNavigate()
 const {signup}=useAuth();

 const handleSubmit=async(e)=>{
e.preventDefault()
setError('')
setLoading(true)

try {
    await signup(name,email,password)
    navigate('/dashboard')
    
} catch (err) {
    setError(err.message || 'signup failed')
}
finally{
    setLoading(false)
}


 }



  return (
    <div className='min-w-screen min-h-screen bg-gray-700  flex items-center justify-center '>
 <div className='w-[60%] h-[60%] flex flex-col items-center justify-center gap-y-30px '>
     <h2 className='text-2xl mb-5 text-amber-50'  >Signup</h2>

 <form  onSubmit={handleSubmit} className='flex flex-col items-center justify-center text-amber-50 gap-5'>
    <input className='border border-black px-5 py-3 rounded-2xl' type="text" placeholder='Enter your name' value={name} onChange={(e)=>{setName(e.target.value)}}  required/>
    <input className='border border-black px-5 py-3 rounded-2xl' type="email" placeholder='Enter your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
    <input  className='border border-black  px-5 py-3 rounded-2xl' type="password"  placeholder='Enter your password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
 
    {error && <p style={{color:'red'}}>{error}</p>}


 <button>Signup</button>

 </form>
 </div>
    </div>
  )
}

export default Signup
