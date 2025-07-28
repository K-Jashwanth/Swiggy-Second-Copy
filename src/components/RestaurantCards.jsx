import { Link } from "react-router-dom";

function RestaurantCards(info) {
  
  return (
    <Link to={`/restaurantMenu/${info.link?.split("/")?.at(-1)}`} className="flex flex-col">
        <div className="min-w-[295px] h-[182px] relative">
          {info?.cloudinaryImageId && (<img className="2xl:w-[90%] w-full h-full rounded-2xl object-cover" src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`} alt={info?.name || 'restaurant'} />)}
          <div className="bg-gradient-to-t from-black from-1% to-transparent to-40% rounded-2xl w-full 2xl:w-[90%] h-full absolute top-0" />
            {info?.aggregatedDiscountInfoV3 && (<p className="absolute bottom-0 text-white text-2xl ml-2 mb-1 font-bold drop-shadow">
              {[
                info.aggregatedDiscountInfoV3.header,
                info.aggregatedDiscountInfoV3.subHeader,
              ].filter(Boolean).join(' ')}</p>)}
          </div>

          <div className="mt-3">
            <h2 className="font-semibold text-lg">{info?.name}</h2>
            {info?.avgRating && (<p className="flex font-semibold text-base items-center gap-1"> <i className="text-green-600 text-lg mt-1 fi fi-ss-circle-star" /> {info.avgRating} {info?.sla?.slaString && ( <> {' '} · <span>{info.sla.slaString}</span> </> )} </p>)}
            {info?.cuisines && (<p className="line-clamp-1 text-black/55 font-medium"> {info.cuisines.join(', ')} </p>)}
            {info?.locality && (<p className="line-clamp-1 text-black/55 font-medium"> {info.locality}</p>)}
          </div>
    </Link>);
}

export default RestaurantCards;


  