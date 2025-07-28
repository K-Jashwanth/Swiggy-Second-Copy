import { useContext, useEffect, useState } from 'react';
import SearchRestaurants, { withHoc } from './SearchRestaurants';
import { Coordinate } from '../context/contextApi';
import Dish from './Dish';
import { useDispatch, useSelector } from 'react-redux';
import { ressetSimilarResDish } from '../utils/toggleSlice';
import SearchShimmer from './SearchShimmer';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBtn, setActiveBtn] = useState('Dishes');
  const [isLoading, setIsLoading] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [restaurantsData, setRestaurantData] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarResDishes] = useState([]);
  const { coord: { lat, lng } } = useContext(Coordinate);

  const PromotedRes = withHoc(SearchRestaurants)

  const filterOptions = ['Restaurants', 'Dishes'];
  const {isSimilarResDishes,city,resId,itemId,resLocation} = useSelector((state) => state.toggleSlice.similarResDish)
  const dispatch = useDispatch();

  useEffect(()=> {
    if(isSimilarResDishes){
    fetchSimilarResDishes();
  }
  },[isSimilarResDishes])

  function handleFilterBtn(filtername) {
    setActiveBtn(filtername);
  }

  async function fetchSimilarResDishes() {
    let pathName = `/city${city}/${resLocation}`;
    let encodedPath = encodeURIComponent(pathName);
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest794693%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`);
    const res = await data.json();
    setSelectedResDish(res?.data?.cards[1])
    setSimilarResDishes(res?.data?.cards[2]?.card?.card?.cards);
    dispatch(ressetSimilarResDish())
  }

  async function fetchDishes() {
    setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER`);
    const json = await res.json();
    const finalData = json?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.filter((data) => data?.card?.card?.info);
    setDishes(finalData);
    setIsLoading(false);
  }

  async function fetchRestaurantData() {
    setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=RESTAURANT`);
    const json = await res.json();
    const finalData = json?.data?.cards?.[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter((data) => data?.card?.card?.info) || [];
    setRestaurantData(finalData);
    setIsLoading(false);
  }


  useEffect(() => {
    if (searchQuery === "") return;
    fetchDishes();
    fetchRestaurantData();
  }, [searchQuery]);

  function handleSearchQuery(e) {
    const val = e.target.value;
    if (e.keyCode === 13){
      setSearchQuery(val);
      setSelectedResDish(null)
      setDishes([])
    }
  }

  return (
    <div className="w-full px-4 sm:px-6 md:w-[800px] mx-auto">
      <div className="w-full relative">
        <i className="fi fi-rr-angle-small-left text-2xl ml-2 mt-3 absolute top-1/2 -translate-y-1/2"></i>
        <i className="fi fi-rr-search absolute mt-2 top-1/2 right-0 -translate-y-1/2 mr-5"></i>
        <input
          onKeyDown={handleSearchQuery}
          className="border-2 mt-4 rounded-xl w-full pl-8 py-3 text-lg sm:text-xl focus:outline-none"
          type="text"
          placeholder="Search for restaurants and food"
        />
      </div>

      {!selectedResDish && (
        <div className="flex flex-wrap mt-4 mb-8 items-center gap-2 h-[44px]">
          {filterOptions.map((filtername) => (
            <button
              key={filtername}
              onClick={() => handleFilterBtn(filtername)}
              className={`filter flex items-center gap-2 px-3 py-1 ${activeBtn === filtername ? 'active' : ''}`}
            >
              {filtername}
            </button>
          ))}
        </div>
      )}

      <div className="w-full mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f4f5f7] pb-10">
        {/* If loading, show shimmer */}
        {isLoading ? (
          Array(6).fill(0).map((_, idx) => (
            <SearchShimmer/>
          ))
        ) : selectedResDish ? (
          <>
            <div className="md:col-span-2">
              <p className="p-4 text-lg font-semibold">Item added to cart</p>
              <Dish data={selectedResDish?.card?.card} />
              <p className="p-4 text-lg font-semibold">More dishes from this restaurant</p>
            </div>
            {similarResDishes.map((data, idx) => (
              <Dish
                key={idx}
                data={{ ...data.card, restaurant: selectedResDish?.card?.card?.restaurant }}
                hideRestaurantDetails={true}
              />
            ))}
          </>
        ) : activeBtn === 'Dishes' ? (
          dishes.length > 0 ? (
            dishes.map((data, idx) => (
              <Dish key={idx} data={data?.card?.card} />
            ))
          ) : ( ""          )
        ) : (
          restaurantsData.length > 0 ? (
            restaurantsData.map((data, idx) =>
              data?.card?.card?.info?.promoted ? (
                <PromotedRes key={idx} data={data} />
              ) : (
                <SearchRestaurants key={idx} data={data} />
              )
            )
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );

}

export default Search;
