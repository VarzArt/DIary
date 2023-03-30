import React from "react";
import cl from "./MyButton.module.css";

const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={cl.myBtn}>
      <img src={props.src} alt="" className={cl.img} />
      <div className={cl.text}>{children}</div>
      <span className={cl.flare}></span>
    </button>
  );
};

export default MyButton;
