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
      <section className="dark:text-white content pt-[5.5rem] sm:pt-16 flex flex-col items-center 2xl:text-base xl:text-sm text-xs w-screen px-1.5 sm:px-0 mb-1.5">
        <div className="flex flex-col gap-6 sm:gap-10 justify-center bg-gray-300/10  dark:bg-gray-300/10 backdrop-blur-[2px] border border-gray-600 p-1.5 sm:w-[70ch]">
          <h2 className="xl:text-2xl text-lg uppercase text-center border border-gray-600 px-2.5 py-0.5">
            <span>Master your Pokémon's moveset!</span>
          </h2>
          <p className="text-left sm:text-center sm:px-6">
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
