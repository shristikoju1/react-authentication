import AppHeader from "@/components/AppHeader"
import { Outlet } from "react-router-dom"
import { ToastContainer, Bounce } from 'react-toastify';

const MainLayout = () => {
  return (
    <div>
         <ToastContainer
        position='bottom-right'
        theme="colored"
        transition={Bounce}
      />
        <AppHeader/>
        <Outlet/>
    </div>
  )
}

export default MainLayout