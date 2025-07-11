
import './App.css'
import {  Route, Routes } from 'react-router'
import { AdminDashboard, AdminLogin, Blog, Home,  SignUp, UserLogin } from './Pages';
import { Navbar } from './Components';
import AdminAuth from './auth/AdminAuth';



function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <AdminAuth>
              <AdminDashboard />
            </AdminAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App
