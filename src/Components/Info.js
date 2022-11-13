import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Info.css";

const Info = ({ handleInfo, loadInfo }) => {
  return (
    <CSSTransition
      in={loadInfo}
      timeout={{ enter: 100, exit: 100 }}
      classNames="info"
      appear
      unmountOnExit
    >
      <div className="fixed h-screen sm:h-screen w-screen top-0 left-0 dark:text-white dark:bg-black/80 bg-gray-100/80 backdrop-blur z-10 flex flex-col 2xl:text-lg xl:text-base text-xs justify-center font-light">
        <div className="flex flex-col gap-2 sm:m-auto mx-auto px-5 sm:px-0 sm:pb-0 sm:w-[60ch]">
          <ul className="2xl:text-xl xl:text-lg text-sm mb-2 font-medium">
            Pokémon Defensive Stats: Defense vs Special Defense
          </ul>
          <li>
            The Defense stat, or informally Physical Defense, partly determines
            how much damage a Pokémon receives when it is hit with a Physical
            move.
          </li>
          <li>
            The Special Defense stat, or Sp. Def for short, partly determines
            how much damage a Pokémon receives when it is hit with a Special
            move.
          </li>
          <li>
            Therefore, depending on the opponent's defensive stats, Physical or
            Special moves can have more impact the other!
          </li>
          <li>
            TypeDex displays the opponent Pokémon's Defense to Special Defense
            stats as a ratio. Look for the shorter, smaller stat, and check if
            your move is in the same category!
          </li>
          <button
            onClick={(event) => handleInfo()}
            className="mt-4 dark:text-white p-2 border border-gray-600 dark:hover:bg-purple-400 hover:text-white hover:bg-black transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Info;
