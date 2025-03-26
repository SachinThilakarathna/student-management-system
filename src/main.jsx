import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './Pages/About.jsx'
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'

//React router dome
import { 
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Course from './Pages/Course.jsx'
import Addstudent from './Pages/Manage Student/Addstudent.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
  },
  {
    path: "/about",
    element: <About /> ,
  },

  {
    path: "/dashboard",
    element: <Dashboard /> 
  },

  {
    path: "/login",
    element: <Login /> ,
  },
  {
    path: "/course",
    element: <Course /> ,
  },
  {
    path: "/addstudent",
    element: <Addstudent /> ,
  },
  {
    path: "/logout",
    element: <App /> ,
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
