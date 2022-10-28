import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import darkpattern from "./Assets/darkpattern.svg";
import lightpattern from "./Assets/lightpattern.svg";

import Viewport from "./Components/Viewport";
import Search from "./Components/Search";

function App() {
  const inputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [oppName, setOppName] = useState("");
  const [oppImgSrc, setOppImgSrc] = useState("");
  const [oppTypes, setOppTypes] = useState("");

  const getAPI = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const result = await response.json();
      setOppName(result.name.toUpperCase());
      setOppImgSrc(result.sprites.other["official-artwork"]["front_default"]);
      let tempTypes = [];
      result.types.forEach((slot) => {
        tempTypes.push(slot.type.name.toUpperCase());
      });
      setOppTypes(tempTypes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (name) => {
    getAPI(name);
    document.getElementById("search").value = "";
  };
  const handleDark = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.style.backgroundImage = `url(${darkpattern})`;
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundImage = `url(${lightpattern})`;
      document.body.style.backgroundColor = "white";
    }
  };

  useEffect(() => {
    // getAPI();
  });

  return (
    <div
      className={`${
        darkMode === true ? "dark" : ""
      } App flex flex-col h-screen items-center`}
    >
      <header className="dark:bg-black dark:bg-gray-300/10 fixed grid grid-cols-3 w-screen py-3 px-4 justify-between bg-gray-300/10 backdrop-blur-[3px] border-b border-gray-500 shadow-lg">
        <h1 className="dark:text-white text-xl font-medium uppercase">
          ⚔️ TypeDex
        </h1>
        <Search inputRef={inputRef} handleSearch={handleSearch} />
        <button onClick={(event) => handleDark()} className="justify-self-end">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>
      <section className="dark:text-white content pt-20 max-w-[70ch] flex flex-col items-center">
        <Viewport oppImgSrc={oppImgSrc} oppName={oppName} oppTypes={oppTypes} />
      </section>
    </div>
  );
}

export default App;
