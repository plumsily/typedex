import React from "react";
import { CSSTransition } from "react-transition-group";
import "./Party.css";

const Party = ({ loaded, stats, inputRef }) => {
  return (
    <section
      className={`${
        loaded
          ? "sm:mt-4 mt-0"
          : stats.ratio
          ? "sm:mt-16 mt-[5rem]"
          : "sm:mt-4 mt-0"
      } dark:text-white content flex flex-col items-center 2xl:text-base xl:text-sm text-xs w-screen p-1.5`}
    >
      <CSSTransition
        in={true}
        timeout={{ enter: 200, exit: 100 }}
        classNames="default"
        appear
        unmountOnExit
      >
        <div className="flex flex-col gap-1.5 bg-gray-300/10 dark:bg-gray-400/5 backdrop-blur-[2px] border border-gray-600 p-1.5 w-full sm:w-[70ch]">
          <h2 className="xl:text-2xl text-lg uppercase text-center bg-gray-400/10 dark:bg-gray-600/20 dark:text-white h-fit w-full sm:w-max px-2.5 py-0.5 border border-gray-600">
            Party
          </h2>
          <div className="mt-0 dark:text-white flex flex-col gap-1.5 sm:gap-0 sm:flex-row justify-self-center">
            <input
              type="search"
              placeholder="Add your Pokémon in your party!"
              name="party"
              id="party"
              ref={inputRef}
              // onKeyPress={(event) => {
              //   if (event.key === "Enter") {
              //     handleMove(
              //       inputRef.current.value
              //         .toLowerCase()
              //         .match(/\w+\s?\D?\w+/gm)
              //         .join("")
              //         .replace(/\s/, "-"),
              //       "+"
              //     );
              //   }
              // }}
              className="focus:outline focus:outline-2 dark:focus:outline-purple-400 focus:-outline-offset-[3px] focus:outline-[rgba(199,252,134,1)] rounded-none dark:text-white grow py-2 bg-white dark:bg-transparent sm:py-1 px-2 text-center xl:w-5/6 border border-gray-600"
            ></input>
            <button
              // onClick={(event) =>
              //   handleMove(
              //     inputRef.current.value
              //       .toLowerCase()
              //       .match(/\w+\s?\D?\w+/gm)
              //       .join("")
              //       .replace(/\s/, "-"),
              //     "+"
              //   )
              // }
              className="xl:w-1/6 w-full py-2 sm:py-0 sm:w-[92.5312px] border border-gray-600 sm:ml-[-1px] transition-all bg-[rgba(199,252,134,0.7)] dark:bg-purple-400/70 sm:dark:text-white  dark:hover:bg-purple-400 hover:text-white hover:bg-black"
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
