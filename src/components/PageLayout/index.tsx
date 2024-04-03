import React from "react";
import Header from "../Header";

type Props = {
  children: JSX.Element[] | JSX.Element[];
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="bg-gray-900 w-full h-auto">
      <div className="max-w-full md:max-w-6xl  mx-auto">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
