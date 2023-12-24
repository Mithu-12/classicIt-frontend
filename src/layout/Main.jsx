import { Outlet } from 'react-router-dom'
import Navbar from '../shared/navbar/Navbar'
import Footer from '../shared/footer/Footer'


const Main = () => {
  
  
  return (
    <div className='flex flex-col flex-1'>
        <Navbar />
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Main