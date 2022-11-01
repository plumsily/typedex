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
      <section className="dark:text-white content pt-16 max-w-[70ch] flex flex-col items-center">
        <div className="flex flex-col justify-center items-center bg-gray-300/20 dark:bg-gray-300/10 backdrop-blur-[2px] border border-gray-600 p-8">
          <h2 className="text-xl mb-8">
            The guide to mastering your Pokémon's moveset!
          </h2>
          <p>
            Don't know what the opponent Pokémon's type is? Use the TypeDex to
            search for your opponent's type weaknesses and check if your moves
            are going to be super effective!
          </p>
          <p className="text-xs mt-10">
            *Currently does not support mega evolutions or regional forms.
          </p>
        </div>
      </section>
    </CSSTransition>
  );
};

export default Default;
