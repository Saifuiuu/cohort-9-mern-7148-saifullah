import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name,setName] =useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();
  const {signup}=useAuth();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signup(name,email,password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message||"Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="min-h-screen bg-slate-950 text-white flex">

     
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950">

       
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-16 lg:px-24 max-w-2xl">

         
          <div className="mb-12">
            <h1 className="text-2xl font-bold tracking-tight">
              Note<span className="text-indigo-400">Nest</span>
            </h1>
          </div>

          
          <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
            Your thoughts,
            <br />
            <span className="text-indigo-400">
              organized.
            </span>
          </h2>

          <p className="mt-6 text-slate-400 text-lg leading-8 max-w-lg">
            Capture your ideas, organize your thoughts, and keep everything 
            you need in one simple place.
          </p>
         
          <div className="mt-10 space-y-4">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-slate-300 text-sm mb-2">
                 Quick thought
              </p>
              <p className="text-slate-100">
                "Ideas become powerful when you write them down."
              </p>
            </div>

            <div className="flex gap-4">

              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-indigo-400 text-xl mb-2">✎</p>
                <p className="font-medium">
                  Capture
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Write your ideas
                </p>
              </div>

              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-indigo-400 text-xl mb-2">⌁</p>
                <p className="font-medium">
                  Organize</p>
                <p className="text-xs text-slate-500 mt-1">
                  Keep everything together </p>
              </div>
              </div>
                </div>
             </div>
             </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
        <div className="md:hidden mb-10">
        <h1 className="text-2xl font-bold">
              Note<span className="text-indigo-400">Nest</span>
            </h1>
          </div>

          
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Create your account
            </h2>

            <p className="text-slate-400 mt-2">
              Start capturing your thoughts today.
            </p>
          </div>
         
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

           
            <div>
              <label className="block text-sm text-slate-300 mb-2" htmlFor="name">
                Name
              </label>

              <input type="text" placeholder="Saifullah" value={name} onChange={(e) => setName(e.target.value)} id="name"
  required className=" w-full  bg-slate-900  border border-slate-800  rounded-xl  px-4 py-3  text-white
  placeholder:text-slate-600  outline-none  focus:border-indigo-500  focus:ring-2  focus:ring-indigo-500/20  transition "  />
            </div>            
            <div>
              <label className="block text-sm text-slate-300 mb-2" htmlFor="email">
                Email
              </label>

              <input  type="email"  placeholder="you@example.com"  value={email} id="email" onChange={(e) => setEmail(e.target.value)}
  required className="  w-full  bg-slate-900  border border-slate-800  rounded-xl  px-4 py-3  text-white
  placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
   transition"/> </div>
   
            <div>
              <label className="block text-sm text-slate-300 mb-2" htmlFor="password">
                Password
              </label>

              <input type="password" placeholder="••••••••" value={password} id="password" onChange={(e) => setPassword(e.target.value)}
  required className=" w-full bg-slate-900  border border-slate-800 rounded-xl px-4 py-3 text-white
  placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
  transition"/></div>

            {error&&(<p className="text-red-400 text-sm">
                {error}  </p>)}
          
  <button type="submit" disabled={loading} className="
     w-full bg-indigo-600  hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed  py-3 rounded-xl
     font-semibold transition">
              {loading?"Creating account...":"Create account"} </button>

          </form>
          <p className="text-center text-sm text-slate-400 mt-8">
            Already have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/login")} className="text-indigo-400 hover:text-indigo-300 font-medium">
              Login </button> </p>

        </div>
      </div>
     </div>)}

export default Signup;