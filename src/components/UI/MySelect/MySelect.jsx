import React from "react";
import cl from "./MySelect.module.css";

const MySelect = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cl.select}
    >
      <option value=""></option>
      {options.map((option) => (
        <option value={option.value} key={option.name} className={cl.option}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
