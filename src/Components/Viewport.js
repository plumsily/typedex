import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Viewport.css";

const Viewport = ({
  inputRef,
  oppImgSrc,
  oppName,
  oppTypes,
  loaded,
  handleMove,
  moveName,
  moveType,
  loadedMove,
}) => {
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

  class Effectivness {
    constructor(element, list) {
      this.element = element;
      this.list = list;
    }
    pushElem(val) {
      this.element.push(
        <li
          style={{ background: typeColors[val] }}
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
          style={{ background: typeColors[key] }}
          key={key}
          className="text-sm py-1 px-3 border border-gray-800 ml-[-1px]"
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
    <CSSTransition
      in={loaded}
      timeout={{ enter: 100 }}
      classNames="viewport"
      appear
      unmountOnExit
    >
      <section className="dark:text-white content pt-16 flex flex-col items-center">
        <div className="flex flex-col justify-center p-1.5 bg-yellow-200/10 dark:bg-gray-400/10 backdrop-blur-[2px] border border-gray-600 w-[70ch]">
          <div className="flex flex-row justify-between">
            <a
              href={`https://bulbapedia.bulbagarden.net/wiki/${oppName}_(Pok%C3%A9mon)`}
              className="text-2xl dark:bg-transparent dark:hover:bg-cyan-500 px-2.5 py-0.5 mb-4 w-max hover:bg-black hover:text-white border bg-yellow-200 border-gray-600 transition-all"
              target="_blank"
            >
              {oppName.toUpperCase()}
            </a>
            <ul className="text-center text-white flex flex-row h-fit">
              {oppTypeList}
            </ul>
          </div>
          <div className="flex gap-6 pb-[50px]">
            <img
              className="self-center drop-shadow-lg dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
              src={oppImgSrc}
              width="475"
              height="475"
            ></img>
            <div className="flex flex-col gap-6 text-sm w-full">
              <div className="flex flex-col gap-1.5">
                <p>✔️ Super effective types:</p>
                <ul className="text-center text-white">
                  {oppSuperEffective.element}
                </ul>
              </div>
              <div className="flex flex-col gap-1.5">
                <p>🟡 Not very effective types:</p>
                <ul className="text-center text-white">
                  {oppNotVeryEffective.element}
                </ul>
              </div>
              <div className="flex flex-col gap-1.5">
                <p>❌ No effect types:</p>
                <ul className="text-center text-white">
                  {oppNotEffective.element}
                </ul>
              </div>
            </div>
          </div>
          <div className="dark:text-white flex flex-row justify-self-center">
            <input
              type="search"
              placeholder="Check your move against this Pokémon!"
              name="move"
              id="move"
              ref={inputRef}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleMove(
                    inputRef.current.value.toLowerCase().replace(/\s/, "-"),
                    "+"
                  );
                }
              }}
              className="dark:text-white bg-white dark:bg-transparent py-1 px-2 text-center text-sm w-5/6 border border-gray-600"
            ></input>
            <button
              onClick={(event) =>
                handleMove(
                  inputRef.current.value.toLowerCase().replace(/\s/, "-"),
                  "+"
                )
              }
              className="w-1/6 border text-sm border-gray-600 ml-[-1px] transition-all dark:hover:bg-cyan-500 hover:text-white hover:bg-black"
            >
              Search
            </button>
          </div>
          {moveType.length ? (
            <CSSTransition
              in={loadedMove}
              timeout={{ enter: 200 }}
              classNames="move"
              appear
              unmountOnExit
            >
              <div className="flex flex-row gap-1.5 mt-1.5">
                <span className="w-[499px] p-1 border border-gray-600 self-center text-center text-sm">
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
                <span
                  style={{
                    background:
                      moveType.length !== 3
                        ? typeColors[moveType[0]]
                        : "transparent",
                  }}
                  className={`grow p-1 border border-gray-600 mb-[-1px] ${
                    moveType.length !== 3 ? "text-white" : "text-black"
                  } dark:text-white text-sm text-center`}
                >
                  {moveType.length !== 3
                    ? moveType[0].toUpperCase()
                    : moveType[1].toUpperCase()}
                </span>
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
