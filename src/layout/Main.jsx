import React, { useContext } from 'react'
import Navbar from '../components/Home/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Home/Footer'
import { AuthContext } from '../Firebase/AuthProvider'
import LoadingSpinner from '../components/Home/Loading'

const Main = () => {
  
  const { loading } = useContext(AuthContext);
  return (
    <div className="bg-prigmayBG">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Navbar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main
