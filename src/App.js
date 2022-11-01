import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import darkpattern from "./Assets/darkpattern.svg";
import lightpattern from "./Assets/lightpattern.svg";

import Viewport from "./Components/Viewport";
import Header from "./Components/Header";
import Default from "./Components/Default";

function App() {
  const inputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [oppName, setOppName] = useState("");
  const [oppImgSrc, setOppImgSrc] = useState("");
  const [oppTypes, setOppTypes] = useState({});
  const [loaded, setLoaded] = useState(false);

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

      let oppTypeObj = {};
      result1.types.forEach((slot) => {
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

  const handleSearch = (name) => {
    setLoaded(false);
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    getAPI(name);
    document.getElementById("search").value = "";
    return () => {
      clearTimeout(timer);
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

  // useEffect(() => {
  //   setLoaded(false);
  //   if (Object.keys(oppTypes).length) {
  //     const timer = setTimeout(() => {
  //       setLoaded(true);
  //     }, 500);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [oppTypes]);

  return (
    <div
      className={`${
        darkMode === true ? "dark" : ""
      } App flex flex-col h-screen items-center`}
    >
      <Header
        inputRef={inputRef}
        handleSearch={handleSearch}
        darkMode={darkMode}
        handleDark={handleDark}
      />
      {Object.keys(oppTypes).length ? (
        <Viewport
          oppImgSrc={oppImgSrc}
          oppName={oppName}
          oppTypes={oppTypes}
          loaded={loaded}
        />
      ) : (
        <Default />
      )}
    </div>
  );
}

export default App;
