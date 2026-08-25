
import { useState} from 'react'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
   
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
   const [error,setError]=useState('')
   const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
   const {login}=useAuth();

 const handleSubmit =async(e)=>{
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    
    await login(email,password)
    navigate('/dashboard')
  } catch (error) {
    setError(error.message || "login error")
  }
  finally{
    setLoading(false)
  }

 }



  return (
    <div className='min-w-screen min-h-screen bg-gray-700  flex items-center justify-center '>
 <div className='w-[60%] h-[60%] flex flex-col items-center justify-center gap-y-30px border border-amber-400 rounded-md py-20'>
     <h2 className='text-2xl mb-5 text-amber-50'  >Login</h2>

 <form  onSubmit={handleSubmit} className='flex flex-col items-center justify-center text-amber-50 gap-5'>
    <input className='border border-black px-5 py-3 rounded-2xl' type="email" placeholder='Enter your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
    <input  className='border border-black  px-5 py-3 rounded-2xl' type="password"  placeholder='Enter your password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
 
    {error && <p style={{color:'red'}}>{error}</p>}


 <button className='border  border-amber-400 rounded-full px-21 py-2'type='submit'  >Login</button>


<p>Not Resgister  <button className='text-amber-200 cursor-pointer'
onClick={()=>{ navigate('/signup')}} type='button'>signup</button></p> 

 </form>
 </div>
    </div>
  )
  
}

export default Login
