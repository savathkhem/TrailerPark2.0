import React from "react";
import "./NavBar.css";

const NavBar = () => (
    <div>
        <div id="test1" className="btn waves-effect waves-light">In Theaters Now</div>
        <div id="test2" className="btn waves-effect waves-light">Top Movies</div>
        <div id="test3" className="btn waves-effect waves-light">Top TV-Shows</div>

        <form id="form">
            <button id="search-btn" className="btn btn-floating" type="submit"><i className="material-icons">search</i></button>  
            <div className="search-btn input-field">
                <input id="search" type="search" required />
            </div>
        </form>
    </div>
);

export default NavBar;