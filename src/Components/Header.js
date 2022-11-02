import React, { useEffect, useState } from "react";

import Search from "./Search";

const Header = ({ inputRef, handleSearch, darkMode, handleDark }) => {
  return (
    <header className="dark:bg-black dark:bg-gray-300/10 fixed grid grid-cols-3 w-screen py-1.5 px-3 justify-between bg-gray-300/10 backdrop-blur-[3px] border-b border-gray-600 shadow">
      <button
        onClick={(event) => window.location.reload()}
        className="w-max dark:text-white text-xl font-medium"
      >
        ⚔️ TYPEDEX
      </button>
      <Search inputRef={inputRef} handleSearch={handleSearch} />
      <button onClick={(event) => handleDark()} className="justify-self-end">
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
};

export default Header;
