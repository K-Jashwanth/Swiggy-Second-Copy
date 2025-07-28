// import Body from "./components/Body"
// import Head from "./components/Head"
// import RestaurantMenu from "./components/RestaurantMenu";
// import Scroller from "./components/Scroller"
import { Routes, Route } from "react-router-dom";
import { CartContext, Coordinate, Visibility } from "./context/contextApi";
import React, { lazy,Suspense, useEffect, useState } from "react";
// import Cart from "./components/Cart";
import { useSelector } from "react-redux";
// import Search from "./components/Search";
// import SigninPage from "./components/SigninPage";

const Search = lazy(() => import("./components/Search"))
const Body = lazy(() => import("./components/Body"))
const Head = lazy(() => import("./components/Head"))
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"))
const Cart = lazy(() => import("./components/Cart"))

function App() {
  
  // const [visible,setVisible] = useState(true)
  const [coord,setCoOrd] = useState({lat: 17.406498,lng: 78.47724389999999})
  // const [cartData,setCartData] = useState([])

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)

  // function getDataFromLocalStorage(){
  //   let data = JSON.parse(localStorage.getItem('cartData')) || [];
  //   setCartData(data);
  // }

  // useEffect(()=>{
  //   getDataFromLocalStorage();
  // },[])

  return (
    <>
      {/* <CartContext.Provider value={{cartData, setCartData}}> */}
        <Coordinate.Provider value={{coord,setCoOrd}}>
          {/* <Visibility.Provider value={{visible,setVisible}}> */}
            <div className={visible ? "overflow-hidden max-h-screen" : ""}>
              <Suspense>
                <Routes>
                    <Route path="/" element={<Head/>}>
                        <Route path="/" element={<Body/>}/>
                        <Route path="/restaurantMenu/:id" element={<RestaurantMenu/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/search" element={<Search/>}/>
                        {/* <Route path="/signin" element={<SigninPage/>}/> */}
                    </Route>
                </Routes>
              </Suspense>
            </div>
          {/* </Visibility.Provider> */}
        </Coordinate.Provider>
      {/* </CartContext.Provider> */}
    </>
  )
}

export default App
