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
      <section className="dark:text-white content pt-[5.5rem] sm:pt-16 flex flex-col items-center 2xl:text-base xl:text-sm text-xs w-screen px-1.5 sm:px-0">
        <div className="flex flex-col gap-8 justify-center items-center bg-gray-300/20 dark:bg-gray-300/10 backdrop-blur-[2px] border border-gray-600 sm:p-6 py-3 px-4 sm:w-[70ch]">
          <h2 className="text-base sm:text-xl font-medium uppercase text-center">
            Master your Pokémon's moveset!
          </h2>
          <p className="text-sm sm:text-base text-left sm:text-center">
            Not sure if your move will affect the opponent's Pokémon? Use the
            TypeDex to search for your opponent's type weaknesses! Never miss a
            super effective hit!
          </p>
          <p className="text-xs text-left sm:text-center">
            *Currently does not support mega evolutions or regional forms.
          </p>
        </div>
      </section>
    </CSSTransition>
  );
};

export default Default;
