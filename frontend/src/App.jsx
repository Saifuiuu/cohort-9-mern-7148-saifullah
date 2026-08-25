import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import NoteEditor from './pages/NoteEditor'


const App = () => {
  return (

<BrowserRouter>
<AuthProvider>
<Routes>

  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/> 
  <Route path='/note/new' element={< NoteEditor/>}/> 
  <Route path='/note/:id' element={<NoteEditor/>}/>
 
</Routes>
</AuthProvider>
</BrowserRouter>

  )
}

export default App
