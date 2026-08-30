import  { useEffect, useState,useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/axios'
import { useNavigate } from 'react-router-dom'
import { Pencil,Trash2,Plus} from 'lucide-react'
import toast from 'react-hot-toast'


const Dashboard = () => {

const [loading,setLoading]=useState(false)
const [notes,setNotes]=useState([])
const [search,setSearch]=useState('')
const [error,setError]=useState('')
const {logout,user}=useAuth()
const navigate=useNavigate()
const searchRequestId=useRef(0)
const debounceTimer= useRef(null)

const fetchnotes=async(searchTerm='',requestId)=>{
 setLoading(true)
 setError('')
 try {
  
 const res= await api.get('/note',{
  params:{
    search:searchTerm
  }
 })
 if(requestId===searchRequestId.current){
  setNotes(res.data)}

 } catch (error) {
  if(requestId===searchRequestId.current){
     setError(error.message||'error when fetching note')
  }
 }
 finally{
  if(requestId===searchRequestId.current){
  setLoading(false)}
 }
}
useEffect(()=>{
  const currentRequestId=++searchRequestId.current
  const timer=  setTimeout(()=>{
    fetchnotes(search,currentRequestId)},300) 
return ()=> clearTimeout(timer,debounceTimer.current)
  
},[search])


const handleDelete=async(id)=>{
  setLoading(true)
  setError('')
  searchRequestId.current++
   clearTimeout(debounceTimer.current)

  try {
    await api.delete(`/note/${id}`)
    

     setNotes((prevNotes)=>prevNotes.filter((note)=>note._id!== id))
    toast.success("Note deleted successfully")
  } catch (error) {
    toast.error(error.response?.data?.message||"failed to delete note")
    setError(error.response?.data?.message||"failed to delete note")
  }finally{
setLoading(false)
  }
}

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        
        <div className="w-10 h-10 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>

        <p className="text-sm text-slate-400">
          Loading your notes...
        </p>

      </div>
    </div>
  )
}


  return (
    <div className='min-h-screen bg-slate-950 text-white p-6 md:p-8'>
     
     <div className='flex items-center justify-between mb-8'>


      <div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
        My Notes
      </h2>

      <p className="mt-2 text-slate-400 text-sm md:text-base">
        Capture your thoughts and ideas
      </p>
    </div>



<div className=' mx-w-xl flex gap-3'>
  <input   type='text' value={search} placeholder='Search notes..'
  onChange={(e)=>{setSearch(e.target.value)}}  aria-label="Search notes"
  className=' py-2 px-4 bg-slate-900 text-white border border-slate-800 rounded-xl outline-none
   focus:border-indigo-50 transition'/>
   
</div>


     <button
    onClick={() => navigate('/note/new')}
    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500
      active:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-xl
      transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30
  whitespace-nowrap ">
       <Plus size={19} strokeWidth={2.5} />
           <span>New Note</span>
      </button>
       </div>
      {error && <p className="text-red-500">{error}</p>}
      {notes.length === 0 ? (<div className=' flex flex-1 text-2xl  justify-center items-center'>
        <p>no notes yet ! Create your first note </p>
        </div>):(<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
    {notes.map((note)=>(  <div className='bg-slate-900 border border-slate-800
     p-5 flex flex-col min-h-[220px] rounded-xl hover:border-slate-700 transition' 
     key={note._id}>

<h3 className='text-lg font-semibold text-slate-100 mb-2'>{note.title}</h3>
<p className='text-sm text-slate-400 leading-6'
  dangerouslySetInnerHTML={{__html:note.content?.slice(0,100)}}>
  </p>


<div className='flex justify-end mt-auto '>

<button className='  text-indigo-400  px-4 py-2 rounded-lg text-sm'
onClick={()=>{navigate(`/note/${note._id}`)}} aria-label='Edit note'>
  <  Pencil size={18}/>
</button>

<button className='text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500/10'
onClick={()=>{handleDelete(note._id)}} aria-label='Delete note'>
  <Trash2 size={18}/>
</button>
</div>
  </div>))}
</div>)}
    </div>)}

export default Dashboard
