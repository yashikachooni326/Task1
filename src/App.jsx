
import { Component2 } from "./Day5/Pages/Component2"
import { HomePage } from "./Day5/Pages/HomePage"
// import { Navbar } from "./Day6/Navbar"
import { Route,Routes } from "react-router-dom"
import { RegisterUser } from "./Day6/RegisterUser"
import { Home } from "./Day6/Home"

function App() {

  return (
    <>

    {/* <HomePage/>  */}
    {/* <Component2/> */}
    {/* <Navbar/> */}
    {/* <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/register-user" element={<RegisterUser/>}/>
    </Routes> */}
    <RegisterUser/>
    </>
  )
}

export default App


