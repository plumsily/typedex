import React from "react";
import { CSSTransition } from "react-transition-group";
import "./Party.css";

const Party = ({
  loaded,
  stats,
  inputRef,
  party,
  handleParty,
  handleDeleteParty,
  colorMap,
}) => {
  let partyList = [];
  if (Object.keys(party).length) {
    Object.keys(party).forEach((pokemon) => {
      // let partyType = [];
      // Object.keys(party[pokemon]["damage_relations"]).forEach((type) => {
      //   partyType.push(
      //     <span
      //       style={{ background: colorMap[type] }}
      //       key={type}
      //       className="text-white py-1 px-3 border border-gray-800 ml-[-1px] w-full"
      //     >
      //       {type.toUpperCase()}
      //     </span>
      //   );
      // });
      partyList.push(
        <li
          key={pokemon}
          className="border border-gray-400 dark:border-gray-800 w-full flex flex-col p-1.5 gap-1.5"
        >
          <div className="flex flex-row">
            <span
              className={`${
                party[pokemon]["matchup"] < 0
                  ? "bg-red-400/60"
                  : party[pokemon]["matchup"] == 0
                  ? "bg-transparent"
                  : party[pokemon]["matchup"] < 3
                  ? "bg-green-500/20"
                  : "bg-green-400/60"
              } uppercase border border-r-0 border-gray-500 dark:border-gray-700 py-1 text-center grow`}
            >
              {party[pokemon].name}
            </span>
            <button
              value={pokemon}
              onClick={(event) => {
                handleDeleteParty(pokemon);
              }}
              className="w-[35px] sm:w-[42px] border border-gray-500 dark:border-gray-700 transition-all bg-[rgba(192,252,132,0.7)] dark:bg-purple-400/10 sm:text-black dark:hover:bg-purple-400 hover:text-white hover:bg-black dark:text-white"
            >
              X
            </button>
            {/* <div className="flex flex-row">{partyType}</div> */}
          </div>
          <img
            className="h-max w-max self-center drop-shadow-lg dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            src={party[pokemon].sprite}
          ></img>

          {/* <button className="w-14 h-14 sm:w-[97px] sm:h-[97px] border-l border-gray-600 transition-all bg-[rgba(192,252,132,0.7)] dark:bg-purple-400/70 sm:text-black dark:hover:bg-purple-400 hover:text-white hover:bg-black dark:text-white">
            X
          </button> */}
        </li>
      );
    });
  }

  return (
    <section
      className={`${
        loaded
          ? "sm:mt-2 mt-0"
          : stats.ratio
          ? "sm:mt-16 mt-[5rem]"
          : "sm:mt-2 mt-0"
      } dark:text-white content flex flex-col items-center 2xl:text-base xl:text-sm text-xs w-screen p-1.5 mb-2`}
    >
      <CSSTransition
        in={true}
        timeout={{ enter: 200, exit: 100 }}
        classNames="default"
        appear
        unmountOnExit
      >
        <div className="flex flex-col gap-1.5 bg-gray-300/10 dark:bg-gray-400/5 backdrop-blur-[2px] border border-gray-400 dark:border-gray-800 p-1.5 w-full sm:w-[70ch]">
          <h2 className="xl:text-2xl text-lg uppercase text-center dark:text-white h-fit w-full sm:w-max px-2.5 py-0.5 border border-gray-500 dark:border-gray-700">
            Party
          </h2>
          <ul className="2xl:text-base xl:text-sm text-xs grid grid-cols-2 grid-rows-auto grid-flow-column gap-1.5">
            {partyList}
          </ul>
          <div className="mt-0 dark:text-white flex flex-col gap-1.5 sm:gap-0 sm:flex-row justify-self-center">
            <input
              type="search"
              placeholder="Add the Pokémon in your party!"
              name="party"
              id="party"
              ref={inputRef}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleParty(
                    inputRef.current.value
                      .toLowerCase()
                      .match(/\w+\s?\D?\w+/gm)
                      .join("")
                  );
                }
              }}
              className="focus:outline focus:outline-2 dark:focus:outline-purple-400/80 focus:-outline-offset-[3px] focus:outline-[rgba(192,252,132,1)] rounded-none dark:text-white grow py-2 bg-white dark:bg-transparent sm:py-0.5 px-2 text-center xl:w-5/6 border border-gray-500 dark:border-gray-700"
            ></input>
            <button
              onClick={(event) =>
                handleParty(
                  inputRef.current.value
                    .toLowerCase()
                    .match(/\w+\s?\D?\w+/gm)
                    .join("")
                )
              }
              className="xl:w-1/6 w-full py-2 sm:py-0 sm:w-[92.5312px] border border-gray-500 dark:border-gray-700 sm:ml-[-1px] transition-all bg-[rgba(199,252,134,0.7)] dark:bg-purple-400/10 sm:dark:text-white  dark:hover:bg-purple-400 hover:text-white hover:bg-black"
            >
              Add
            </button>
          </div>
        </div>
      </CSSTransition>
    </section>
  );
};

export default Party;
