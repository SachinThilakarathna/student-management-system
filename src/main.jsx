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
import ViewStudentdetails from './Pages/Manage Student/ViewStudentdetails.jsx'
import EditStudent from './Components/Student/EditStudent.jsx'
import AuditLogpage from './Pages/AuditLogpage.jsx'

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
  {
    path: "/viewstudentdetails",
    element: <ViewStudentdetails/>
  },

  {
    path: "/edit-student/:intake/:studentId",
    element: <EditStudent/>
  },
  
  {
    path: "/auditlogs",
    element: <AuditLogpage/>
  },



  
  

 


  









 

 

 


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
