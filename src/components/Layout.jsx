import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Homescroll from '../pages/Homescroll'


export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="app-shell">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 md:flex-row">
        <Sidebar />
        <div className="flex-1">{isHome ? <Homescroll /> : children}</div>
      </div>
    </div>
  )
}