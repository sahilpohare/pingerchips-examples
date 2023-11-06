// Source: https://github.com/steveruizok/perfect-cursors

import * as React from "react";
import { usePerfectCursor } from "../hooks/usePerfectCursor";

export function Cursor({ userId, point }) {
    const rCursor = React.useRef(null);
    const trimUserId = userId.slice(0, 8);

    const animateCursor = React.useCallback((point) => {
        const elm = rCursor.current;
        if (!elm) return;
        elm.style.setProperty(
            "transform",
            `translate(${point[0]}px, ${point[1]}px)`
        );
    }, []);

    const onPointMove = usePerfectCursor(animateCursor);

    React.useLayoutEffect(() => onPointMove(point), [onPointMove, point]);
    const [color, setColor] = React.useState("red");
    const [textColor, setTextColor] = React.useState("white");
    React.useEffect(() => {
        const [r, g, b] = [
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255,
        ];
        let randomColor = `rgb(${r}, ${g}, ${b})`;
        setColor(randomColor);

        if (r > 200 && g > 200 && b > 200) {
            setTextColor("black");
        }
    }, []);

    return (
        <div
            ref={rCursor}
            style={{
                position: "absolute",
                top: -15,
                left: -15,

                height: 35,
            }}
        >
            <svg
                // ref={rCursor}
                width="55"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35 35"
                fill="none"
                fillRule="evenodd"
            >
                <g fill="rgba(0,0,0,.2)" transform="translate(1,1)">
                    <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
                    <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
                </g>
                <g fill={color}>
                    <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
                    <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
                </g>
                <g fill={color}>
                    <path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" />
                    <path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" />
                </g>
            </svg>
            <h6
                style={{
                    backgroundColor: color,
                    borderRadius: "20px",
                    padding: "5px",
                    color: textColor,
                    transform: "translate(20px, -30%)",
                }}
            >
                {trimUserId}
            </h6>
        </div>
    );
}
