import { useContext, useEffect, useState } from "react";
import { Coordinate } from "../context/contextApi";

function useRestaurantsData() {
    const [topRestaurantData, setTopRestaurantData] = useState([]);
    const [topResTitle, setTopResTitle] = useState("");
    const [onlineTitle, setOnlineTitle] = useState("");
    const [data, setData] = useState([]);
    const [scrollerData, setScrollerData] = useState([]);
    const { coord: { lat, lng } } = useContext(Coordinate);
    async function fetchData() {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
        const res = await response.json();
        let mainData = res?.data?.cards.find(data => data?.card?.card?.id == "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants 
        let mainData2 = res?.data?.cards.find(data => data?.card?.card?.id == "restaurant_grid_listing" || data?.card?.card?.id == "restaurant_grid_listing_v2")?.card?.card?.gridElements?.infoWithStyle?.restaurants 
        setTopRestaurantData(mainData || mainData2);
        setData(res?.data);
        let data2 =  res?.data?.cards.find(data => data?.card?.card?.id == "whats_on_your_mind")?.card?.card?.imageGridCards?.info 
        setOnlineTitle(res?.data?.cards[2]?.card?.card?.title);
        setTopResTitle(res?.data?.cards[1]?.card?.card?.header?.title);
        setScrollerData(data2);
    }

    

    useEffect(() => {
        fetchData();
    }, [lat, lng]);

    return [topRestaurantData,topResTitle,onlineTitle,data,scrollerData]
}

export default useRestaurantsData