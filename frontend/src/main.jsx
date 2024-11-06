// import module
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { 
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter } from 'react-router-dom';

// import from src
import './index.css';
import App from './App.jsx';
import store from './redux/store';

// import public routes
import Public_login from './pages/general/Public_login.jsx';
import Public_register from './pages/general/Public_register.jsx';
import Home from './pages/general/Home.jsx';
import Shop from './pages/general/Shop.jsx';
import Cart from './pages/general/Cart.jsx';

// import user routes
import User_privateRoute from "./pages/user/User_privateRoute.jsx";
import User_profile from "./pages/user/User_profile.jsx";

// import admin routes
import Admin_privateRoute from "./pages/admin/Admin_privateRoute.jsx";
import Admin_userManager from "./pages/admin/Admin_userManager";
import Admin_productManager from "./pages/admin/Admin_productManager";
import Admin_createProduct from "./pages/admin/Admin_createProduct";
import Admin_orderManager from "./pages/Admin/Admin_orderManager.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(

    // ------ Nav Bar Routes
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='shop' element={<Shop />} />
      <Route path='cart' element={<Cart />} />
      <Route path='login' element={<Public_login />} />
      <Route path='register' element={<Public_register />} />

      {/* User Routes */}
      <Route path='/' element={<User_privateRoute />}>
        <Route path='profile' element={<User_profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={<Admin_privateRoute />}>
        <Route path='user_manager' element={<Admin_userManager />} />
        <Route path='product_manager' element={<Admin_productManager />} />
        <Route path='create_product' element={<Admin_createProduct />} />
        <Route path='order_manager' element={<Admin_orderManager />} />
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap with Provider: Required for React-Redux functions to be utilised
  <Provider store={store}>    
    <RouterProvider router={router} />
  </Provider>
);
