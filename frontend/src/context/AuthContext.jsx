import { useState,createContext,useContext, useEffect } from "react";
import api from "../services/axios";


const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const checkAuth=async()=>{
            try {
                const res=await api.get('/auth/profile')
                setUser(res.data.user)
            } catch (error) {
                setUser(null)
            }
            finally{
                setLoading(false)
            }

            
        }
        checkAuth()
    },[])





const signup=async(name,email,password)=>{
  try {

    const res= await api.post('/auth/signup',{name,email,password})
    setUser(res.data)
    return res.data

  } catch (error) {
    throw new Error(error.response?.data?.message||error.message||"signup failed")
  }
  
}

 const login=async(email,password)=>{
    try {

     const res= await api.post('/auth/login',{email,password});
    setUser(res.data)
    return res.data

    } catch (error) {
        throw new Error(error.response?.data?.message||error.message||"Login failed")
    }
      
}

 const logout=async()=>{
try {
    
    await api.post('/auth/logout')
    setUser(null)

} catch (error) {
    throw new Error(error.response?.data?.message||error.message||"Logout failed")
}
   
}
return(
    <AuthContext.Provider value={{signup,login,logout,user,loading}}>
        {children}
    </AuthContext.Provider>
)


}


export const useAuth=()=>useContext(AuthContext)