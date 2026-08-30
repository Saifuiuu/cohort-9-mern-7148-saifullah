import {useEffect,useState} from "react"
import {useNavigate,useParams} from "react-router-dom"
import api from "../services/axios"
import toast from "react-hot-toast"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
const NoteEditor=()=>{
const [title,setTitle]=useState('')
const [content,setContent]=useState('')
const [error,setError]=useState('')
const [loading,setLoading]=useState(false)
const [saving,setSaving]=useState(false)
const [loadError,setLoadError]=useState(false)
const {id}=useParams()
const navigate=useNavigate()

   useEffect(()=>{
     setLoadError(false)
      setError('')
      if(!id)return
     setLoading(true)

      let active=true
    const fetchNote=async()=>{
   try{
   if(!active)return

const res=await api.get(`/note/${id}`)

 setTitle(res.data.title)
 setContent(res.data.content)}
 
catch(error){
if(!active)return
setError(error.response?.data?.message||error.message||"Failed to load notes")
setLoadError(true)
}finally{
if(active){setLoading(false)}
}
}
fetchNote()
return()=>{active=false}
},[id])
const handleSubmit=async(e)=>{
e.preventDefault()
setError('')
setSaving(true)
try{
if(id){
await api.put(`/note/${id}`,{title,content})
toast.success('Note updated successfully')
}else{
await api.post('/note',{title,content})
toast.success('Note created successfully')
}
navigate('/dashboard')
}catch(error){
setError(error.response?.data?.message||error.message||'error while saving note')
toast.error(error.response?.data?.message||error.message||'error while saving note')
}finally{
setSaving(false)
}
}
const modules={
toolbar:[
[{header:[1,2,3,false]}],
['bold','italic','underline','strike'],
[{list:'ordered'},{list:'bullet'}],
['link'],
['clean'],
],
}
return(
<div className="flex flex-col min-h-screen bg-slate-950 px-6 py-10 text-white">
<div className="flex-1 flex flex-col items-center">
<h2 className="font-bold text-2xl">{id?"Edit Note":"creating a new note"}</h2>
<p className="text-gray-400 mt-2">Write down your thoughts and ideas</p>
{error&&<p className="text-red-400">{error}</p>}
<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
 <label htmlFor="title">Title</label>
  <input id="title" name="title" type="text" placeholder="Title"
   value={title} disabled={loading||loadError}
    onChange={(e)=>setTitle(e.target.value)}
    className="border border-gray-600 rounded-lg px-4 py-3 w-full bg-gray-800
 placeholder:text-gray-400 outline-none focus:ring-2"/>

<label htmlFor="content">Content</label>

<div className="bg-white text-black rounded-lg overflow-hidden">

<ReactQuill theme="snow" value={content} onChange={setContent} modules={modules}
placeholder="Enter your content here..."
readOnly={loadError||loading}
className="min-h-[300px] text-black"/>
</div>
<div className="flex gap-4">
<button type="button" onClick={()=>navigate('/dashboard')}
className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition">
Cancel</button>
<button type="submit" disabled={saving||loadError||loading}
className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed">
{saving?"Saving...":id?"Update Note":"Create Note"}</button>
</div>
</form>
</div>
</div>
)
}
export default NoteEditor