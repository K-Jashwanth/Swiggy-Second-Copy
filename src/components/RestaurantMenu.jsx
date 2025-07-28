import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {Coordinate } from '../context/contextApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart} from '../utils/cartSlice';
import toast from 'react-hot-toast';
import AddToCartBtn from './AddToCartBtn';
import MenuShimmer from './MenuShimmer';


function RestaurantMenu() {
  const { id } = useParams();
  const [val, setVal] = useState(0);
  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState({});
  const [topPicksData, setTopPicksData] = useState({});
  const [discData, setDiscData] = useState([]);
  const mainId = id.split("-").at(-1).split("rest").at(-1);
  const {
    coord: { lat, lng },
  } = useContext(Coordinate);

  useEffect(() => {
    async function fetchMenu() {
      const resp = await fetch(
        `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const res = await resp.json();

    const menu =
      res?.data?.cards
        ?.find((data) => data?.groupedCard)
        ?.groupedCard?.cardGroupMap?.["REGULAR"]?.cards
        ?.filter(
          (data) =>
            data?.card?.card?.itemCards || data?.card?.card?.categories
        );

      setMenuData(menu);
      const resInfo = res?.data?.cards.find(data => data?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.Restaurant")?.card?.card?.info;
      const discountInfo = res?.data?.cards.find(data => data?.card?.card?.["@type"].includes("v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers
      setResInfo(resInfo);
      setDiscData(discountInfo);

      setTopPicksData(
        res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (data) => data.card.card.title === "Top Picks"
        )?.[0]
      );
    }
    fetchMenu();
  }, [mainId, lat, lng]);

  const handlePrev = () => val > 0 && setVal((p) => p - 31);
  const handleNext = () => val < 124 && setVal((p) => p + 31);

  return (
    <div className="w-full">
      {
        menuData.length ? (
                <div className="w-[95%] max-w-[800px] mx-auto pt-6 sm:pt-8">
        <p className="text-[11px] text-neutral-400 px-1">
          <Link to="/" className="hover:text-slate-700">Home</Link> /
          <Link to="/" className="hover:text-slate-700"> {resInfo.city} </Link> /
          <span className="text-slate-700">{resInfo.name}</span>
        </p>

        <h1 className="font-bold text-xl sm:text-[28px] my-4">{resInfo.name}</h1>

        <div className="w-full p-4 sm:h-[206px] bg-gradient-to-t from-zinc-200 mt-3 rounded-2xl sm:rounded-[30px]">
          <div className="w-full h-full rounded-2xl sm:rounded-[30px] p-4 bg-white border border-zinc-200">
            <div className="flex items-center flex-wrap gap-2 font-semibold text-sm sm:text-base">
              <i className="text-green-600 text-lg mb-[5px] fi fi-ss-circle-star w-[18px] h-[18px]" />
              <span>{resInfo.avgRating}</span>
              <span>({resInfo.totalRatingsString})</span> ·
              <span>{resInfo.costForTwoMessage}</span>
            </div>
            <p className="underline font-bold text-orange-600 text-sm sm:text-base mt-1">
              {resInfo?.cuisines?.join(", ")}
            </p>

            <div className="flex gap-2 p-3">
              <div className="flex flex-col items-center pt-2">
                <div className="w-[8px] h-[8px] bg-stone-300 rounded-full" />
                <div className="w-[1px] h-[25px] bg-stone-300" />
                <div className="w-[8px] h-[8px] bg-stone-300 rounded-full" />
              </div>

              <div className="flex flex-col gap-1 text-sm font-semibold">
                <p>
                  Outlet <span className="text-neutral-500">{resInfo.locality}</span>
                </p>
                <p>{resInfo.sla?.slaString}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div className="flex justify-between items-center mt-6">
            <h1 className="font-bold text-lg sm:text-xl">Deals for you</h1>
            <div className="flex gap-3">
              <NavBtn dir="left" disabled={val <= 0} onClick={handlePrev} />
              <NavBtn dir="right" disabled={val >= 124} onClick={handleNext} />
            </div>
          </div>

          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${val}%)` }}>
            {discData.map((d, i) => (
              <Discount key={i} data={d} />
            ))}
          </div>
        </div>

        <h2 className="text-center text-neutral-500 mt-8 text-sm sm:text-base">MENU</h2>

        <div className="w-full relative cursor-pointer">
          <div className="bg-zinc-100 rounded-xl mt-4 p-3 text-center font-semibold text-neutral-500 text-sm">
            Search for dishes
          </div>
          <i className="fi fi-rr-search absolute text-neutral-500 right-4 top-4" />
        </div>

        {topPicksData?.card?.card?.carousel && (
          <div className="w-full overflow-hidden mt-6">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg sm:text-xl">{topPicksData.card.card.title}</h1>
              <div className="flex gap-3">
                <NavBtn dir="left" disabled={val <= 0} onClick={handlePrev} />
                <NavBtn dir="right" disabled={val >= 124} onClick={handleNext} />
              </div>
            </div>

            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${val}%)` }}>
              {topPicksData.card.card.carousel.map(({ creativeId, dish: { info: { defaultPrice, price } } }) => (
                <div
                  key={creativeId}
                  className="relative min-w-[260px] sm:min-w-[307.2px] h-[300px] sm:h-[315.612px] m-2"
                >
                  <img
                    className="w-full h-full rounded-2xl object-cover"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}
                    alt=""
                  />

                  <div className="absolute inset-0 flex items-end justify-between p-4 sm:p-6">
                    <p className="font-semibold text-white text-sm sm:text-base">
                      ₹{(price || defaultPrice) / 100}
                    </p>

                    <button className="bg-white hover:bg-zinc-200 font-bold text-emerald-500 border border-gray-200 rounded-lg sm:rounded-[15px] w-[100px] sm:w-[120px] py-[6px] text-sm shadow-md">
                      ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          {menuData.map(({ card: { card } }, i) => (
            <MenuCard card={card} key={i} resInfo={resInfo} />
          ))}
        </div>
      </div>) : (<MenuShimmer/>)
      }

    </div>
  );
}


function DetailMenuCard({ info, resInfo }) {
  const [isMore, setIsMore] = useState(false);
  const {
    name,
    defaultPrice,
    price,
    itemAttribute: { vegClassifier },
    ratings: { aggregatedRating: { rating, ratingCountV2 } = {} } = {},
    description,
    imageId,
  } = info;

  const cartData = useSelector((state) => state.cartSlice.cartItems)
  const getResInfo = useSelector((state) => state.cartSlice.resInfo)
  const [isDiff, setisDiff] = useState(false);
  const dispatch = useDispatch()

  function handleAddToCart() {
    const isAdded = cartData.find((data) => data.id === info.id)
    if (!isAdded) {
      if (getResInfo.name === resInfo.name || getResInfo.length === 0) {
        dispatch(addToCart({ info, resInfo }))
        toast.success("Item added to cart successfully")
      } else {
        setisDiff((prev) => !prev)
      }
    }
    else toast.error("already added to cart")
  }

  return (
    <div className="relative w-full">
      <div className="flex flex-col sm:flex-row w-full justify-between gap-4 border-b border-gray-100 pb-6">
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
              <span className="leading-none">{rating}</span>
              <span className="text-neutral-500">({ratingCountV2})</span>
            </div>
          )}

          {description && (
            <div>
              <p className={`text-sm text-neutral-500 ${!isMore ? "line-clamp-2" : ""} sm:line-clamp-none`}>
                {description}
              </p>
              {description.length > 140 && (
                <button
                  className="font-bold text-sm text-stone-500 hidden sm:block"
                  onClick={() => setIsMore(!isMore)}
                >
                  {isMore ? "less" : "more"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="w-full sm:w-[30%] relative h-full">
          {imageId ? (
            <>
              <img
                className="w-full h-[160px] sm:h-[144px] object-cover rounded-[15px] mt-4 sm:mt-0"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                alt={name}
              />
              <AddToCartBtn info={info} resInfo={resInfo} isAbsolute />
            </>
          ) : (
            <AddToCartBtn info={info} resInfo={resInfo} />
          )}
        </div>
      </div>
    </div>
  );
}


function NavBtn({ dir, disabled, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`w-9 h-9 flex justify-center items-center rounded-full cursor-pointer ${
        disabled ? 'bg-gray-100' : 'bg-gray-200'
      } sm:w-10 sm:h-10`}
    >
      <i
        className={`fi fi-rr-arrow-small-${dir} text-2xl mt-1 ${
          disabled ? 'text-gray-300' : 'text-gray-800'
        } sm:text-[28px]`}
      />
    </div>
  );
}


function Discount({ data: { info } }) {
  return (
    <div className="flex items-center gap-2 border rounded-2xl m-2 border-zinc-300 min-w-[300px] h-[72px] p-2 sm:min-w-[328px] sm:h-[76px] sm:m-3">
      <img
        className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px]"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${info.offerLogo}`}
        alt=""
      />
      <div>
        <h2 className="font-bold text-sm sm:text-base">{info.header}</h2>
        <p className="font-bold text-neutral-500 text-xs sm:text-sm">{info.couponCode}</p>
      </div>
    </div>
  );
}


function MenuCard({ card, resInfo }) {
  const [ind, setInd] = useState(true);

  if (card.itemCards) {
    const { title, itemCards } = card;
    
    return (
      <>
        <div className="mt-6 sm:mt-7">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-base sm:text-xl text-zinc-900">
              {title} ({itemCards.length})
            </h1>
            <i
              className={"fi text-lg sm:text-xl cursor-pointer fi-rs-angle-small-" + (ind ? "up" : "down")}
              onClick={() => setInd((p) => !p)}
            />
          </div>
          {ind && <DetailMenu itemCards={itemCards} resInfo={resInfo} />}
        </div>

        <hr className={'my-4 sm:my-5 border-zinc-100 border-' + (card["@type"] ? "[10px]" : "[8px]")} />
      </>
    );
  }

  if (card.categories) {
    return (
      <div className="mt-6 sm:mt-7">
        <h1 className="font-bold text-base sm:text-xl">{card.title}</h1>
        {card.categories.map((c, i) => (
          <MenuCard key={i} card={c} resInfo={resInfo} />
        ))}
      </div>
    );
  }

  return null;
}


function DetailMenu({ itemCards, resInfo }) {
  return (
    <div className="my-5 w-full sm:w-[768px] space-y-6">
      {itemCards.map(({ card: { info } }, index) => (
        <DetailMenuCard key={index} info={info} resInfo={resInfo} />
      ))}
    </div>
  );
}


export default RestaurantMenu;
