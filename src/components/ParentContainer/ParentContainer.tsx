import classNames from "classnames";
import React from "react";

const ParentContainer = ({ children, className }: any) => {
  return <div className={classNames("px-[3%] md:px-[5%]", className)}>{children}</div>;
};

export default ParentContainer;
