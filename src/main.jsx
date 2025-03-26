import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './Pages/About.jsx'
import Afterlogin from './Pages/Afterlogin.jsx'
import Login from './Pages/Login.jsx'

//React router dome
import { 
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    path: "/after",
    element: <Afterlogin /> ,
  },

  {
    path: "/login",
    element: <Login /> ,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
