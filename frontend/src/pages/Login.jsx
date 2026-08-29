import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login=()=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();
  const {login}=useAuth();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email,password)
      navigate("/dashboard")}
  catch(err){
      setError(err.message||"login failed")}
      finally{
      setLoading(false)}}

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950">  
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center px-16 lg:px-24 max-w-2xl">
         
<div className="mb-12">
 <h1 className="text-2xl font-bold tracking-tight"> Note<span className="text-indigo-400">Nest </span> </h1>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
            Your thoughts,<br/><span className="text-indigo-400"> organized </span> </h2>

    <p className="mt-6 text-slate-400 text-lg leading-8 max-w-lg">Your ideas are waiting for you Sign in and
     continue capturing the things that matter </p>
    
      <div className="mt-10 space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">

<p className="text-slate-400 text-sm mb-3"> Today's thought</p>

              <p className="text-slate-100 text-lg">
                "The smallest idea can become something
                meaningful when you write it down."  </p>  </div>

            <div className="flex gap-4">

              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">

          <p className="text-indigo-400 text-xl mb-2"> ✎</p>

                <p className="font-medium"> Capture </p>

<p className="text-xs text-slate-500 mt-1"> Never lose an idea</p> </div>

              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-indigo-400 text-xl mb-2">⌁</p>
                <p className="font-medium">
                  Organize</p>
                <p className="text-xs text-slate-500 mt-1">Keep your thoughts together</p></div>
          </div></div>
        </div></div>

  <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
         
<div className="md:hidden mb-10"> <h1 className="text-2xl font-bold">  Note
  <span className="text-indigo-400">Nest  </span>
</h1> </div>
          <div className="mb-8">
      <h2 className="text-3xl font-bold"> Welcome back</h2>
 <p className="text-slate-400 mt-2"> Sign in to continue to your notes</p></div>

<form  onSubmit={handleSubmit}className="space-y-5" >
  <div>
 <label className="block text-sm text-slate-300 mb-2">Email</label>
 <input  type="email"  placeholder="you@example.com"  value={email}
  onChange={(e) => setEmail(e.target.value)} required className="  w-full  bg-slate-900 
   border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 
 outline-none  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"/></div>
  <div> <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-slate-300">Password</label></div>

 <input type="password" placeholder="••••••••" value={password}  onChange={(e) => setPassword(e.target.value)}
  required className=" w-full bg-slate-900 border border-slate-800 rounded-xl
 px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500
  focus:ring-2 focus:ring-indigo-500/20 transition"/> </div>
           
      {error && (<p className="text-red-400 text-sm"> {error}</p> )}

 <button type="submit" disabled={loading} className=" w-full bg-indigo-600
 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed  py-3
    rounded-xl  font-semibold  transition" >
              {loading ? "Signing in..." : "Login"}
            </button></form>
    
          <p className="text-center text-sm text-slate-400 mt-8">
            Do not have an account?{" "}
            <button
              type="button"
              onClick={()=>navigate("/signup")}
              className=" text-indigo-400 hover:text-indigo-300 font-medium">
Sign up </button></p>
      </div>
      </div>
</div>)}

export default Login;