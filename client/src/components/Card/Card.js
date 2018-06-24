import React from "react";
import "./Card.css";

const Card = (props) => (
        <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
                {/* <img className="modal-trigger movie-poster" data-title = "${title}" src="${posterPath}" href="#modal1"> */}
                <img src={props.src} onClick={props.onClick} alt={props.title}/>  
                {/* <a href="http://www.google.com" style="position:absolute;right:5px;bottom:5px" className="star-btn btn-floating yellow darken-1"><i className="material-icons">star_border</i></a> */}
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                    <div id="modal-btn-container">
                        <a id="modal-btn" className="waves-effect waves-light btn modal-trigger" href="#modal1">{props.title}</a>
                        <i id="more-vert-btn" className="material-icons right">more_vert</i>
                    </div>
                </span>
            </div>
            <div id = "titlegoeshere" className="card-reveal">
                <span className="card-title grey-text text-darken-4">{props.title}<i className="material-icons right">close</i></span>
                <p>{props.overview}</p>
                <br />
                <a id="maps" className="btn modal-trigger waves-effect waves-light" href="#modal1">Theaters Nearby</a>
            </div>
        </div>
);

export default Card;

