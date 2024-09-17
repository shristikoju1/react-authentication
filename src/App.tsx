import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import AppHeader from "./AppHeader"
import { ToastContainer } from "react-toastify"
import './App.scss';
import Customer from "./Customer"

function App() {

  return (
    <div className="App">
      <ToastContainer theme="colored"></ToastContainer>
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
