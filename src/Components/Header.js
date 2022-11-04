import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as solidMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as regularMoon } from "@fortawesome/free-regular-svg-icons";

import Search from "./Search";

const Header = ({ inputRef, handleSearch, darkMode, handleDark }) => {
  return (
    <header className="dark:bg-transparent fixed grid grid-cols-3 w-screen py-1.5 px-3 justify-between bg-gray-300/10 backdrop-blur-[3px] border-b border-gray-600 z-10">
      <button
        onClick={(event) => window.location.reload()}
        className="w-max dark:text-white text-xl font-medium"
      >
        ⚔️ TYPEDEX
      </button>
      <Search inputRef={inputRef} handleSearch={handleSearch} />
      <button
        onClick={(event) => handleDark()}
        className="justify-self-end dark:text-white"
      >
        {/* {darkMode ? "☀️" : "🌙"} */}
        {darkMode ? (
          <FontAwesomeIcon icon={solidMoon} />
        ) : (
          <FontAwesomeIcon className="mr-[-3px]" icon={regularMoon} />
        )}
      </button>
    </header>
  );
};

export default Header;
