import { useState,createContext,useContext } from "react";
import api from "../services/axios";


  const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null)


const signup=async(name,email,password)=>{
  
    const res= await api.post('/auth/signup',{name,email,password})
    

    setUser(res.data)
    return res.data

}

 const login=async(email,password)=>{
    
    const res= await api.post('/auth/login',{email,password});
    setUser(res.data)
    return res.data
}

 const logout=async()=>{

    await api.post('/auth/logout')
    setUser(null)
}
return(
    <AuthContext.Provider value={{signup,login,logout,user}}>
        {children}
    </AuthContext.Provider>
)


}


export const useAuth=()=>useContext(AuthContext)