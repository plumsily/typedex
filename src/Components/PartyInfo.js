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
            Party Matchup Ranking
          </ul>
          <p>
            TypeDex determines the matchup favoribility of your Pokémon vs. the
            opponent using an algorithm that factors type effectiveness into 4
            tiers.
          </p>
          <div className="grid grid-cols-4 grid-rows-1 w-full mt-2 mb-4">
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
            matchup is where your Pokémon has both a good offensive and
            defensive matchup where at least one type is super effective and/or
            resistant.
          </li>
          <li>
            A{" "}
            <span className="border border-gray-500 dark:border-gray-700 px-1 py-1 text-center from-green-500/30 bg-gradient-to-t dark:from-green-500/50">
              Good
            </span>{" "}
            matchup is where your Pokémon will have a good defensive matchup. If
            both the opponent and your Pokémon are double typed, you might have
            a super effective type, but will likely be offset by the opponent
            having another resistant type.
          </li>
          <li>
            A{" "}
            <span className="border border-gray-500 dark:border-gray-700 px-1 py-1 text-center bg-transparent">
              Normal
            </span>{" "}
            matchup is where your Pokémon has neither a net advantage nor
            disadvantage.
          </li>
          <li>
            A{" "}
            <span className="border border-gray-500 dark:border-gray-700 px-1 py-1 text-center bg-gradient-to-t from-red-500/30 dark:from-red-500/40">
              Bad
            </span>{" "}
            matchup is where your Pokémon has either a bad defensive matchup and
            suffer from super effective moves or a bad offensive matchup and not
            be able to affect the opponent's type.
          </li>
          <span className="mt-4 mb-1 text-[12px] sm:text-xs text-center">
            *Party is preserved between browser sessions.
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
