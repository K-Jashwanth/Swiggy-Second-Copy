import AddToCartBtn from './AddToCartBtn'
import { useDispatch, useSelector } from 'react-redux';
import { setSimilarResDish } from '../utils/toggleSlice';
import { Link } from 'react-router-dom';

function Dish({ data: { info, restaurant: { info: resInfo }},hideRestaurantDetails = false }) {
  let { imageId = "", name, price, isVeg = 0, id:itemId } = info;
  let { id, name: resName, avgRating, sla: { slaString } ,slugs : {city,restaurant: resLocation}} = resInfo;
  const {id:cartResId} = useSelector((state) => state.cartSlice.resInfo);
  const dispatch = useDispatch();

  function handleSameRes(){
    if(cartResId == id || !cartResId){
      dispatch(setSimilarResDish( {
            isSimilarResDishes : true,
            city ,
            resLocation ,
            resId : id,
            itemId ,
        }))
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 m-4">
      { !hideRestaurantDetails && (
        <>
          <Link to={`/restaurantMenu/${resLocation}-${id}`}>
            <div className="flex justify-between text-sm opacity-50">
            <div>
              <p className="font-bold">By {resName}</p>
              <p className="my-2"><i className="fi fi-ss-star"></i> {avgRating} . {slaString}</p>
            </div>
              <i className="fi fi-rr-arrow-small-right text-2xl"></i>
            </div> 
          </Link>
          <hr className="border-dotted" />
        </>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-3 gap-3">
        <div className="w-full sm:w-1/2 space-y-1">
          <div>
            <img
              className="w-4 h-4 mt-1"
              src={
                isVeg === 1
                  ? "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png"
                  : "https://cdn.vectorstock.com/i/500p/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"
              }
              alt={isVeg === 1 ? "Veg" : "Non-Veg"}
            />
          </div>
          <p className="text-base sm:text-lg font-semibold">{name}</p>
          <p className="text-base sm:text-lg font-semibold">₹{price / 100}</p>
        </div>

        <div className="w-full sm:w-1/2 flex justify-end">
          <div className="w-[60%] sm:w-[156px] relative">
            {imageId && (
              <img
                className="w-full h-[144px] object-cover rounded-[15px]"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                alt={name}
              />
            )}
            <div onClick={handleSameRes}><AddToCartBtn info={info} resInfo={resInfo} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dish;
