import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as solidMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as regularMoon } from "@fortawesome/free-regular-svg-icons";

import Search from "./Search";

const Header = ({ inputRef, handleSearch, darkMode, handleDark }) => {
  return (
    <header className="-mt-1 sm:mt-0 dark:bg-black/80 fixed grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 w-full sm:py-1.5 p-1.5 justify-between bg-gray-100/80 backdrop-blur-[3px] border-b border-gray-400 dark:border-gray-800 z-20">
      <button
        onClick={(event) => {
          window.location.reload();
        }}
        className="row-start-1 col-start-1 w-max text-left xl:text-xl md:text-base sm:text-sm text-lg dark:text-white font-medium"
      >
        ⚔️ TYPEDEX
      </button>
      <Search inputRef={inputRef} handleSearch={handleSearch} />
      <button
        onClick={(event) => handleDark()}
        className="row-start-1 col-start-1 sm:col-start-3 justify-self-end dark:text-white pr-1"
      >
        {darkMode ? (
          <FontAwesomeIcon className="mr-1 sm:mr-0" icon={solidMoon} />
        ) : (
          <FontAwesomeIcon className="m-auto sm:mr-[-3px]" icon={regularMoon} />
        )}
      </button>
    </header>
  );
};

export default Header;
