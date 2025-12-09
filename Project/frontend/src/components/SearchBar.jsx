import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] =useState(false)
  useEffect(()=>{
    if(location.pathname.includes("collection")){
      setVisible(true)
    }
  else{
    setVisible(false)
  }
  },[location])

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 flex justify-center py-4">
      <div className="flex items-center gap-3 w-full max-w-2xl sm:w-3/4 px-3">
        <div className="flex items-center gap-3 border border-gray-300 px-4 py-2 rounded-full w-full bg-white shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="flex-1 outline-none bg-transparent text-sm"
            id=""
          />
          <img className="w-4" src={assets.search_icon} alt="" />
        </div>
        <img
          onClick={() => setShowSearch(false)}
          className="w-4 cursor-pointer"
          src={assets.cross_icon}
          alt="Close search"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
