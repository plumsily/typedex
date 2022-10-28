import React, { useRef, useState, useEffect } from "react";
import "./App.css";

import Viewport from "./Components/Viewport";
import Search from "./Components/Search";

function App() {
  const inputRef = useRef(null);
  const [oppName, setOppName] = useState("");
  const [oppImgSrc, setOppImgSrc] = useState("");
  const [oppTypes, setOppTypes] = useState("");

  const getAPI = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const result = await response.json();
      let fixedName = result.name;
      setOppName(fixedName.charAt(0).toUpperCase() + fixedName.slice(1));
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

  useEffect(() => {
    // getAPI();
  });

  return (
    <div className="App flex flex-col h-screen items-center">
      <header className="fixed grid grid-cols-3 w-screen py-3 px-4 justify-between bg-gray-300/20 backdrop-blur-sm border-b border-gray-400 shadow-md">
        <h1 className="text-lg font-medium drop-shadow">⚔️ typeDex</h1>
        <Search inputRef={inputRef} handleSearch={handleSearch} />
        <button className="justify-self-end">🌙</button>
      </header>
      <section className="content pt-20 max-w-[70ch] flex flex-col items-center">
        <Viewport oppImgSrc={oppImgSrc} oppName={oppName} oppTypes={oppTypes} />
      </section>
    </div>
  );
}

export default App;
