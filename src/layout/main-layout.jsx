import { Outlet } from "react-router-dom"
import { Footer, FooterContact, FooterHeader, Navbar } from "../components"
// import { Footer, Navbar } from "../components"

function MainLayout() {
  return (
    <>
        <Navbar/>
        <hr className="border-[#46A358] max-w-[1200px] mx-auto"/>
        <div>
            <Outlet/>
        </div>
        <FooterContact/>  
        <FooterHeader/>
        <Footer/>
    </>
  )
}

export default MainLayout