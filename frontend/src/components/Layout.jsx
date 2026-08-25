import Navbar from "./Navbar"

 const Layout = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-700">
      
      <Navbar/>
        {children}
      
    </div>
  )
}

export default Layout
