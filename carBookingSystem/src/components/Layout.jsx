import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-screen">
      <Navbar />
      <main className=" mx-auto w-screen">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
