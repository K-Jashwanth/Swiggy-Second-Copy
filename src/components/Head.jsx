import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Coordinate} from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearchBar } from "../utils/toggleSlice";
import SigninPage from "./SigninPage";

function Head() {
    const navItems = [
        {
            name: "Search",
            image: "fi-rr-search",
            path: "/search",
        },
        {
            name: "Sign in",
            image: "fi-rr-user",
            path: "/signin",
        },
        {
            name: "Cart",
            image: "fi-rr-shopping-cart-add",
            path: "/cart",
        },
    ];

    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const userData = useSelector((state) => state.authSlice.userData);

    const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
    const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
    const dispatch = useDispatch();

    const [searchResult, setSearchResult] = useState([]);
    const [address, setAddress] = useState("");
    const { setCoOrd } = useContext(Coordinate);

    function handleVisibility() {
        dispatch(toggleSearchBar());
    }

    function handleLogin() {
        dispatch(toggleLogin());
    }

    async function searchResultFun(val) {
        if (val == "") return;
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}`
        );
        const data = await res.json();
        setSearchResult(data.data);
    }

    async function fetchLatAndLng(id) {
        if (id == "") return;
        handleVisibility();
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`
        );
        const data = await res.json();
        setCoOrd({
            lat: data.data[0].geometry.location.lat,
            lng: data.data[0].geometry.location.lng,
        });
        setAddress(data.data[0].formatted_address);
    }

    return (
        <>
            <div className="w-full">
                <div
                    onClick={handleVisibility}
                    className={`fixed inset-0 bg-black/50 z-40 ${visible ? "block" : "hidden"}`}
                ></div>

                <div
                    className={`fixed top-0 left-0 h-full bg-white z-50 w-full md:w-[40%] p-5 duration-500 ${
                    visible ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex flex-col gap-4 mt-3 w-full">
                    <i className="fi fi-br-cross self-end" onClick={handleVisibility}></i>
                    <input
                        type="text"
                        className="border p-3 focus:outline-none focus:shadow-lg"
                        onChange={(e) => searchResultFun(e.target.value)}
                    />
                    <div className="border p-3 max-h-[70vh] overflow-y-auto">
                        <ul>
                        {searchResult.map((data, index) => {
                            const isLast = index === searchResult.length - 1;
                            return (
                            <li
                                key={index}
                                className="my-4 cursor-pointer"
                                onClick={() => fetchLatAndLng(data.place_id)}
                            >
                                <div className="flex gap-3">
                                <i className="fi fi-rr-marker mt-1"></i>
                                <div>
                                    {data.structured_formatting.main_text}
                                    <p className="text-sm opacity-65">
                                    {data.structured_formatting.secondary_text}
                                    </p>
                                    {!isLast && (
                                    <hr className="my-2 border-dashed border-zinc-300" />
                                    )}
                                </div>
                                </div>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                    </div>
                </div>
                </div>

                <div className="w-full">
                <div
                    onClick={handleLogin}
                    className={`fixed inset-0 bg-black/50 z-40 ${loginVisible ? "block" : "hidden"}`}
                ></div>

                <div
                    className={`fixed top-0 right-0 h-full bg-white z-50 w-full md:w-[40%] p-5 duration-500 ${
                    loginVisible ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="m-3 w-full lg:w-[60%]">
                    <i className="fi fi-br-cross" onClick={handleLogin}></i>
                    <div className="my-10 w-full flex justify-between items-center">
                        <h2 className="font-bold text-3xl border-b-2 border-black pb-4">Login</h2>
                        <img
                        className="w-24"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                        alt=""
                        />
                    </div>
                    <SigninPage />
                    <p className="text-sm mt-2 opacity-70">
                        By clicking on Login, I accept the Terms & Conditions & Privacy Policy
                    </p>
                    </div>
                </div>
                </div>

                <div className="relative w-full">
                <div className="w-full sticky bg-white z-30 top-0 shadow-md h-20 flex justify-center items-center">
                    <div className="w-full px-4 sm:px-0 sm:w-[90%] lg:w-[80%] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to={"/"}>
                        <img
                            className="w-16"
                            src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                            alt="Swiggy"
                        />
                        </Link>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleVisibility}>
                        <p className="text-sm sm:text-base">
                            <span className="font-bold border-b-2 border-black">others</span>
                            <span className="ml-2 text-gray-600 truncate max-w-[120px] sm:max-w-[250px] block">
                            {address}
                            </span>
                        </p>
                        <i className="fi text-xl text-orange-500 fi-rs-angle-small-down"></i>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((data, i) => {
                        const isCart = data.name === "Cart";
                        const isSignIn = data.name === "Sign in";
                        return isSignIn ? (
                            <div onClick={handleLogin} key={i} className="flex items-center gap-2 cursor-pointer">
                            {userData ? (
                                <img className="w-10 h-10 rounded-full" src={userData.photo} alt="" />
                            ) : (
                                <i className={`fi text-xl ${data.image}`}></i>
                            )}
                            <p className="text-base text-gray-700">
                                {userData ? userData.name : data.name}
                            </p>
                            {isCart && <span>{cartData.length}</span>}
                            </div>
                        ) : (
                            <Link to={data.path} key={i} className="flex items-center gap-2">
                            <i className={`fi text-xl ${data.image}`}></i>
                            <p className="text-base text-gray-700">{data.name}</p>
                            {isCart && <span>{cartData.length}</span>}
                            </Link>
                        );
                        })}
                    </div>

                    <div className="md:hidden flex items-center gap-6">
                        {navItems.map((data, i) => {
                        const isCart = data.name === "Cart";
                        const isSignIn = data.name === "Sign in";
                        return isSignIn ? (
                            <div onClick={handleLogin} key={i}>
                            {userData ? (
                                <img className="w-8 h-8 rounded-full" src={userData.photo} alt="" />
                            ) : (
                                <i className={`fi text-xl ${data.image}`}></i>
                            )}
                            {isCart && <sup>{cartData.length}</sup>}
                            </div>
                        ) : (
                            <Link to={data.path} key={i}>
                            <i className={`fi text-xl ${data.image}`}></i>
                            {isCart && <sup>{cartData.length}</sup>}
                            </Link>
                        );
                        })}
                    </div>
                    </div>
                </div>

                <Outlet />
                </div>
        </>
    );
}

export default Head;