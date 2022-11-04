import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import "./Viewport.css";

const Viewport = ({
  inputRef,
  oppImgSrc,
  oppName,
  oppTypes,
  stats,
  loaded,
  handleMove,
  moveName,
  moveType,
  loadedMove,
  handleInfo,
  colorMap,
  oppSuperEffective,
  oppNotVeryEffective,
  oppNotEffective,
  oppTypeList,
}) => {
  //   const colorMap = {
  //     normal: "rgb(170,170,153)",
  //     fire: "rgb(255,68,34)",
  //     water: "rgb(51,153,255)",
  //     electric: "rgb(255,204,51)",
  //     grass: "rgb(119,204,85)",
  //     ice: "rgb(102,204,255)",
  //     fighting: "rgb(187,85,68)",
  //     poison: "rgb(170,85,153)",
  //     ground: "rgb(221,187,85)",
  //     flying: "rgb(136,153,255)",
  //     psychic: "rgb(255,85,153)",
  //     bug: "rgb(170,187,34)",
  //     rock: "rgb(187,170,102)",
  //     ghost: "rgb(102,102,187)",
  //     dragon: "rgb(119,102,238)",
  //     dark: "rgb(119,85,68)",
  //     steel: "rgb(170,170,187)",
  //     fairy: "rgb(238,153,238)",
  //     physical: "rgb(12,110,97)",
  //     special: "rgb(12,74,110)",
  //     status: "rgb(140,136,140)",
  //   };

  //   //   const moveEffect = useRef(null);
  //   //   useEffect(() => {
  //   //     moveEffect.current?.scrollIntoView({ behavior: "smooth" });
  //   //   });

  //   class Effectivness {
  //     constructor(element, list) {
  //       this.element = element;
  //       this.list = list;
  //     }
  //     pushElem(val) {
  //       this.element.push(
  //         <li
  //           style={{ background: colorMap[val] }}
  //           key={val}
  //           className="p-1 border border-gray-800 mb-[-1px]"
  //         >
  //           {val.toUpperCase()}
  //         </li>
  //       );
  //     }
  //     pushList(val) {
  //       this.list.push(val);
  //     }
  //   }

  //   let oppTypeList = [];
  //   const oppSuperEffective = new Effectivness([], []);
  //   const oppNotVeryEffective = new Effectivness([], []);
  //   const oppNotEffective = new Effectivness([], []);

  //   if (Object.keys(oppTypes).length) {
  //     Object.keys(oppTypes).forEach((key) => {
  //       //Show the types of the opponent pokemon
  //       oppTypeList.push(
  //         <li
  //           style={{ background: colorMap[key] }}
  //           key={key}
  //           className="py-1 px-3 border border-gray-800 ml-[-1px] w-full"
  //         >
  //           {key.toUpperCase()}
  //         </li>
  //       );

  //       if (
  //         Object.hasOwn(oppTypes[Object.keys(oppTypes)[0]], "double_damage_from")
  //       ) {
  //         oppTypes[key]["no_damage_from"].forEach((damage) => {
  //           oppNotEffective.pushList(damage.name);
  //         });
  //         oppTypes[key]["half_damage_from"].forEach((damage) => {
  //           oppNotVeryEffective.pushList(damage.name);
  //         });
  //         oppTypes[key]["double_damage_from"].forEach((damage) => {
  //           oppSuperEffective.pushList(damage.name);
  //         });
  //       }
  //     });

  //     const tempSuper = oppSuperEffective.list.filter(
  //       (type) =>
  //         !oppNotEffective.list.includes(type) &&
  //         !oppNotVeryEffective.list.includes(type)
  //     );
  //     const tempNotVery = oppNotVeryEffective.list.filter(
  //       (type) =>
  //         !oppNotEffective.list.includes(type) &&
  //         !oppSuperEffective.list.includes(type)
  //     );
  //     oppSuperEffective.list = [...new Set(tempSuper)];
  //     oppNotVeryEffective.list = [...new Set(tempNotVery)];

  //     oppNotEffective.list.forEach((type) => {
  //       oppNotEffective.pushElem(type);
  //     });
  //     oppNotVeryEffective.list.forEach((type) => {
  //       oppNotVeryEffective.pushElem(type);
  //     });
  //     oppSuperEffective.list.forEach((type) => {
  //       oppSuperEffective.pushElem(type);
  //     });
  //   }

  if (stats.ratio && loaded) {
    setTimeout(() => {
      document.getElementById("defense-stat").style.width = `${stats.ratio}%`;
      document.getElementById("sp-defense-stat").style.width = `${
        100 - stats.ratio
      }%`;
    }, 100);
  }

  return (
    <CSSTransition
      in={loaded}
      timeout={{ enter: 100 }}
      classNames="viewport"
      appear
      unmountOnExit
    >
      <section className="dark:text-white content pt-[5.5rem] sm:pt-16 flex flex-col items-center 2xl:text-base xl:text-sm text-xs mb-1.5 w-screen p-1.5 sm:p-0">
        <div className="flex flex-col justify-center p-1.5 bg-yellow-200/10 dark:bg-gray-400/10 backdrop-blur-[2px] border border-gray-600 sm:w-[70ch]">
          <div className="flex sm:flex-row gap-1.5 justify-between mb-6 flex-col">
            <a
              href={`https://bulbapedia.bulbagarden.net/wiki/${oppName}_(Pok%C3%A9mon)`}
              className="xl:text-2xl text-lg dark:bg-transparent dark:hover:bg-cyan-500 px-2.5 py-0.5 w-full sm:w-max text-center hover:bg-black hover:text-white border bg-yellow-200 border-gray-600 transition-all"
              target="_blank"
            >
              {oppName.toUpperCase()}
            </a>
            <ul className="text-center text-white flex flex-row h-fit w-full sm:w-[173.922px] xl:w-[231.929px] 2xl:w-[295.125px]">
              {oppTypeList}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-14 gap-6 mb-7">
            <figure className="flex self-center w-full sm:ml-8 sm:w-[475px] sm:h-[475px]">
              <img
                className="self-center drop-shadow-lg dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                src={oppImgSrc}
              ></img>
            </figure>
            <div className="flex flex-col gap-6 flex-auto">
              <div className="flex flex-col gap-1.5">
                <h2>✔️ Super effective types:</h2>
                <ul className="text-center text-white">
                  {oppSuperEffective.element}
                </ul>
              </div>
              <div className="flex flex-col gap-1.5">
                <h2>🟡 Not very effective types:</h2>
                <ul className="text-center text-white">
                  {oppNotVeryEffective.element}
                </ul>
              </div>
              <div className="flex flex-col gap-1.5">
                <h2>❌ No effect types:</h2>
                <ul className="text-center text-white">
                  {oppNotEffective.element}
                </ul>
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="flex justify-between">
                  🛡️ Defense / Special Defense:{" "}
                  <button
                    onClick={(event) => handleInfo()}
                    className="mr-0.5 text-gray-800 dark:text-white self-start"
                  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </button>
                </h2>
                <div className="flex flex-row text-center text-white w-full">
                  <span
                    id="defense-stat"
                    style={{ background: colorMap["physical"] }}
                    className={`py-1 px-3 border border-gray-800 ml-[-1px]`}
                  >
                    {stats.defense}
                  </span>
                  <span
                    id="sp-defense-stat"
                    style={{ background: colorMap["special"] }}
                    className={`py-1 px-3 border border-gray-800 ml-[-1px]`}
                  >
                    {stats["special-defense"]}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-last mt-1.5 dark:text-white flex flex-col gap-1.5 sm:gap-0 sm:flex-row justify-self-center">
            <input
              type="search"
              placeholder="Check your move against this Pokémon!"
              name="move"
              id="move"
              ref={inputRef}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleMove(
                    inputRef.current.value
                      .toLowerCase()
                      .match(/\w+\s?\D?\w+/gm)
                      .join("")
                      .replace(/\s/, "-"),
                    "+"
                  );
                }
              }}
              className="rounded-none dark:text-white grow py-2 bg-white dark:bg-transparent sm:py-1 px-2 text-center xl:w-5/6 border border-gray-600"
            ></input>
            <button
              onClick={(event) =>
                handleMove(
                  inputRef.current.value
                    .toLowerCase()
                    .match(/\w+\s?\D?\w+/gm)
                    .join("")
                    .replace(/\s/, "-"),
                  "+"
                )
              }
              className="xl:w-1/6 w-full py-2 sm:py-0 sm:w-[92.5312px] border border-gray-600 sm:ml-[-1px] transition-all bg-black dark:bg-cyan-500 text-white sm:text-black sm:bg-transparent dark:hover:bg-cyan-500 hover:text-white hover:bg-black sm:dark:text-white sm:dark:bg-transparent"
            >
              Search
            </button>
          </div>
          {moveType.length ? (
            <CSSTransition
              in={loadedMove}
              timeout={{ enter: 100 }}
              classNames="move"
              appear
              unmountOnExit
            >
              <div
                // ref={moveEffect}
                className="order-0 flex flex-col sm:flex-row gap-1.5 sm:mt-1.5"
              >
                <span className="order-last sm:order-0 w-full sm:w-auto sm:grow sm:py-1 py-2 border border-gray-600 self-center text-center">
                  {moveType.length !== 3
                    ? moveType[1] != "status"
                      ? oppSuperEffective.list.includes(moveType[0])
                        ? `✔️ ${moveName} is super effective!`
                        : oppNotVeryEffective.list.includes(moveType[0])
                        ? `🟡 ${moveName} is not very effective...`
                        : oppNotEffective.list.includes(moveType[0])
                        ? `❌ ${moveName} has no effect.`
                        : `${moveName} has normal damage.`
                      : `${moveName} is a status effect move.`
                    : moveType[0]}
                </span>
                <div className="order-0 sm:order-last text-center text-white flex flex-row h-fit w-full sm:w-[173.922px] xl:w-[231.929px] 2xl:w-[295.125px]">
                  <span
                    style={{
                      background:
                        moveType.length !== 3
                          ? moveType[1] !== "physical"
                            ? colorMap[moveType[0]]
                            : colorMap[moveType[1]]
                          : "transparent",
                    }}
                    className={`w-1/2 sm:w-auto sm:grow p-1 border border-gray-800 ${
                      moveType.length !== 3 ? "text-white" : "text-black"
                    } dark:text-white text-center`}
                  >
                    {moveType.length !== 3
                      ? moveType[1] !== "physical"
                        ? moveType[0].toUpperCase()
                        : moveType[1].toUpperCase()
                      : moveType[1].toUpperCase()}
                  </span>
                  <span
                    style={{
                      background:
                        moveType.length !== 3
                          ? moveType[1] !== "special"
                            ? colorMap[moveType[0]]
                            : colorMap[moveType[1]]
                          : "transparent",
                    }}
                    className={`w-1/2 xl:w-[126.812px] 2xl:w-[146.328px] py-1 px-3 border border-gray-800 ml-[-1px] ${
                      moveType.length !== 3 ? "text-white" : "text-black"
                    } dark:text-white`}
                  >
                    {moveType.length !== 3
                      ? moveType[1] !== "special"
                        ? moveType[0].toUpperCase()
                        : moveType[1].toUpperCase()
                      : moveType[1].toUpperCase()}
                  </span>
                </div>
              </div>
            </CSSTransition>
          ) : (
            <></>
          )}
        </div>
      </section>
    </CSSTransition>
  );
};

export default Viewport;
