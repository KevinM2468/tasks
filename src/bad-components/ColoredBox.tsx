import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const COLORS = ["red", "blue", "green"];
const DEFAULT_COLOR_INDEX = 0;

function ColorPreview(color: string): JSX.Element {
    return (
        <div
            data-testid="colored-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: color,
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: "5px"
            }}
        ></div>
    );
}

function ChangeColor({
    colorIndex,
    setColorIndex
}: {
    colorIndex: number;
    setColorIndex: (colorIndex: number) => void;
}): JSX.Element {
    return (
        <Button
            onClick={() => {
                setColorIndex((1 + colorIndex) % COLORS.length);
                //setColor(COLORS[colorIndex]);
                //setColorPreview(ColorPreview(COLORS[colorIndex]));
            }}
        >
            Next Color
        </Button>
    );
}

export function ColoredBox(): JSX.Element {
    const [colorIndex, setColorIndex] = useState<number>(DEFAULT_COLOR_INDEX);
    //const [color, setColor] = useState<string>(COLORS[colorIndex]);

    return (
        <div>
            <h3>Colored Box</h3>
            <span>The current color is: {COLORS[colorIndex]}</span>
            <div>
                <ChangeColor
                    colorIndex={colorIndex}
                    setColorIndex={setColorIndex}
                ></ChangeColor>
                {ColorPreview(COLORS[colorIndex])}
            </div>
        </div>
    );
}
