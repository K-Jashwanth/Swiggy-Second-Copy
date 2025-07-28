import { useState, useEffect } from "react";
import RestaurantCards from "./RestaurantCards";
import { useDispatch } from 'react-redux';
import { setFilterVal } from "../utils/filterSlice";

function DeliveryRestaurants({ data, title }) {
  const filterOptions = [
    { filtername: "Ratings 4.0+" },
    { filtername: "Rs. 300- Rs. 600" },
    { filtername: "Offers" },
    { filtername: "Less than Rs. 300" },
  ];

  const [actBtn, setActBtn] = useState(null);
  const dispatch = useDispatch();

  function handleFilterBtn(filtername) {
    setActBtn(prev => (prev === filtername ? null : filtername));
  }

  useEffect(() => {
    dispatch(setFilterVal(actBtn));
  }, [actBtn, dispatch]);

  return (
    <div className="px-4 sm:px-0">
      <h1 className="mb-4 font-semibold text-lg sm:text-xl">{title}</h1>

      <div className="flex flex-wrap mt-4 mb-8 items-center gap-2 sm:gap-[8px] w-full cursor-pointer text-gray-950 text-sm sm:text-[14px]">
        {filterOptions.map(option => (
          <button
            key={option.filtername}
            onClick={() => handleFilterBtn(option.filtername)}
            className={
              "filter flex items-center gap-2 px-3 py-1 rounded-full border " +
              (actBtn === option.filtername
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-200")
            }
          >
            {option.filtername}
            <i className="fi fi-rr-cross-small text-sm w-4 h-4 hidden" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-8">
        {data.map(({ info, cta: { link } }, index) => (
          <div key={info.id || index} className="hover:scale-95 duration-500">
            <RestaurantCards {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliveryRestaurants;
