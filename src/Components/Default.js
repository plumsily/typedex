import React from "react";
import { CSSTransition } from "react-transition-group";
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
      <section className="dark:text-white content pt-[5.1rem] sm:pt-[5rem] flex flex-col items-center 2xl:text-base xl:text-sm text-xs w-screen px-1.5 sm:px-0 sm:mb-10">
        <div className="flex flex-col gap-6 sm:gap-10 justify-center sm:w-[70ch] border border-gray-400 dark:border-gray-800 p-1.5">
          <h2 className="bg-gray-400/10 dark:bg-gray-600/20 backdrop-blur-[3px] xl:text-2xl text-lg uppercase text-center border border-gray-500 dark:border-gray-700 px-2.5 py-2">
            <span>Master Pokémon battling!</span>
          </h2>
          <p className="text-center sm:px-6 px-2">
            Not sure if your move will affect the opponent's Pokémon? Use the
            TypeDex to search for your opponent's type weaknesses! Never miss a
            super effective hit!
          </p>
          <p className="text-xs text-center px-2 mb-8">
            *Currently does not support mega evolutions or regional forms.
          </p>
        </div>
      </section>
    </CSSTransition>
  );
};

export default Default;
