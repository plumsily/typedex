import React from "react";
import "./Search.css";

const Search = ({ inputRef, handleSearch }) => {
  return (
    <div className="row-start-2 sm:row-start-1 col-start-1 sm:col-start-2 dark:text-white flex flex-row sm:justify-self-center lg:w-[70ch] md:w-[50ch] sm:w-[380px] w-full 2xl:text-base xl:text-sm text-xs -mr-[1px]">
      <input
        type="search"
        placeholder="Search Pokémon"
        name="name"
        id="search"
        ref={inputRef}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch(
              inputRef.current.value
                .toLowerCase()
                .match(/\w+\s?\D?\w+/gm)
                .join("")
            );
          }
        }}
        className=" dark:focus:bg-black focus:bg-white focus:outline focus:outline-2 dark:focus:outline-purple-400/80 focus:-outline-offset-[3px] focus:outline-[rgba(192,252,132,1)] rounded-none dark:text-white dark:bg-black/60 bg-white/60 sm:py-0.5 py-2 px-2 text-center md:w-5/6 w-3/4 border border-gray-500 dark:border-gray-700"
      ></input>
      <button
        onClick={(event) =>
          handleSearch(
            inputRef.current.value
              .toLowerCase()
              .match(/\w+\s?\D?\w+/gm)
              .join("")
          )
        }
        className="uppercase bg-[rgba(192,252,132,0.7)] dark:bg-purple-400/30 md:w-1/6 w-1/4 border border-gray-500 dark:border-gray-700 border-l-0 transition-all dark:hover:bg-purple-400 hover:text-white hover:bg-black"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
