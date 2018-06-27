import React from "react";
import "./Card.css";

const Card = (props) => (
    <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
            <img src={props.src} onClick={props.onClick} alt={props.title}/>  
        </div>
        <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
                <div id="modal-btn-container">
                    <a id="modal-btn" className="waves-effect waves-light btn modal-trigger" onClick={props.onClick}>{props.title}</a>
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
    <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
            <div id="modal-btn-container">
                <Button id="modal-btn" className="waves-effect waves-light btn modal-trigger" onClick={props.onClick}{...props.title} />
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
);

export default Card;

