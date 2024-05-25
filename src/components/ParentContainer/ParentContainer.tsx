import classNames from "classnames";
import React, { ReactNode } from "react";

interface ParentContainerProps {
  children: ReactNode;
  className?: string;
}

const ParentContainer: React.FC<ParentContainerProps> = ({ children, className }) => {
  return <div className={classNames("px-[3%] md:px-[5%]", className)}>{children}</div>;
};

export default ParentContainer;
