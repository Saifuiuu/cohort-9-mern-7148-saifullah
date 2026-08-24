import  { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

const [loading,setLoading]=useState(false)
const [notes,setNotes]=useState([])
const [error,setError]=useState('')
const {logout,user}=useAuth()
const navigate=useNavigate()


const fetchnotes=async()=>{
 setLoading(true)
 setError('')
 try {
  
 const res= await api.get('/note')
  setNotes(res.data)

 } catch (error) {
  setError(error.message||'error while fecthing notes')
 }
 finally{
  setLoading(false)
 }
}

useEffect(()=>{
  fetchnotes()
},[])


const handleLogout=async()=>{
  try {

    setLoading(true)
    setError('')
    await logout()
  navigate('/login')

  } 
  catch (error) {

    setError(error.message||'error while logging out')

  }
  finally{

    setLoading(false)

  }
  
}


const handleDelete=async(id)=>{
  setLoading(true)
  setError('')
  try {
    await api.delete(`/note/${id}`)
    setNotes(notes.filter(note=>
      note._id!==id
    ))
  } catch (error) {
    setError(error.response?.data?.message||"failed to delete note")
  }finally{
setLoading(false)
  }
}

if(loading ) return <h2> loading...... </h2>


  return (
    <div className='min-h-screen flex flex-col bg-gray-700 text-white p-8'>
     <div className='flex justify-between items-center mb-6'>
      <h2 className='text-2xl'>NoteNest</h2>
      <div className='flex gap-4'>
      
      <button className='bg-blue-400 px-4 py-2 rounded-lg'
      onClick={()=>{navigate('/note/new')}}> + New Note</button>
      
      <button className='bg-red-500 px-4 py-2 rounded-lg' 
      onClick={handleLogout}>Logout</button>
      </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}


      {notes.length === 0 ? (<div className=' flex flex-1 text-2xl  justify-center items-center'>
        <p>no notes yet ! Create your first note </p>
       
        </div>):(

<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

{notes.map((note)=>(
  <div className='bg-gray-800 p-4 rounded-lg' key={note._id}>

<h3 className='text-xl font-bold mb-2'>{note.title}</h3>
<p>{note.content?.slice(0,100)}</p>


<div className='flex gap-2 py-2'>

<button className='bg-yellow-300 px-4 py-2 rounded-lg text-sm'
onClick={()=>{navigate(`/note/${note._id}`)}}>Edit</button>

<button className='bg-red-500 px-4 py-2 rounded-lg text-sm'
onClick={()=>{handleDelete(note._id)}}>Delete</button>


</div>

  </div>
))}
</div>
      )}
    </div>
  )
}

export default Dashboard
