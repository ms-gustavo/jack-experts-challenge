import React from "react";
import { MenuBar } from "./Menu";

const Navbar: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <nav
      id="navbar"
      className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-10"
    >
      <div className="flex justify-between items-center md:justify-evenly">
        <span id="welcome-text" className="text-lg font-bold">
          Bem-vindo, {userName}
        </span>
        <MenuBar />
      </div>
    </nav>
  );
};

export default Navbar;
