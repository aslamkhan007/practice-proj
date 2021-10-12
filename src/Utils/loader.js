import React from "react";
import Loader from "react-loader-spinner";

const Spinner = ({size}) => {
  return (
    <Loader
      type="Puff"
      color="#6495ed"
      height={size ? 70 : 100}
      width={size ? 70 : 100}
      className={size ? "" : "loader"}
    />
  );
}

export default Spinner;