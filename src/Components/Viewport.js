import React, { useEffect, useState } from "react";
// import { CSSTransition } from "react-transition-group";
import "./Viewport.css";

const Viewport = ({ oppImgSrc, oppName, oppTypes, oppWeakness }) => {
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

  let oppTypeList = [];
  if (oppTypes) {
    oppTypes.forEach((type) => {
      oppTypeList.push(
        <li
          style={{ background: typeColors[type] }}
          key={type}
          className="text-sm py-1 px-2 border border-gray-600 ml-[-1px]"
        >
          {type.toUpperCase()}
        </li>
      );
    });
  }

  let oppSuperEffective = [];
  let oppNotVeryEffective = [];
  let oppNotEffective = [];

  if (oppWeakness["double_damage_from"]) {
    oppWeakness["double_damage_from"].forEach((type) => {
      oppSuperEffective.push(
        <li
          style={{ background: typeColors[type.name] }}
          key={type.name}
          className="p-1 border border-gray-600 mb-[-1px]"
        >
          {type.name.toUpperCase()}
        </li>
      );
    });
    oppWeakness["half_damage_from"].forEach((type) => {
      oppNotVeryEffective.push(
        <li
          style={{ background: typeColors[type.name] }}
          key={type.name}
          className="p-1 border border-gray-600 mb-[-1px]"
        >
          {type.name.toUpperCase()}
        </li>
      );
    });
    oppWeakness["no_damage_from"].forEach((type) => {
      oppNotEffective.push(
        <li
          style={{ background: typeColors[type.name] }}
          key={type.name}
          className="p-1 border border-gray-600 mb-[-1px]"
        >
          {type.name.toUpperCase()}
        </li>
      );
    });
  }

  if (oppName) {
    return (
      <div className="flex flex-col justify-center p-6 bg-yellow-200/10 dark:bg-gray-500/10 backdrop-blur-[2px] border border-gray-600 w-[70ch]">
        <div className="flex flex-row justify-between">
          <a
            href={`https://bulbapedia.bulbagarden.net/wiki/${oppName}_(Pok%C3%A9mon)`}
            className="text-2xl dark:bg-black dark:hover:bg-blue-500  px-4 py-0.5 mb-6 w-max hover:bg-blue-500 hover:text-white border bg-yellow-200 border-gray-600"
            target="_blank"
          >
            {oppName.toUpperCase()}
          </a>
          <ul className="text-center text-white flex flex-row h-fit">
            {oppTypeList}
          </ul>
        </div>
        <div className="flex gap-6">
          <img
            className="border border-gray-600 drop-shadow-lg dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            src={oppImgSrc}
          ></img>
          <div className="flex flex-col gap-8 text-sm w-full">
            <div className="flex flex-col gap-4 text-sm w-full">
              <p>✔️ Super effective types:</p>
              <ul className="text-center text-white">{oppSuperEffective}</ul>
            </div>
            <div className="flex flex-col gap-4 text-sm w-full">
              <p>🟡 Not very effective types:</p>
              <ul className="text-center text-white">{oppNotVeryEffective}</ul>
            </div>
            <div className="flex flex-col gap-4 text-sm w-full">
              <p>❌ No effect types:</p>
              <ul className="text-center text-white">{oppNotEffective}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-300/20 dark:bg-gray-300/10 backdrop-blur-[2px] border border-gray-600  px-6 py-10">
        <h2 className="text-lg mb-4">
          The guide to mastering your Pokémon's moveset!
        </h2>
        <p>
          Don't know what the opponent Pokémon's type is? Use the TypeDex to
          search for your opponent's type weaknesses and check if your moves are
          going to be super effective!
        </p>
        <p className="text-sm mt-10">
          Currently does not support mega evolutions or regional forms.
        </p>
      </div>
    );
  }
};

export default Viewport;
