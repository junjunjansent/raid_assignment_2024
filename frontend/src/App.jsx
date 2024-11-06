// import modules
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import component
import Nav from "./pages/general/Nav.jsx";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Nav />
      <main className='py-3 min-h-screen bg-[#0f766e]'>
        <Outlet />
      </main>
    </>
  );
};

export default App;