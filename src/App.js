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
  const [oppWeakness, setOppWeakness] = useState({});

  const typeColors = {
    normal: "rgb(170,170,153)",
    fire: "rgb(255,68,34)",
    water: "rgb(51,153,255)",
    electric: "rgb(255,204,51)",
    grass: "rgb(119,204,85)",
    ice: "rgb(102,204,255)",
    fighting: "rgb(187,85,68)",
    poison: "rgb(170,85,153)",
    ground: "rgb(221,187,85)",
    flying: "rgb(136,153,255)",
    psychic: "rgb(255,85,153)",
    bug: "rgb(170,187,34)",
    rock: "rgb(187,170,102)",
    ghost: "rgb(102,102,187)",
    dragon: "rgb(119,102,238)",
    dark: "rgb(119,85,68)",
    steel: "rgb(170,170,187)",
    fairy: "rgb(238,153,238)",
  };

  const getAPI = async (name) => {
    try {
      //get Opponent pokemon info
      const response1 = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const result1 = await response1.json();
      let fixedName =
        result1.name.charAt(0).toUpperCase() + result1.name.slice(1);
      setOppName(fixedName);
      setOppImgSrc(result1.sprites.other["official-artwork"]["front_default"]);
      let tempTypes = [];
      result1.types.forEach((slot) => {
        tempTypes.push(slot.type.name);
        // tempTypes[slot.type.name] = typeColors[slot.type.name];
      });
      setOppTypes(tempTypes);

      //get type information
      const response2 = await fetch(
        `https://pokeapi.co/api/v2/type/${tempTypes[0]}`
      );
      const result2 = await response2.json();
      setOppWeakness(result2["damage_relations"]);
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
    document.body.style.backgroundImage = `url(${lightpattern})`;
    document.body.style.backgroundColor = "white";
    setDarkMode(false);
    // getAPI();
  }, []);

  return (
    <div
      className={`${
        darkMode === true ? "dark" : ""
      } App flex flex-col h-screen items-center`}
    >
      <header className="dark:bg-black dark:bg-gray-300/10 fixed grid grid-cols-3 w-screen py-3 px-4 justify-between bg-gray-300/10 backdrop-blur-[3px] border-b border-gray-500 shadow-lg">
        <h1 className="dark:text-white text-xl font-medium uppercase cursor-default">
          ⚔️ TypeDex
        </h1>
        <Search inputRef={inputRef} handleSearch={handleSearch} />
        <button onClick={(event) => handleDark()} className="justify-self-end">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>
      <section className="dark:text-white content pt-20 max-w-[70ch] flex flex-col items-center">
        <Viewport
          oppImgSrc={oppImgSrc}
          oppName={oppName}
          oppTypes={oppTypes}
          oppWeakness={oppWeakness}
        />
      </section>
    </div>
  );
}

export default App;
