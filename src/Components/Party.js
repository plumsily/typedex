import React from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./Party.css";

const Party = ({
  loaded,
  stats,
  inputRef,
  party,
  handleParty,
  handleDeleteParty,
  handlePartyInfo,
}) => {
  let partyList = [];
  if (Object.keys(party).length) {
    Object.keys(party).forEach((pokemon) => {
      partyList.push(
        <li
          key={pokemon}
          className={`${
            party[pokemon]["matchup"] < 0
              ? "bg-gradient-to-t via-transparent from-red-500/20"
              : party[pokemon]["matchup"] == 0
              ? "bg-transparent"
              : party[pokemon]["matchup"] < 3
              ? "bg-gradient-to-t via-transparent from-green-500/30"
              : "bg-gradient-to-t via-transparent from-blue-400/30"
          } border border-gray-400 dark:border-gray-800 w-full flex flex-col p-1.5 gap-1.5`}
        >
          <div className="flex flex-row">
            <span className="uppercase border border-r-0 border-gray-500 dark:border-gray-700 py-1 text-center grow">
              {party[pokemon].name}
            </span>
            <button
              value={pokemon}
              onClick={(event) => {
                handleDeleteParty(pokemon);
              }}
              className="w-[32px] sm:w-[42px] border border-gray-500 dark:border-gray-700 transition-all bg-[rgba(192,252,132,0.7)] dark:bg-purple-400/10 sm:text-black dark:hover:bg-purple-400 hover:text-white hover:bg-black dark:text-white"
            >
              X
            </button>
          </div>
          <img
            className="h-max w-max self-center drop-shadow-lg dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            src={party[pokemon].sprite}
          ></img>
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
          <button
            onClick={(event) => handlePartyInfo()}
            className="xl:text-2xl text-lg uppercase text-center dark:text-white h-fit w-full sm:w-max px-2.5 py-0.5 border border-gray-500 dark:border-gray-700 dark:bg-purple-400/10 dark:hover:bg-purple-400 hover:bg-black hover:text-white  transition-all flex flex-row justify-center sm:justify-start"
          >
            Party
            <FontAwesomeIcon
              className="sm:text-sm text-xs ml-1.5 self-center"
              icon={faCircleInfo}
            />
          </button>
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
              className="uppercase xl:w-1/6 w-full py-2 sm:py-0 sm:w-[92.5312px] border border-gray-500 dark:border-gray-700 sm:ml-[-1px] transition-all bg-[rgba(199,252,134,0.7)] dark:bg-purple-400/10 sm:dark:text-white  dark:hover:bg-purple-400 hover:text-white hover:bg-black"
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
