import React from "react";
import cl from "./MyInput.module.css";

const MyInput = (props) => {
  return (
    <div className={cl.group}>
      <input className={cl.field} {...props} />
      <label className={cl.label}>{props.placeholder}</label>
    </div>
  );
};

export default MyInput;
