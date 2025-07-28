import { useState } from 'react';
import { addToCart, clearCart } from '../utils/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function AddToCartBtn({ info, resInfo, isAbsolute = false }) {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const getResInfo = useSelector((state) => state.cartSlice.resInfo);
  const dispatch = useDispatch();
  const [isDiff, setisDiff] = useState(false);

  function handleNo() {
    setisDiff(false);
  }

  function handleYes() {
    dispatch(clearCart());
    dispatch(addToCart({ info, resInfo }));
    toast.success("Item added to cart successfully");
    setisDiff(false);
  }

  function handleAddToCart() {
    const isAdded = cartData.find((data) => data.id === info.id);
    if (!isAdded) {
      if (getResInfo.name === resInfo.name || getResInfo.length === 0) {
        dispatch(addToCart({ info, resInfo }));
        toast.success("Item added to cart successfully");
      } else {
        setisDiff(true);
      }
    } else {
      toast.error("Already added to cart");
    }
  }

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className={`${
          isAbsolute
            ? "absolute -bottom-4 left-1/2 -translate-x-1/2"
            : "mt-4 mx-auto block"
        } bg-white hover:bg-zinc-200 font-bold text-emerald-500 border border-gray-200 rounded-[15px] w-[100px] sm:w-[120px] py-[6px] drop-shadow-md`}
      >
        ADD
      </button>

      {isDiff && (
        <div className="fixed left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-20 max-w-[520px] h-auto bottom-0 shadow-[0_2px_20px_0_rgba(40,44,63,0.5)] mb-[20px] sm:mb-[40px] bg-white p-[20px] sm:p-[30px]">
          <h1 className="text-[18px] sm:text-[20px] pb-[5px] font-bold">
            Items already in cart
          </h1>
          <h1 className="text-[14px] w-full sm:w-[460px] mb-[20px] text-neutral-700">
            Your cart contains items from another restaurant. Would you like to
            reset your cart to add items from this restaurant?
          </h1>
          <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[20px] justify-center items-center">
            <button
              onClick={handleNo}
              className="w-full sm:w-[220px] h-[50px] border-[2px] border-emerald-500 font-semibold text-emerald-500"
            >
              NO
            </button>
            <button
              onClick={handleYes}
              className="w-full sm:w-[220px] h-[50px] bg-emerald-500 border-[2px] border-emerald-500 font-semibold text-white"
            >
              YES, START FRESH
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToCartBtn;
