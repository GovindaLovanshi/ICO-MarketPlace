import React from "react";

const Input = ({
  placeholder,handleChange
}) => {
  return (
    <>
       <input
       type="text"
       placeholder={placeholder}
       onChange={handleChange}
       className={"input-styleq"}
       />
    </>
  )
};

export default Input;
