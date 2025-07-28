import Scroller from "./Scroller";
import TopRestaurants from "./TopRestaurants";
import DeliveryRestaurants from "./DeliveryRestaurants";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer"
import useRestaurantsData from "../hooks/useRestaurantsData";

function Body() {

  const  [topRestaurantData,topResTitle,onlineTitle,data,scrollerData] = useRestaurantsData()
  const filterVal = useSelector((state) => state.filterSlice.filterVal);

  const filteredData = (topRestaurantData || []).filter((item) => {
    if (!filterVal) return true;

    const rating = parseFloat(item?.info?.avgRating);
    const costString = item?.info?.costForTwo?.split(" ")[0];
    const cost = parseInt(costString?.slice(1));

    switch (filterVal) {
      case "Ratings 4.0+":
        return rating > 4;
      case "Rs. 300- Rs. 600":
        return cost >= 300 && cost <= 600;
      case "Offers":
        return !!item?.info?.aggregatedDiscountInfoV3;
      case "Less than Rs. 300":
        return cost < 300;
      default:
        return true;
    }
  });

  

  if (data?.communication || data?.tid == "") {
    return (
      <div className="flex mt-[50px] flex-col justify-center items-center w-[90%] max-w-[380px] h-[442px] mx-auto text-center">
        <img className="w-[200px] sm:w-[238px] h-[200px] sm:h-[238px]" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="Location Unserviceable" />
        <h1 className="text-[18px] sm:text-[20px] font-bold">Location Unserviceable</h1>
        <p className="text-[14px] sm:text-[16px] text-stone-500">We don’t have any services here till now. Try changing location.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {
        topRestaurantData.length > 0 ? (
          <div className="w-full px-4 sm:px-6 md:px-10 sm:w-[95%] lg:w-[80%] mx-auto mt-3 overflow-hidden">
        {
          scrollerData ? ( <>
            <Scroller data={scrollerData} />
            <TopRestaurants data={topRestaurantData} title={topResTitle} />
          </>) : ""
        }
        <DeliveryRestaurants data={filterVal ? filteredData : topRestaurantData} title={onlineTitle} />
      </div>
        ) : (<Shimmer/>)
      }
    </div>
  );
}

export default Body;
