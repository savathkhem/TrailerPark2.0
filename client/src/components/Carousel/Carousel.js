import React, { Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "./Carousel.css";

const YTCarousel = (props)=> (
<Fragment>
    <Carousel showThumbs={false}>
        {props.children}
    </Carousel>
</Fragment>
);

export default YTCarousel; 