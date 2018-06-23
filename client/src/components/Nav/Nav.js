import React from "react";
import Logo from "../Logo";
import NavBar from "../NavBar";

const Nav = () => (
  <nav className="nav-extended grey darken-3">
    <div className="nav-wrapper">
      <Logo />
      <NavBar />
    </div>
  </nav>
);

export default Nav;
