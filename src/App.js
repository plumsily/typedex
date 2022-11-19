import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import darkpattern from "./Assets/darkpattern.svg";
import lightpattern from "./Assets/lightpattern.svg";

import Viewport from "./Components/Viewport";
import Header from "./Components/Header";
import Default from "./Components/Default";
import Info from "./Components/Info";
import Party from "./Components/Party";
import PartyInfo from "./Components/PartyInfo";

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
  const [partyLoad, setPartyLoad] = useState(false);
  const [partyLoadInfo, setPartyLoadInfo] = useState(false);
  // const [effectLoad, setEffectLoad] = useState(false);

  const colorMap = {
    normal: "rgba(170,170,153,0.9)",
    fire: "rgba(255,68,34,0.9)",
    water: "rgba(51,153,255,0.9)",
    electric: "rgba(255,204,51,0.9)",
    grass: "rgba(119,204,85,0.9)",
    ice: "rgba(102,204,255,0.9)",
    fighting: "rgba(187,85,68,0.9)",
    poison: "rgba(170,85,153,0.9)",
    ground: "rgba(221,187,85,0.9)",
    flying: "rgba(136,153,255,0.9)",
    psychic: "rgba(255,85,153,0.9)",
    bug: "rgba(170,187,34,0.9)",
    rock: "rgba(187,170,102,0.9)",
    ghost: "rgba(102,102,187,0.9)",
    dragon: "rgba(119,102,238,0.9)",
    dark: "rgba(119,85,68,0.9)",
    steel: "rgba(170,170,187,0.9)",
    fairy: "rgba(238,153,238,0.9)",
    physical: "rgba(12,110,97,0.9)",
    special: "rgba(12,74,110,0.9)",
    status: "rgba(140,136,140,0.9)",
  };

  class Effectiveness {
    constructor(element, list, set) {
      this.element = element;
      this.list = list;
      this.set = set;
    }
    pushElem(val) {
      this.element.push(
        <li
          style={{ background: colorMap[val] }}
          key={val}
          className="p-1 border border-gray-700 mb-[-1px] dark:grayscale-[30%]"
        >
          {val.toUpperCase()}
        </li>
      );
    }
    pushList(val) {
      this.list.push(val);
    }
    setMatch(val) {
      this.set.push(val);
    }
    reset() {
      this.element = [];
      this.list = [];
      this.set = [];
    }
  }
  let oppTypeList = [];
  const oppSuperEffective = new Effectiveness([], [], []);
  const oppNotVeryEffective = new Effectiveness([], [], []);
  const oppNotEffective = new Effectiveness([], [], []);

  const partySuperEffective = new Effectiveness([], [], []);
  const partyNotVeryEffective = new Effectiveness([], [], []);
  const partyNotEffective = new Effectiveness([], [], []);

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
      document.getElementById("search").value = "";
      setOppTypes(oppTypeObj);
      return true;
    } catch (error) {
      console.log(error);
      let wrongName = document.getElementById("search").value;
      document.getElementById("search").value = "";
      alert(wrongName + " doesn't exist or is misspelled.");
      return false;
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

      Object.keys(partyTypeObj).forEach(async (key) => {
        let responseDamage = await fetch(
          `https://pokeapi.co/api/v2/type/${key}`
        );
        let resultDamage = await responseDamage.json();
        partyTypeObj[key] = resultDamage["damage_relations"];
      });
      partyObj[result.name]["damage_relations"] = partyTypeObj;

      partyObj[result.name]["matchup"] = 0;
      document.getElementById("party").value = "";
      setParty((party) => ({ ...party, ...partyObj }));
      setPartyLoad(!partyLoad);
      return true;
    } catch (error) {
      console.log(error);
      let wrongName = document.getElementById("party").value;
      document.getElementById("party").value = "";
      alert(wrongName + " doesn't exist or is misspelled.");
      return false;
    }
  };

  const getMove = async (move) => {
    try {
      const responseMove = await fetch(
        `https://pokeapi.co/api/v2/move/${move}`
      );
      const resultMove = await responseMove.json();
      setMoveType([resultMove.type.name, resultMove["damage_class"].name]);
      return true;
    } catch (error) {
      console.log(error);
      setMoveType([]);
      return false;
    }
  };
  // let effectLoad = false;
  const handleSearch = async (name) => {
    setLoaded(false);
    const searchState = await getAPI(name);
    setMoveType([]);
    if (searchState) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
  };

  const handleMove = async (move) => {
    setLoadedMove(false);
    const moveState = await getMove(move);
    if (moveState) {
      setLoadedMove(true);
    } else {
      alert("Move does not exist or is misspelled!");
    }

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
  const handlePartyInfo = () => {
    setPartyLoadInfo(!partyLoadInfo);
  };

  const handleParty = async (name) => {
    if (Object.keys(party).length < 6) {
      const result = await getParty(name);
      if (result) {
        if (JSON.parse(localStorage.getItem("party"))) {
          if (JSON.parse(localStorage.getItem("party")).length) {
            let storedParty = JSON.parse(localStorage.getItem("party"));
            let updatedParty = [...storedParty, name];
            localStorage.setItem("party", JSON.stringify(updatedParty));
          } else {
            let storedParty = JSON.stringify([name]);
            localStorage.setItem("party", storedParty);
          }
        } else {
          let storedParty = JSON.stringify([name]);
          localStorage.setItem("party", storedParty);
        }
      }
    }
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
    if (JSON.parse(localStorage.getItem("party"))) {
      if (JSON.parse(localStorage.getItem("party")).length) {
        let storedParty = JSON.parse(localStorage.getItem("party"));
        storedParty.forEach((pokemon) => {
          getParty(pokemon);
        });
      }
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
    document.getElementById("party").value = "";
    document.getElementById("search").value = "";
  }, []);

  //parameter types will be an object of type names and their corresponding damage relations for each party pokemon
  const assignEffectiveness = async (
    types,
    relation,
    notEffective,
    notVeryEffective,
    superEffective
  ) => {
    Object.keys(types).forEach((key) => {
      if (relation === "opp") {
        oppTypeList.push(
          <li
            style={{ background: colorMap[key] }}
            key={key}
            className="py-1 px-3 border border-gray-700 ml-[-1px] w-full dark:grayscale-[30%]"
          >
            {key.toUpperCase()}
          </li>
        );
      }
      if (Object.hasOwn(types[Object.keys(types)[0]], "double_damage_from")) {
        types[key]["no_damage_from"].forEach((damage) => {
          notEffective.pushList(damage.name);
        });
        types[key]["half_damage_from"].forEach((damage) => {
          notVeryEffective.pushList(damage.name);
        });
        types[key]["double_damage_from"].forEach((damage) => {
          superEffective.pushList(damage.name);
        });
      }
    });

    const tempSuper = superEffective.list.filter(
      (type) =>
        !notEffective.list.includes(type) &&
        !notVeryEffective.list.includes(type)
    );
    const tempNotVery = notVeryEffective.list.filter(
      (type) =>
        !notEffective.list.includes(type) && !superEffective.list.includes(type)
    );
    superEffective.list = [...new Set(tempSuper)];
    notVeryEffective.list = [...new Set(tempNotVery)];

    if (relation === "party") {
      notEffective.list.forEach((type) => {
        notEffective.setMatch(type);
      });
      notVeryEffective.list.forEach((type) => {
        notVeryEffective.setMatch(type);
      });
      superEffective.list.forEach((type) => {
        superEffective.setMatch(type);
      });
    } else {
      notEffective.list.forEach((type) => {
        notEffective.pushElem(type);
        notEffective.setMatch(type);
      });
      notVeryEffective.list.forEach((type) => {
        notVeryEffective.pushElem(type);
        notVeryEffective.setMatch(type);
      });
      superEffective.list.forEach((type) => {
        superEffective.pushElem(type);
        superEffective.setMatch(type);
      });
    }
  };

  if (Object.keys(oppTypes).length) {
    assignEffectiveness(
      oppTypes,
      "opp",
      oppNotEffective,
      oppNotVeryEffective,
      oppSuperEffective
    );
  }

  useEffect(() => {
    // const timer = setTimeout(() => {
    if (Object.keys(oppTypes).length) {
      if (Object.keys(party).length) {
        Object.keys(party).forEach((pokemon) => {
          let counter = 0;
          partyNotEffective.reset();
          partyNotVeryEffective.reset();
          partySuperEffective.reset();
          assignEffectiveness(
            party[pokemon]["damage_relations"],
            "party",
            partyNotEffective,
            partyNotVeryEffective,
            partySuperEffective
          );

          //Checks party effectiveness against opponent type - does not need to iterate through each of the party pokemon's type.
          if (Object.keys(oppTypes).length < 2) {
            if (partySuperEffective.set.includes(Object.keys(oppTypes)[0])) {
              counter -= 3;
              // console.log("subtracted 3 " + counter + " ");
            }
            if (partyNotEffective.set.includes(Object.keys(oppTypes)[0])) {
              counter += 2;
              // console.log("added 2 " + counter + " ");
            }
            if (partyNotVeryEffective.set.includes(Object.keys(oppTypes)[0])) {
              counter += 1;
              // console.log("added 1 " + counter + " ");
            }
          } else {
            if (
              partySuperEffective.set.includes(Object.keys(oppTypes)[0]) ||
              partySuperEffective.set.includes(Object.keys(oppTypes)[1])
            ) {
              counter -= 3;
              // console.log("subtracted 3 " + counter + " ");
            }
            if (
              partyNotEffective.set.includes(Object.keys(oppTypes)[0]) ||
              partyNotEffective.set.includes(Object.keys(oppTypes)[1])
            ) {
              counter += 2;
              // console.log("added 2 " + counter + " ");
            }
            if (
              partyNotVeryEffective.set.includes(Object.keys(oppTypes)[0]) ||
              partyNotVeryEffective.set.includes(Object.keys(oppTypes)[1])
            ) {
              counter += 1;
              // console.log("added 1 " + counter + " ");
            }
          }

          Object.keys(party[pokemon]["damage_relations"]).forEach((type) => {
            if (oppSuperEffective.set.includes(type)) {
              counter += 3;
              // console.log("added 3 " + counter + " " + type);
            }
            if (oppNotEffective.set.includes(type)) {
              counter -= 3;
              // console.log("subtracted 3 " + counter + " " + type);
            }
            if (oppNotVeryEffective.set.includes(type)) {
              counter -= 1;
              // console.log("subtracted 1 " + counter + " " + type);
            }
          });
          // console.log(pokemon + counter);
          party[pokemon].matchup = counter;
          setParty({ ...party });
        });
      }
    }
    // }, 300);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [loaded, partyLoad]);

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
        handlePartyInfo={handlePartyInfo}
      />
      <a
        href="https://github.com/plumsily"
        target="_blank"
        className="text-xs text-gray-400 mb-4 flex flex-row justify-center"
      >
        Created by plumsily
        <FontAwesomeIcon
          className="text-[12px] ml-1.5 self-center"
          icon={faCircleInfo}
        />
      </a>
      <Info handleInfo={handleInfo} loadInfo={loadInfo} />
      <PartyInfo
        handlePartyInfo={handlePartyInfo}
        partyLoadInfo={partyLoadInfo}
      />
    </div>
  );
}

export default App;
