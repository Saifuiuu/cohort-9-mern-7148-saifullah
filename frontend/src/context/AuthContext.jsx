import { useState,createContext,useContext } from "react";
import api from "../services/axios";


const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(false)


const signup=async(name,email,password)=>{
  try {

    const res= await api.post('/auth/signup',{name,email,password})
    setUser(res.data)
    return res.data

  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed")
  }
  
}

 const login=async(email,password)=>{
    try {

     const res= await api.post('/auth/login',{email,password});
    setUser(res.data)
    return res.data

    } catch (error) {
        throw new Error(error.response?.data?.message||"Login failed")
    }
      
}

 const logout=async()=>{
try {
    
    await api.post('/auth/logout')
    setUser(null)

} catch (error) {
    throw new Error(error.reponse?.data?.message || "Logout failed")
}
   
}
return(
    <AuthContext.Provider value={{signup,login,logout,user}}>
        {children}
    </AuthContext.Provider>
)


}


export const useAuth=()=>useContext(AuthContext)