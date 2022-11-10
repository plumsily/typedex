import React, { useRef, useState, useEffect } from "react";
import darkpattern from "./Assets/darkpattern.svg";
import lightpattern from "./Assets/lightpattern.svg";

import Viewport from "./Components/Viewport";
import Header from "./Components/Header";
import Default from "./Components/Default";
import Info from "./Components/Info";
import Party from "./Components/Party";

function App() {
  const searchInputRef = useRef(null);
  const moveInputRef = useRef(null);
  const partyInputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [oppName, setOppName] = useState("");
  const [oppImgSrc, setOppImgSrc] = useState("");
  const [oppTypes, setOppTypes] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [moveName, setMoveName] = useState("");
  const [moveType, setMoveType] = useState([]);
  const [stats, setStats] = useState({});
  const [loadedMove, setLoadedMove] = useState(false);
  const [loadInfo, setLoadInfo] = useState(false);
  const [party, setParty] = useState({});

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

      let tempStats = {};
      resultName.stats.forEach((stats) => {
        if (
          stats.stat.name == "defense" ||
          stats.stat.name == "special-defense"
        ) {
          tempStats[stats.stat.name] = stats.base_stat;
        }
      });
      tempStats.ratio = Math.round(
        (tempStats["defense"] /
          (tempStats["defense"] + tempStats["special-defense"])) *
          100
      );
      setStats(tempStats);

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
  const getParty = async (name) => {
    try {
      //get Party pokemon info
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const result = await response.json();
      let partyObj = {};
      partyObj[result.name] = {};
      let fixedName =
        result.name.charAt(0).toUpperCase() + result.name.slice(1);
      partyObj[result.name]["name"] = fixedName;
      partyObj[result.name]["sprite"] = result["sprites"]["front_default"];

      let partyTypeObj = {};
      result.types.forEach((slot) => {
        partyTypeObj[slot.type.name] = {};
      });

      // let tempStats = {};
      // resultName.stats.forEach((stats) => {
      //   if (
      //     stats.stat.name == "defense" ||
      //     stats.stat.name == "special-defense"
      //   ) {
      //     tempStats[stats.stat.name] = stats.base_stat;
      //   }
      // });
      // tempStats.ratio = Math.round(
      //   (tempStats["defense"] /
      //     (tempStats["defense"] + tempStats["special-defense"])) *
      //     100
      // );
      // setStats(tempStats);

      Object.keys(partyTypeObj).forEach(async (key) => {
        let responseDamage = await fetch(
          `https://pokeapi.co/api/v2/type/${key}`
        );
        let resultDamage = await responseDamage.json();
        partyTypeObj[key] = resultDamage["damage_relations"];
      });
      partyObj[result.name]["damage_relations"] = partyTypeObj;
      setParty((party) => ({ ...party, ...partyObj }));
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
    }, 300);
    setMoveName(
      document
        .getElementById("move")
        .value.toLowerCase()
        .match(/\w+\s?\D?\w+/gm)
        .join("")
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

  const handleInfo = () => {
    setLoadInfo(!loadInfo);
  };

  const handleParty = (name) => {
    if (Object.keys(party).length < 6) {
      getParty(name);
      if (localStorage.getItem("party")) {
        let storedParty = JSON.parse(localStorage.getItem("party"));
        let updatedParty = [...storedParty, name];
        localStorage.setItem("party", JSON.stringify(updatedParty));
      } else {
        let storedParty = JSON.stringify([name]);
        localStorage.setItem("party", storedParty);
      }
    }
    document.getElementById("party").value = "";
  };

  const handleDeleteParty = (name) => {
    let storedParty = JSON.parse(localStorage.getItem("party"));
    let updatedParty = storedParty.filter(
      (pokemon) => pokemon != name.toLowerCase()
    );
    localStorage.setItem("party", JSON.stringify(updatedParty));
    delete party[name];
    setParty({ ...party });
  };

  useEffect(() => {
    let localDark = localStorage.getItem("darkMode");
    if (localStorage.getItem("party")) {
      let storedParty = JSON.parse(localStorage.getItem("party"));
      storedParty.forEach((pokemon) => {
        getParty(pokemon);
      });
    }
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

  const colorMap = {
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
    physical: "rgb(12,110,97)",
    special: "rgb(12,74,110)",
    status: "rgb(140,136,140)",
  };

  //   const moveEffect = useRef(null);
  //   useEffect(() => {
  //     moveEffect.current?.scrollIntoView({ behavior: "smooth" });
  //   });

  class Effectivness {
    constructor(element, list) {
      this.element = element;
      this.list = list;
    }
    pushElem(val) {
      this.element.push(
        <li
          style={{ background: colorMap[val] }}
          key={val}
          className="p-1 border border-gray-800 mb-[-1px]"
        >
          {val.toUpperCase()}
        </li>
      );
    }
    pushList(val) {
      this.list.push(val);
    }
  }

  let oppTypeList = [];
  const oppSuperEffective = new Effectivness([], []);
  const oppNotVeryEffective = new Effectivness([], []);
  const oppNotEffective = new Effectivness([], []);

  if (Object.keys(oppTypes).length) {
    Object.keys(oppTypes).forEach((key) => {
      //Show the types of the opponent pokemon
      oppTypeList.push(
        <li
          style={{ background: colorMap[key] }}
          key={key}
          className="py-1 px-3 border border-gray-800 ml-[-1px] w-full"
        >
          {key.toUpperCase()}
        </li>
      );

      if (
        Object.hasOwn(oppTypes[Object.keys(oppTypes)[0]], "double_damage_from")
      ) {
        oppTypes[key]["no_damage_from"].forEach((damage) => {
          oppNotEffective.pushList(damage.name);
        });
        oppTypes[key]["half_damage_from"].forEach((damage) => {
          oppNotVeryEffective.pushList(damage.name);
        });
        oppTypes[key]["double_damage_from"].forEach((damage) => {
          oppSuperEffective.pushList(damage.name);
        });
      }
    });

    const tempSuper = oppSuperEffective.list.filter(
      (type) =>
        !oppNotEffective.list.includes(type) &&
        !oppNotVeryEffective.list.includes(type)
    );
    const tempNotVery = oppNotVeryEffective.list.filter(
      (type) =>
        !oppNotEffective.list.includes(type) &&
        !oppSuperEffective.list.includes(type)
    );
    oppSuperEffective.list = [...new Set(tempSuper)];
    oppNotVeryEffective.list = [...new Set(tempNotVery)];

    oppNotEffective.list.forEach((type) => {
      oppNotEffective.pushElem(type);
    });
    oppNotVeryEffective.list.forEach((type) => {
      oppNotVeryEffective.pushElem(type);
    });
    oppSuperEffective.list.forEach((type) => {
      oppSuperEffective.pushElem(type);
    });
  }

  return (
    <div
      className={`${
        darkMode === true ? "dark" : ""
      } App relative flex flex-col w-screen items-center`}
    >
      <Header
        inputRef={searchInputRef}
        handleSearch={handleSearch}
        darkMode={darkMode}
        handleDark={handleDark}
      />
      {oppName ? (
        loaded ? (
          <Viewport
            inputRef={moveInputRef}
            oppImgSrc={oppImgSrc}
            oppName={oppName}
            oppTypes={oppTypes}
            stats={stats}
            loaded={loaded}
            handleMove={handleMove}
            moveName={moveName}
            moveType={moveType}
            loadedMove={loadedMove}
            handleInfo={handleInfo}
            colorMap={colorMap}
            oppSuperEffective={oppSuperEffective}
            oppNotVeryEffective={oppNotVeryEffective}
            oppNotEffective={oppNotEffective}
            oppTypeList={oppTypeList}
          />
        ) : (
          <></>
        )
      ) : (
        <Default />
      )}
      <Party
        loaded={loaded}
        stats={stats}
        inputRef={partyInputRef}
        party={party}
        handleParty={handleParty}
        handleDeleteParty={handleDeleteParty}
        colorMap={colorMap}
      />
      <Info handleInfo={handleInfo} loadInfo={loadInfo} />
    </div>
  );
}

export default App;
