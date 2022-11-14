import React from "react";
import { CSSTransition } from "react-transition-group";

import "./PartyInfo.css";

const PartyInfo = ({ handlePartyInfo, partyLoadInfo }) => {
  return (
    <CSSTransition
      in={partyLoadInfo}
      timeout={{ enter: 100, exit: 100 }}
      classNames="info"
      appear
      unmountOnExit
    >
      <div className="fixed h-screen sm:h-screen w-screen top-0 left-0 dark:text-white dark:bg-black/80 bg-gray-100/90 backdrop-blur z-30 flex flex-col 2xl:text-lg xl:text-base text-xs justify-center font-light">
        <div className="flex flex-col gap-2 sm:m-auto mx-auto px-5 sm:px-0 sm:pb-0 sm:w-[60ch]">
          <ul className="2xl:text-xl xl:text-lg text-sm mb-2 uppercase font-normal">
            Party: Matchup Algorithm
          </ul>
          <p>
            TypeDex determines the matchup favoribility of your Pokémon vs. the
            opponent using an algorithm that considers super effective, not very
            effective, and no effect types into 4 tiers.
          </p>
          <div className="grid grid-cols-4 grid-rows-1 w-full mb-4">
            <span className="border border-r-0 border-gray-500 dark:border-gray-700 px-1 py-1 text-center bg-gradient-to-t from-blue-400/40 dark:from-blue-400/70">
              Excellent
            </span>
            <span className="border border-r-0 border-gray-500 dark:border-gray-700 px-1 py-1 text-center from-green-500/30 bg-gradient-to-t dark:from-green-500/50">
              Good
            </span>
            <span className="border border-gray-500 dark:border-gray-700 px-1 py-1 text-center bg-transparent">
              Normal
            </span>
            <span className="border border-l-0 border-gray-500 dark:border-gray-700 px-1 py-1 text-center bg-gradient-to-t from-red-500/30 dark:from-red-500/40">
              Bad
            </span>
          </div>
          <li>
            An{" "}
            <span className="border border-gray-500 dark:border-gray-700 px-1 py-1 text-center bg-gradient-to-t from-blue-400/40 dark:from-blue-400/70">
              Excellent
            </span>{" "}
            matchup is where your Pokémon has at least one super effective type
            and no weaknesses, if not marginal.
          </li>
          <li>
            A{" "}
            <span className="border border-gray-500 dark:border-gray-700 px-1 py-1 text-center from-green-500/30 bg-gradient-to-t dark:from-green-500/50">
              Good
            </span>{" "}
            matchup is where your Pokémon generally has the upper hand. It might
            have a super effective type or a more resistant type against the
            opponent, but could also have a type that is not very effective
            against one or both of the opponent's types.
          </li>
          <li>
            A{" "}
            <span className="border border-gray-500 dark:border-gray-700 px-1 py-1 text-center bg-transparent">
              Normal
            </span>{" "}
            matchup is where your Pokémon has neither a net advantage nor
            disadvantage against the opponent.
          </li>
          <li>
            A{" "}
            <span className="border border-gray-500 dark:border-gray-700 px-1 py-1 text-center bg-gradient-to-t from-red-500/30 dark:from-red-500/40">
              Bad
            </span>{" "}
            matchup is where your Pokémon will either suffer from super
            effective moves from the opponent or not be able to affect the
            opponent.
          </li>
          <span className="mt-4 mb-1 text-[12px] text-center">
            *Party members will be preserved between broswer sessions!
          </span>
          <button
            onClick={(event) => handlePartyInfo()}
            className=" dark:text-white p-2 border border-gray-600 dark:hover:bg-purple-400 hover:text-white hover:bg-black transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PartyInfo;
