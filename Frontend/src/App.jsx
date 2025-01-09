import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignUp from './Pages/SignUp'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'

import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

function App() {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()

  const { theme } = useThemeStore()

  useEffect(()=> {
    checkAuth()
  }, [checkAuth])
  
  console.log({authUser})
  
  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>

        <Route path="/" element={authUser ? < HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? < SignUp /> : <Navigate to='/login' />} />
        <Route path="/login" element={ !authUser ? < LoginPage /> : <Navigate to='/' />} />
        <Route path="/settings" element={ < SettingsPage />} />
        <Route path="/profile" element={authUser ? < ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App