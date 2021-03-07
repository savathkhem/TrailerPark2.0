import React from "react";
import PropTypes from "prop-types";

const Spinner = props => (
    <svg
        // transition={props.transition}
        // transitionDuration={props.transitionDuration}
        // transitionTimingFunction={props.transitionTimingFunction}
        width={props.width}
        height={props.height}
        viewBox="0 0 105 105"
        fill={props.color}
        aria-label={props.label}>
        <circle cx="12.5" cy="12.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="0s"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
        <circle cx="12.5" cy="52.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="100ms"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
        <circle cx="52.5" cy="12.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="300ms"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
        <circle cx="52.5" cy="52.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="600ms"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
        <circle cx="92.5" cy="12.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="800ms"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
        <circle cx="92.5" cy="52.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="400ms"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
        <circle cx="12.5" cy="92.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="700ms"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
        <circle cx="52.5" cy="92.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="500ms"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
        <circle cx="92.5" cy="92.5" r={props.radius}>
            <animate
                attributeName="fill-opacity"
                begin="200ms"
                dur="1s"
                values="1;.2;1"
                calcMode="linear"
                repeatCount="indefinite"/>
        </circle>
    </svg>
);

Spinner.propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    label: PropTypes.string,
    radius: PropTypes.number,
};

Spinner.defaultProps = {
    height: 80,
    width: 80,
    color: "white",
    radius: 12.5,
};

export default Spinner;