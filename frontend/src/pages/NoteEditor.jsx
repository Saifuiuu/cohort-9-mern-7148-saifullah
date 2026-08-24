
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/axios"
const NoteEditor = () => {

    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const [saving,setSaving]=useState(false)
    const [loadError,setLoadError]=useState(false)
    const {id}=useParams();
   
    const navigate = useNavigate()

useEffect(()=>{
  setLoadError(false)
  setError('')

  if(!id) return 
  setLoading(true)
  let active =true

    const fetchNote =async()=>{
      try {
    if(!active) return 
    const res= await api.get(`/note/${id}`)
    setTitle(res.data.title)
    setContent(res.data.content)

      } catch (error) {
        if(!active) return 
      setError( error.response?.data?.message ||
        error.message ||
        "Failed to load notes")
        setLoadError(true)
      }
      finally{
        if(active){
        setLoading(false)}
      }
    }
     fetchNote()
  
 
},[id])



    const handleSubmit=async(e)=>{

      e.preventDefault()
      setError('')
      setSaving(true)

try {
 
  if(id){
    await api.put(`/note/${id}`,{title,content})
  }
  else{
    await api.post('/note',{title,content})
  }
  navigate('/dashboard')
} catch (error) {
  setError(error.response?.data?.message ||
        error.message ||
        'error while saving note')
}
finally{
  setSaving(false)
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
          <h2 className="font-bold text-2xl">{id ? "Edit Note":"creating  a new  note"}</h2>
          <p className="text-gray-400 mt-2">Write down your thoughts and ideas</p>

{error && <p className="text-red-400">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col  gap-4  w-full max-w-2xl">
<label htmlFor="title">Title</label>

<input
  id="title"
  name="title"
  type="text"
  placeholder="Title"
  value={title}
  disabled={loading || loadError}
  onChange={(e) => setTitle(e.target.value)}
  className="border border-gray-600 rounded-lg px-4 py-3 w-full bg-gray-800 placeholder:text-gray-400 outline-none focus:ring-2"
/>
<label htmlFor="content">Content</label>

<textarea
  id="content"
  name="content"
  placeholder="Enter Content here"
  value={content}
  disabled={loading || loadError}
  onChange={(e) => setContent(e.target.value)}
  className="border border-gray-600 bg-gray-800 rounded-lg placeholder:text-gray-400 outline-none focus:ring-2 min-h-[300px] p-5"
/>

<div className="flex gap-4"> 
<button className="bg-red-500 px-4 py-2 rounded-xl"
type="button"
onClick={()=>{
  navigate('/dashboard')
}}
>
  cancel
 </button>

   <button className="bg-blue-500 px-4 py-2 rounded-xl"
  type="submit"
  disabled={saving||loadError}>
  {saving? 'Saving..':'Save'}
 </button>
 
 </div>

</form>
        </div>
    </div>

  )
}

export default NoteEditor;
