import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as solidMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as regularMoon } from "@fortawesome/free-regular-svg-icons";

import Search from "./Search";

const Header = ({ inputRef, handleSearch, darkMode, handleDark }) => {
  return (
    <header className="-mt-1 sm:mt-0 dark:bg-transparent fixed grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 w-full sm:py-1.5 sm:px-3 p-1.5 justify-between bg-gray-300/10 backdrop-blur-[3px] border-b border-gray-600 z-10">
      <button
        onClick={(event) => window.location.reload()}
        className="row-start-1 col-start-1 w-max text-left xl:text-xl md:text-base sm:text-sm text-base dark:text-white font-medium"
      >
        ⚔️ TYPEDEX
      </button>
      <Search inputRef={inputRef} handleSearch={handleSearch} />
      <button
        onClick={(event) => handleDark()}
        className="row-start-1 col-start-1 sm:col-start-3 justify-self-end dark:text-white"
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
