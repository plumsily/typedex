import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Viewport.css";

const Viewport = ({ oppImgSrc, oppName, oppTypes, loaded }) => {
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
    pushAll(val) {
      this.list.push(val);
      this.element.push(
        <li
          style={{ background: typeColors[val] }}
          key={val}
          className="p-1 border border-gray-600 dark:border-gray-800 mb-[-1px]"
        >
          {val.toUpperCase()}
        </li>
      );
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
          className="text-sm py-1 px-3 border border-gray-600 dark:border-gray-800 ml-[-1px]"
        >
          {key.toUpperCase()}
        </li>
      );

      //   Show the weakness of the opponent pokemon
      if (
        Object.hasOwn(oppTypes[Object.keys(oppTypes)[0]], "double_damage_from")
      ) {
        oppTypes[key]["no_damage_from"].forEach((damage) => {
          if (!oppNotEffective.list.includes(damage.name)) {
            oppNotEffective.pushAll(damage.name);
          }
        });

        oppTypes[key]["double_damage_from"].forEach((damage) => {
          if (
            !oppSuperEffective.list.includes(damage.name) &&
            !oppNotEffective.list.includes(damage.name)
          ) {
            oppSuperEffective.pushAll(damage.name);
          }
        });

        oppTypes[key]["half_damage_from"].forEach((damage) => {
          if (
            !oppNotVeryEffective.list.includes(damage.name) &&
            !oppNotEffective.list.includes(damage.name)
          ) {
            oppNotVeryEffective.pushAll(damage.name);
          }
        });
      }
    });
  }

  return (
    <CSSTransition
      in={loaded}
      timeout={{ enter: 100, exit: 100 }}
      classNames="viewport"
      appear
      unmountOnExit
    >
      <section className="dark:text-white content pt-16 max-w-[70ch] flex flex-col items-center">
        <div className="flex flex-col justify-center p-1.5 bg-yellow-200/10 dark:bg-gray-500/10 backdrop-blur-[2px] border border-gray-600 w-[70ch]">
          <div className="flex flex-row justify-between">
            <a
              href={`https://bulbapedia.bulbagarden.net/wiki/${oppName}_(Pok%C3%A9mon)`}
              className="text-2xl dark:bg-black dark:hover:bg-blue-500  px-2.5 py-0.5 mb-1.5 w-max hover:bg-blue-500 hover:text-white border bg-yellow-200 border-gray-600"
              target="_blank"
            >
              {oppName.toUpperCase()}
            </a>
            <ul className="text-center text-white flex flex-row h-fit">
              {oppTypeList}
            </ul>
          </div>
          <div className="flex gap-1.5 pb-[1px]">
            <img
              className="h-max self-start border border-gray-600 drop-shadow-lg dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              src={oppImgSrc}
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
        </div>
      </section>
    </CSSTransition>
  );
};

export default Viewport;
