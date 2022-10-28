import React, { useEffect, useState } from "react";
// import { CSSTransition } from "react-transition-group";
import "./Viewport.css";

const Viewport = ({ oppImgSrc, oppName, oppTypes }) => {
  let oppTypeList = [];
  if (oppTypes) {
    oppTypes.forEach((type) => {
      oppTypeList.push(<li className="text-sm text-blue-500">{type}</li>);
    });
  }

  if (oppName) {
    return (
      <div className="flex flex-col justify-center p-6 bg-yellow-200/10 backdrop-blur-[2px] border border-gray-600 w-[70ch]">
        <div className="flex flex-row justify-between">
          <a
            href={`https://bulbapedia.bulbagarden.net/wiki/${oppName}_(Pok%C3%A9mon)`}
            className="text-2xl px-4 py-0.5 mb-6 w-max hover:bg-blue-400 hover:text-white border bg-yellow-200 border-gray-600"
            target="_blank"
          >
            {oppName}
          </a>
          <ul className="">{oppTypeList}</ul>
        </div>
        <div className="flex gap-6">
          <img
            className="border border-gray-600 drop-shadow-lg"
            src={oppImgSrc}
          ></img>
          <div className="flex flex-col gap-4 text-sm">
            <p>✔️ Super effective types:</p>
            <p>⚪ Normal effective types:</p>
            <p>🟡 Not very effective types:</p>
            <p>❌ No effect types:</p>
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
      </div>
    );
  }
};

export default Viewport;
