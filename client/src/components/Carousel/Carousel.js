import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "./Carousel.css";

const YTCarousel = (props)=> (
<Carousel showThumbs={false}>
{props.children}
</Carousel>
);

export default YTCarousel; 