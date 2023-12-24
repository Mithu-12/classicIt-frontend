
import { Route, Routes, createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../page/home/Home';
import Signup from '../page/signup/Signup';
import Login from '../page/login/Login';
import ProductDetails from '../page/products/ProductDetails';
import Cart from '../page/cart/Cart';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      
      {
        path: '/register',
        element: <Signup/>     
      },
      {
        path: '/login',
        element: <Login/>     
      },
      {
        path: '/cart',
        element: <Cart/>     
      },
      {
        path: '/product/details/:id',
        element: <ProductDetails/>
      }
    
    
      
    ],
  },
 
]);
export default router;