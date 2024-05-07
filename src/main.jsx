import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/router'
import AuthProvider from './Firebase/AuthProvider'
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
 
  <RouterProvider router={router}/>
 
 
  
  </QueryClientProvider>
  </AuthProvider>

)
