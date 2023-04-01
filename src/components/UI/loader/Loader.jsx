import React from "react";
import cl from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={cl.main}>
      <div className={cl.clockLoader}></div>
      <h1 className={cl.title}>LOADING...</h1>
    </div>
  );
};

export default Loader;
