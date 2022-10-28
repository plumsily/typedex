import React, { useEffect, useState } from "react";
// import { CSSTransition } from "react-transition-group";
import "./Search.css";

const Search = ({ inputRef, handleSearch }) => {
  return (
    //   <div className="flex flex-col justify-center items-center p-4 bg-gray-400/60 rounded-lg">
    //     <h2 className="">{oppName}</h2>
    //     <img className="" src={oppImgSrc}></img>
    //   </div>
    <div className="flex flex-row justify-self-center w-[70ch] text-base">
      <input
        type="search"
        placeholder="Search Pokemon"
        name="name"
        id="search"
        ref={inputRef}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch(inputRef.current.value.toLowerCase());
          }
        }}
        className="px-2 text-center w-5/6 border border-gray-400"
      ></input>
      <button
        onClick={(event) => handleSearch(inputRef.current.value.toLowerCase())}
        className="w-1/6 border border-gray-400 ml-[-1px] hover:bg-blue-400 hover:text-white"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
