import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.module.css"; 

export default function Home() {
  const [trendingItems, setTrendingItems] = useState([]);

  useEffect(() => {
    getTrendingItems();
  }, []);

  let getTrendingItems = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=c636ed7787cc302d96bf88ccf334e0d8"
    );
    setTrendingItems(data.results);
  };

  return (
    <>
      <div className="row my-3 py-5">
        <div className="col-md-4">
          <div>
            <div className="border-top w-25 mb-4"></div>
            <h3>Trending</h3>
            <h3>Movies</h3>
            <h3>To watch now</h3>
            <span className="text-muted">most watched movies by day</span>
            <div className="border-top mt-4 w-100"></div>
          </div>
        </div>
        {trendingItems.map((item, index) => (
          <div key={index} className="col-md-2">
            <div className="item">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt=""
              />
              <h6>
                {item.title}
                {item.name}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
