import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'

import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LogIn from './componenets/LogIn/LogIn.jsx'
import Signup from './componenets/SignUp/SignUp.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/login',
        element:<LogIn/>
      },
      {
        path:'/signup',
        element:<Signup/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
