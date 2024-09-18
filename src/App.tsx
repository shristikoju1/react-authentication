import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import AppHeader from "./AppHeader"
import { ToastContainer, Bounce } from 'react-toastify';
import './App.scss';
import Customer from "./Customer"

function App() {

  return (
    <div className="App">
       <ToastContainer
       position='bottom-right'
        theme="colored"
        transition={Bounce}
      />
      <BrowserRouter>
      <AppHeader/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/customer" element={<Customer/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
