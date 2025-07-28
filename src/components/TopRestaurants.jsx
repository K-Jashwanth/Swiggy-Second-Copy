import { useState } from "react";
import RestaurantCards from "./RestaurantCards";

function TopRestaurants({ data, title }) {
  const [val, setVal] = useState(0);

  function handleNext() {
    setVal((prev) => prev + 50);
  }

  function handlePrev() {
    setVal((prev) => prev - 50);
  }

  return (
    <div className="mt-6 md:mt-10">
      <div className="flex flex-col md:flex-row md:justify-between mt-4 md:mt-5 gap-3 md:gap-0">
        <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={handlePrev}
            className={`rounded-full w-8 h-8 md:w-9 md:h-9 flex justify-center items-center ${
              val <= 0 ? "bg-gray-100" : "bg-gray-200"
            }`}
          >
            <i
              className={`fi fi-rr-arrow-small-left text-xl md:text-2xl mt-[2px] ${
                val <= 0 ? "text-gray-300" : "text-gray-800"
              }`}
            />
          </button>

          <button
            onClick={handleNext}
            className={`rounded-full w-8 h-8 md:w-9 md:h-9 flex justify-center items-center ${
              val >= 124 ? "bg-gray-100" : "bg-gray-200"
            }`}
          >
            <i
              className={`fi fi-rr-arrow-small-right text-xl md:text-2xl mt-[2px] ${
                val >= 124 ? "text-gray-300" : "text-gray-800"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row mt-4 gap-4 md:gap-5 w-full overflow-x-auto md:overflow-x-hidden md:transition-transform md:duration-300"
        style={{ transform: `translateX(-${val}px)` }}
      >
        {data.map(({ info, cta: { link } }, index) => (
          <RestaurantCards key={index} {...info} link={link} />
        ))}
      </div>

      <hr className="mt-6 md:mt-8 border-gray-300" />
    </div>
  );
}

export default TopRestaurants;
