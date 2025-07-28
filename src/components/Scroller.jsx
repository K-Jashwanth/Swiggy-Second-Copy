import React, { useState } from 'react';

function Scroller({ data = [] }) {
  const [val, setVal] = useState(0);
  const itemWidthPercent = 50;
  const maxTranslate = Math.max(0, (data.length - 2) * itemWidthPercent);

  function handlePrev() {
    if (val > 0) setVal((prev) => prev - itemWidthPercent);
  }

  function handleNext() {
    if (val < maxTranslate) setVal((prev) => prev + itemWidthPercent);
  }

  return (
    <div className="w-full">
      <div className="mx-auto mt-2 overflow-hidden px-3 sm:px-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl sm:text-2xl">What's on your mind?</h1>
          <div className="flex gap-2 sm:gap-3">
            <div
              onClick={handlePrev}
              className={`rounded-full w-8 h-8 sm:w-9 sm:h-9 cursor-pointer flex justify-center items-center ${
                val <= 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              <i
                className={`fi fi-rr-arrow-small-left text-xl sm:text-2xl mt-1 ${
                  val <= 0 ? 'text-gray-300' : 'text-gray-800'
                }`}
              ></i>
            </div>
            <div
              onClick={handleNext}
              className={`rounded-full w-8 h-8 sm:w-9 sm:h-9 cursor-pointer flex justify-center items-center ${
                val >= maxTranslate ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              <i
                className={`fi fi-rr-arrow-small-right text-xl sm:text-2xl mt-1 ${
                  val >= maxTranslate ? 'text-gray-300' : 'text-gray-800'
                }`}
              ></i>
            </div>
          </div>
        </div>
        <div
          style={{ transform: `translateX(-${val}%)` }}
          className="flex mt-2 duration-300 transition-transform gap-4"
        >
          {data.map((item, i) => (
            <img
              key={i}
              className="w-36 sm:w-40 shrink-0"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.imageId}`}
              alt={`image-${i}`}
            />
          ))}
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
    </div>
  );
}

export default Scroller;
