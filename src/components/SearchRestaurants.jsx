import React from 'react';

function SearchRestaurants({
  data: {
    card: {
      card: {
        info: {
          id,
          cloudinaryImageId,
          aggregatedDiscountInfoV3 = {},
          costForTwoMessage,
          cuisines,
          promoted = false,
          name,
          avgRating,
          sla: { slaString },
        },
      },
    },
  },
}) {
  return (
    <div className="w-full sm:w-[90%] md:max-w-fit m-2 p-4 bg-white flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center rounded-xl shadow-sm">
      <div className="w-full sm:w-[30%]">
        <img
          className="w-full aspect-square object-cover rounded-lg"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/" +
            cloudinaryImageId
          }
          alt={name}
        />
      </div>
      <div className="w-full sm:w-[60%]">
        <p className="font-bold text-base sm:text-lg">By {name}</p>
        <p className="my-2 text-sm sm:text-base">
          <i className="fi fi-ss-star" /> {avgRating} · {costForTwoMessage}
        </p>
        <p className="line-clamp-1 text-sm sm:text-base">{cuisines.join(', ')}</p>
      </div>
    </div>
  );
}

export default SearchRestaurants;

export function withHoc(WrappedComp){
  return (prop) => {
    // console.log(prop);
    return (
      <div className='relative'>
        <p className='absolute top-10 text-sm bg-gray-700 px-1 left-5 text-white rounded-lg'>Ad</p>
        <WrappedComp {...prop}/>
      </div>
    )
  }
}