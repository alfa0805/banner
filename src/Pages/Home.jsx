import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';

function Home() {
  return (
    <div className="max-w-[1240px] h-full  mx-auto ">
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Home