import React from "react";
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
      <section className="dark:text-white content pt-[5.1rem] sm:pt-[3.5rem] flex flex-col items-center 2xl:text-base xl:text-sm text-xs mb-1.5 w-screen p-1.5 sm:p-0">
        <div className="flex flex-col justify-center p-1.5 bg-gradient-to-t from-gray-300/20 dark:from-gray-800/50 backdrop-blur-[2.5px] border border-gray-400 dark:border-gray-800 sm:w-[70ch]">
          <div className="flex sm:flex-row sm:gap-3 gap-2 justify-between mb-6 flex-row">
            <a
              href={`https://bulbapedia.bulbagarden.net/wiki/${oppName}_(Pok%C3%A9mon)`}
              className="xl:text-3xl text-xl  dark:hover:bg-purple-400 w-full px-1 py-0 sm:py-0.5 sm:px-2 sm:w-max text-center hover:bg-black hover:text-white border-0 border-gray-500 dark:border-gray-700 transition-all flex flex-row justify-start sm:justify-start"
              target="_blank"
            >
              <FontAwesomeIcon
                className="sm:text-sm text-xs mr-1.5 self-center"
                icon={faCircleInfo}
              />
              {oppName.toUpperCase()}
            </a>
            <ul className="text-center text-white flex flex-row h-fit shrink sm:w-[173.922px] xl:w-[231.929px] 2xl:w-[295.125px] self-start sm:self-start divide-x">
              {oppTypeList}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-14 gap-6 ">
            <figure className="flex self-center w-full sm:ml-8 sm:w-[475px] sm:h-[475px]">
              <img
                className="self-center drop-shadow-lg dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
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
                    <FontAwesomeIcon
                      className="hover:text-[rgba(192,252,132,1)] dark:hover:text-purple-400 transition-all"
                      icon={faCircleInfo}
                    />
                  </button>
                </h2>
                <div className="flex flex-row text-center text-white w-full">
                  <span
                    id="defense-stat"
                    style={{ background: colorMap["physical"] }}
                    className={`py-1 px-3 border border-gray-700`}
                  >
                    {stats.defense}
                  </span>
                  <span
                    id="sp-defense-stat"
                    style={{ background: colorMap["special"] }}
                    className={`py-1 px-3 border border-l-0 border-gray-700`}
                  >
                    {stats["special-defense"]}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7 order-last dark:text-white flex flex-col gap-1.5 sm:gap-0 sm:flex-row justify-self-center">
            <input
              type="search"
              placeholder="Search a move against this Pokémon!"
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
              className="focus:outline focus:outline-2 dark:focus:outline-purple-400 focus:-outline-offset-[3px] focus:outline-[rgba(192,252,132,1)] rounded-none dark:text-white grow py-2 bg-white dark:bg-black sm:py-0.5 px-2 text-center sm:w-4/6 border border-gray-500 dark:border-gray-700"
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
              className="sm:w-[173.922px] xl:w-[231.929px] 2xl:w-[295.125px] w-full py-2 sm:py-0 border border-gray-600 sm:ml-[-1px] transition-all bg-[rgba(192,252,132,0.7)] dark:bg-purple-400/20 sm:text-black dark:hover:bg-purple-400 hover:text-white hover:bg-black dark:text-white uppercase"
            >
              Search Move
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
              <div className="order-0 flex flex-col sm:flex-row gap-1.5">
                <span className="effect order-last sm:order-0 w-full sm:w-auto sm:grow sm:py-1 py-2 border border-gray-600 self-center text-center outline outline-2 dark:outline-purple-400/80 -outline-offset-[3px] outline-[rgba(192,252,132,1)]">
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
                    className={`w-1/2 sm:w-auto sm:grow p-1 border border-t-0 border-gray-800 ${
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
                    className={`w-1/2 xl:w-[126.812px] 2xl:w-[146.328px] py-1 px-3 border border-t-0 border-l-0 border-gray-800  ${
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
