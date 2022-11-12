import React from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import "./Default.css";

const Default = () => {
  return (
    <CSSTransition
      in={true}
      timeout={{ enter: 200, exit: 100 }}
      classNames="default"
      appear
      unmountOnExit
    >
      <section className="dark:text-white content pt-[5.1rem] sm:pt-[5rem] flex flex-col items-center 2xl:text-base xl:text-sm text-xs w-screen px-1.5 sm:px-0 sm:mb-6">
        <div className="flex flex-col justify-center sm:w-[70ch] p-1.5 text-center">
          {/* <h2 className="bg-gray-400/10 dark:bg-gray-600/20 backdrop-blur-[3px] xl:text-2xl text-lg uppercase text-center border border-gray-500 dark:border-gray-700 px-2.5 py-2">
            <span>Master Pokémon battling!</span>
          </h2> */}
          <FontAwesomeIcon
            className="sm:text-xl text-base mt-2 sm:mt-4 self-center"
            icon={faUpLong}
          />
          <span className="mt-4 text-lg uppercase">
            Search for the opponent Pokémon here!
          </span>
          <p className="sm:px-6 px-2 mt-6 sm:mt-10">
            Use the TypeDex to search for your opponent's type weaknesses! You
            can also check the type effectiveness and move category of any move
            against it.
          </p>
          <p className="text-xs px-2 mt-2">
            *Currently does not support mega evolutions or regional forms.
          </p>
          <span className="sm:mt-20 mt-14 text-lg uppercase">
            Want to see how your Pokémon stack up? Add them here!
          </span>
          <FontAwesomeIcon
            className="sm:text-xl text-base mt-4 self-center mb-4"
            icon={faDownLong}
          />
        </div>
      </section>
    </CSSTransition>
  );
};

export default Default;
