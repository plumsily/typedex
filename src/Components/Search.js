import React, { useEffect, useState } from "react";
// import { CSSTransition } from "react-transition-group";
import "./Search.css";

const Search = ({ inputRef, handleSearch }) => {
  return (
    //   <div className="flex flex-col justify-center items-center p-4 bg-gray-400/60 rounded-lg">
    //     <h2 className="">{oppName}</h2>
    //     <img className="" src={oppImgSrc}></img>
    //   </div>
    <div className="dark:text-white flex flex-row justify-self-center w-[70ch]">
      <input
        type="search"
        placeholder="Search Pokémon"
        name="name"
        id="search"
        ref={inputRef}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch(inputRef.current.value.toLowerCase());
          }
        }}
        className="dark:text-white dark:bg-black px-2 text-center text-sm w-5/6 border border-gray-600"
      ></input>
      <button
        onClick={(event) => handleSearch(inputRef.current.value.toLowerCase())}
        className="w-1/6 border text-sm border-gray-600 ml-[-1px] transition-all dark:hover:bg-cyan-500 hover:text-white hover:bg-black"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
