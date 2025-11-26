
import Navbar from './Student/Navbar'
import { Outlet, useMatch } from 'react-router-dom'

const MainLayout = () => {
  const isEducatorRoute= useMatch("/educator/*")
  return <>
  {!isEducatorRoute && <Navbar/>}
  <Outlet/>
  </>
}

export default MainLayout