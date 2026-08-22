
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/axios"
const NoteEditor = () => {

    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const {id}=useParams();
    const isEditMode=Boolean(id)
    const navigate = useNavigate()

useEffect(()=>{
  if(isEditMode){
    const fetchNote =async()=>{
    const res= await api.get(`/note/${id}`)
    setTitle(res.data.title)
    setContent(res.data.content)}
     fetchNote()
  }
 
},[id])



    const handleSubmit=async(e)=>{

      e.preventDefault()
      setError('')

try {
  setError('')
  if(isEditMode){
    await api.put(`/note/${id}`,{title,content})
  }
  else{
    await api.post('/note',{title,content})
  }
  navigate('/dashboard')
} catch (error) {
  setError(error.response?.data?.message||'error while saving note')
}


    }
    
  return (
    <div className=" flex flex-col min-h-screen bg-gray-700 p-8 text-white">

        <div className="flex justify-between items-center">
            <h2 className="text-2xl">NoteNest</h2>
            <button className="bg-blue-400 px-5 py-2 rounded-xl"
            onClick={()=>{
                navigate('/dashboard')
            }}>Back</button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="font-bold text-2xl">{isEditMode ? "Edit Note":"creating  a new  note"}</h2>
          <p className="text-gray-400 mt-2">Write down your thoughts and ideas</p>

          <form onSubmit={handleSubmit} className="flex flex-col  gap-4  w-full max-w-2xl">

<input type="text" placeholder="Title"
value={title}
onChange={(e)=>{setTitle(e.target.value)}}
className="border border-gray-600 rounded-lg px-4 py-3 w-full
 bg-gray-800 placeholder:text-gray-400 outline-none focus:ring-2" />

<textarea name="" id="" placeholder="Enter Content here"
className="border border-gray-600 bg-gray-800 rounded-lg
 placeholder:text-gray-400 outline-none focus:ring-2
 min-h-[300px] p-5"
 value={content}
 onChange={(e)=>{setContent(e.target.value)}}
 ></textarea>

<div className="flex gap-4"> 
<button className="bg-red-500 px-4 py-2 rounded-xl"
type="button">
  cancel
 </button>

   <button className="bg-blue-500 px-4 py-2 rounded-xl"
  type="submit">
  save
 </button>
 
 </div>
 


</form>
        </div>


      

    </div>



  )
}

export default NoteEditor;
