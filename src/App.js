import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import routes from './config/routes'
import Header from './components/Navbar/Navbar'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes'
import CloseToast from './components/CloseToast/CloseToast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const location = useLocation()
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    setShowNavbar(!(location.pathname === '/login' ||
      location.pathname === '/'))
  }, [location.pathname])

  return (
    <div className="App">
      <Suspense fallback={<div className="app-loading">Loading...</div>}>
        {/* <BrowserRouter> */}
        {
          showNavbar &&
          <Header />
        }
        <Routes>
          {routes.publicRoutes.map(({ path, component: Component, exact }) => {
            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                element={
                  <Component
                  />
                }
              />
            )
          })}
          {routes.protectedRoutes.map(({ path, component: Component, exact }) => {
            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                element={
                  <Component
                  />
                }
              />
            )
          })}
        </Routes>
        {/* </BrowserRouter> */}
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        className="h-toast"
        closeButton={<CloseToast />}
        icon={false}
        hideProgressBar
      />
    </div>
  );
}

export default App;
