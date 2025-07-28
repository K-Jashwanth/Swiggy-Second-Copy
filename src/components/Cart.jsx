import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, clearCart } from '../utils/cartSlice';
import toast from 'react-hot-toast';

function Cart() {
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const userData = useSelector((state) => state.authSlice.userData);
    const resInfo = useSelector((state) => state.cartSlice.resInfo);
    const [isMore, setIsMore] = useState(false);
    const dispatch = useDispatch();

    let amt = 0;
    cartData.forEach(
        (item) => (amt += (item.price || item.defaultPrice) / 100)
    );

    if (cartData.length === 0) {
        return (
            <div className='w-full flex flex-col items-center justify-center text-center px-4'>
                <img className='w-[200px] sm:w-[271px] h-[200px] sm:h-[256px] mt-[100px] sm:mt-[140px]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" />
                <h2 className='text-[18px] sm:text-[20px] font-semibold mt-[20px] sm:mt-[24px]'>Your cart is empty</h2>
                <h4 className='text-[13px] sm:text-[14px] mt-[8px]'>You can go to home page to view more restaurants</h4>
                <Link to="/"><button className='mt-[20px] sm:mt-[30px] px-[16px] py-[10px] bg-orange-500 text-white cursor-pointer text-[14px] sm:text-[15px] font-bold'>SEE RESTAURANTS NEAR YOU</button></Link>
            </div>
        );
    }

    function handleRemove(i) {
        if (cartData.length > 1) {
            let newArr = [...cartData];
            newArr.splice(i, 1);
            dispatch(deleteItem(newArr));
            toast.success("Item removed successfully");
        } else {
            clearcart();
        }
    }

    function clearcart() {
        dispatch(clearCart());
        toast.success("Cart cleared");
    }

    function handlePlaceOrder() {
        toast.success("Order placed successfully");
        dispatch(clearCart());
    }

    return (
        <div className='w-full px-4'>
            <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto'>
                {resInfo?.cloudinaryImageId && (
                <Link to={`/restaurantmenu/${resInfo.id}`}>
                    <div className='my-10 flex flex-col sm:flex-row gap-5'>
                        <img className="w-full sm:w-40 h-40 aspect-square rounded-[15px] object-cover" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${resInfo.cloudinaryImageId}`} />
                        <div>
                            <p className='text-2xl sm:text-4xl font-semibold border-b pb-2'>{resInfo.name}</p>
                            <p className='mt-2 sm:mt-3 text-base sm:text-xl text-neutral-700'>{resInfo.areaName}</p>
                        </div>
                    </div>
                </Link>
                )}
                {cartData.map((data, i) => {
                    const {
                        name,
                        defaultPrice,
                        price,
                        itemAttribute: { vegClassifier } = {},
                        ratings: { aggregatedRating: { rating, ratingCountV2 } = {} } = {},
                        description,
                        imageId,
                    } = data;

                    return (
                        <div key={imageId} className="flex flex-col sm:flex-row justify-between w-full my-5 p-2 border-b gap-4 sm:gap-0">
                            <div className="w-full sm:w-[70%] space-y-1">
                                <div className="flex items-center gap-2">
                                    <img
                                        className="w-4 h-4"
                                        src={
                                            vegClassifier === "VEG"
                                                ? "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png"
                                                : "https://cdn.vectorstock.com/i/500p/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"
                                        }
                                        alt={vegClassifier}
                                    />
                                    <p className="text-xs text-neutral-500">{vegClassifier}</p>
                                </div>

                                <h2 className="font-semibold">{name}</h2>
                                <p className="font-medium">₹{(price || defaultPrice) / 100}</p>

                                {rating && ratingCountV2 && (
                                    <div className="flex items-center gap-1 text-emerald-700 text-sm">
                                        <i className="fi fi-ss-star" />
                                        <span>{rating}</span>
                                        <span className="text-neutral-500">({ratingCountV2})</span>
                                    </div>
                                )}

                                {description && (
                                    <div>
                                        <p className={`text-sm text-neutral-500 ${!isMore && "line-clamp-2"}`}>
                                            {description}
                                        </p>
                                        {description.length > 140 && (
                                            <button
                                                className="font-bold text-sm text-stone-500"
                                                onClick={() => setIsMore(!isMore)}
                                            >
                                                {isMore ? "less" : "more"}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="w-full sm:w-[156px] relative">
                                {imageId && (
                                    <img
                                        className="w-full h-[144px] object-cover rounded-[15px]"
                                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                                        alt=""
                                    />
                                )}
                                <button
                                    onClick={() => handleRemove(i)}
                                    className="absolute left-1/2 -translate-x-1/2 bg-white hover:bg-zinc-200 font-bold text-emerald-500 border border-gray-200 rounded-[15px] w-[100px] sm:w-[120px] py-[6px] drop-shadow-md bottom-[-18px] sm:bottom-[-4px]"
                                >
                                    REMOVE
                                </button>
                            </div>
                        </div>
                    );
                })}

                <h2 className="font-bold text-lg sm:text-xl mt-8">To Pay - ₹{amt.toFixed(2)}</h2>

                <div className='flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-0 mt-[30px]'>
                    <button onClick={clearcart} className="bg-white hover:bg-zinc-200 font-bold text-emerald-500 border border-gray-200 rounded-[15px] w-full sm:w-[120px] py-[10px] drop-shadow-md">CLEAR CART</button>
                    <button onClick={handlePlaceOrder} className="bg-white hover:bg-zinc-200 font-bold text-emerald-500 border border-gray-200 rounded-[15px] w-full sm:w-[120px] py-[10px] drop-shadow-md">PLACE ORDER</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
