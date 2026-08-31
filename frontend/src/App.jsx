import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import NoteEditor from './pages/NoteEditor'
import ProtectedRoute from './components/ProtectedRoutes'
import {Toaster} from 'react-hot-toast'


const App = () => {
  return (

<BrowserRouter>
<AuthProvider>
  <Toaster position="top-right" />
<Routes>

  <Route path='/login' element={ <Login/>}/>
  <Route path='/signup' element={<Signup/>}/>

  <Route path='/dashboard' element={
      <ProtectedRoute>
      <Dashboard/>
      </ProtectedRoute>
    }/> 
  <Route path='/note/new' element={
      <ProtectedRoute>
      < NoteEditor/>
      </ProtectedRoute>
    }/> 
  <Route path='/note/:id' element={
      <ProtectedRoute>
      <NoteEditor/>
      </ProtectedRoute>
    }/>
 
</Routes>
</AuthProvider>
</BrowserRouter>

  )
}

export default App
