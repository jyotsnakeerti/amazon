import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/Home";
import { productsData } from "./api/Api";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Success from "./component/Success";
import Id from "./pages/Id";
import Favorite from "./pages/Favorite";
import Cancel from "./component/Cancel";
// import {Elements} from '@stripe/react-stripe-js';

const Layout =()=>{
  return (
    <div>
      <Header />
      <ScrollRestoration/>
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={productsData}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/success" element={<Success/>}></Route>
          <Route path="/cancel" element={<Cancel/>}></Route>
          <Route path="/:id" element={<Id/>} />
          {/* <Route path="/product/:productId" component={Id} /> */}
          <Route path="/favorite" element={<Favorite />}></Route>
        </Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/registration" element={<Register />}></Route>
        {/* <Route path="/checkout" element={<Checkout />}></Route> */}
        
        
      </Route>
//       <Route>
//   <Route path="/" element={<Layout />}>
//     <Route index element={<Home />} loader={productsData} />
//     <Route path="cart" element={<Cart/>} />
//     <Route path="success" element={<Success/>} />
//     <Route path="favorite" element={<Favorite/>} />
//     <Route path="signin" element={<SignIn/>} />
//     <Route path="registration" element={<Register/>} />
//     <Route path=":id" element={<Id/>} />
//   </Route>
// </Route>

    )
  );
  return (
    <div className="font-bodyFont bg-gray-100">
<RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;