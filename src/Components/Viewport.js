import React, { useEffect, useState } from "react";
// import { CSSTransition } from "react-transition-group";
import "./Viewport.css";

const Viewport = ({ oppImgSrc, oppName, oppTypes }) => {
  let oppTypeList = [];
  if (oppTypes) {
    oppTypes.forEach((type) => {
      oppTypeList.push(<li className="text-sm text-blue-500">{type}</li>);
    });
  }

  if (oppName) {
    return (
      <div className="flex flex-col justify-center p-6 bg-gray-300/20 backdrop-blur-sm border border-gray-600 w-[70ch]">
        <div className="flex flex-row justify-between">
          <a
            href={`https://bulbapedia.bulbagarden.net/wiki/${oppName}_(Pok%C3%A9mon)`}
            className="text-2xl px-4 py-0.5 mb-6 w-max bg-lime-400 border hover:bg-lime-300 border-gray-600"
            target="_blank"
          >
            {oppName}
          </a>
          <ul className="">{oppTypeList}</ul>
        </div>
        <div className="flex gap-4">
          <img
            className="border border-gray-600 drop-shadow-lg"
            src={oppImgSrc}
          ></img>
          <p>✔️ Super effective types:</p>
        </div>
      </div>
    );
  } else {
    return <h2>The guide to mastering your Pokemon's moveset!</h2>;
  }
};

export default Viewport;
