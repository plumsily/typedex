import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import darkpattern from "./Assets/darkpattern.svg";
import lightpattern from "./Assets/lightpattern.svg";

import Viewport from "./Components/Viewport";
import Header from "./Components/Header";
import Default from "./Components/Default";

function App() {
  const searchInputRef = useRef(null);
  const moveInputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [oppName, setOppName] = useState("");
  const [oppImgSrc, setOppImgSrc] = useState("");
  const [oppTypes, setOppTypes] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [moveName, setMoveName] = useState("");
  const [moveType, setMoveType] = useState([]);
  const [loadedMove, setLoadedMove] = useState(false);

  const getAPI = async (name) => {
    try {
      //get Opponent pokemon info
      const responseName = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const resultName = await responseName.json();
      let fixedName =
        resultName.name.charAt(0).toUpperCase() + resultName.name.slice(1);
      setOppName(fixedName);
      setOppImgSrc(
        resultName.sprites.other["official-artwork"]["front_default"]
      );

      let oppTypeObj = {};
      resultName.types.forEach((slot) => {
        oppTypeObj[slot.type.name] = {};
      });

      Object.keys(oppTypeObj).forEach(async (key) => {
        let response = await fetch(`https://pokeapi.co/api/v2/type/${key}`);
        let result = await response.json();
        oppTypeObj[key] = result["damage_relations"];
      });
      setOppTypes(oppTypeObj);
    } catch (error) {
      console.log(error);
    }
  };

  const getMove = async (move) => {
    try {
      const responseMove = await fetch(
        `https://pokeapi.co/api/v2/move/${move}`
      );
      const resultMove = await responseMove.json();
      setMoveType([resultMove.type.name, resultMove["damage_class"].name]);
    } catch (error) {
      console.log(error);
      setMoveType(["Move does not exist!", "Error", "Check"]);
    }
  };

  const handleSearch = (name) => {
    setLoaded(false);
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    getAPI(name);
    setMoveType([]);
    document.getElementById("search").value = "";
    return () => {
      clearTimeout(timer);
    };
  };

  const handleMove = (move) => {
    setLoadedMove(false);
    getMove(move);
    const timerMove = setTimeout(() => {
      setLoadedMove(true);
    }, 200);
    setMoveName(
      document
        .getElementById("move")
        .value.toLowerCase()
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase() + word.slice(1);
        })
        .join(" ")
    );
    document.getElementById("move").value = "";
    return () => {
      clearTimeout(timerMove);
    };
  };

  const handleDark = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem("darkMode", "on");
      document.body.style.backgroundImage = `url(${darkpattern})`;
      document.body.style.backgroundColor = "black";
    } else {
      localStorage.setItem("darkMode", "off");
      document.body.style.backgroundImage = `url(${lightpattern})`;
      document.body.style.backgroundColor = "white";
    }
  };

  useEffect(() => {
    let localDark = localStorage.getItem("darkMode");
    if (localDark) {
      if (localDark === "on") {
        setDarkMode(true);
        document.body.style.backgroundImage = `url(${darkpattern})`;
        document.body.style.backgroundColor = "black";
      } else {
        setDarkMode(false);
        document.body.style.backgroundImage = `url(${lightpattern})`;
        document.body.style.backgroundColor = "white";
      }
    } else {
      localStorage.setItem("darkMode", "off");
      setDarkMode(false);
      document.body.style.backgroundImage = `url(${lightpattern})`;
      document.body.style.backgroundColor = "white";
    }
  }, []);

  return (
    <div
      className={`${
        darkMode === true ? "dark" : ""
      } App flex flex-col h-screen items-center`}
    >
      <Header
        inputRef={searchInputRef}
        handleSearch={handleSearch}
        darkMode={darkMode}
        handleDark={handleDark}
      />
      {Object.keys(oppTypes).length ? (
        <Viewport
          inputRef={moveInputRef}
          oppImgSrc={oppImgSrc}
          oppName={oppName}
          oppTypes={oppTypes}
          loaded={loaded}
          handleMove={handleMove}
          moveName={moveName}
          moveType={moveType}
          loadedMove={loadedMove}
        />
      ) : (
        <Default />
      )}
    </div>
  );
}

export default App;
