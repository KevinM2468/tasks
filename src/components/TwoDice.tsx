import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): JSX.Element {
    const [leftNum, setLeft] = useState(1);
    const [rightNum, setRight] = useState(2);

    function rollLeft() {
        setLeft(d6);
    }

    function rollRight() {
        setRight(d6);
    }

    return (
        <div>
            <span data-testid="left-die">
                <Button onClick={rollLeft}>Roll Left</Button>
                Left Is A {leftNum}
            </span>
            <span data-testid="right-die">
                <Button onClick={rollRight}>Roll Right</Button>
                Right Is A {rightNum}
            </span>
            {leftNum == rightNum && leftNum != 1 && <div>Win</div>}
            {leftNum == 1 && rightNum == 1 && <div>Lose</div>}
        </div>
    );
}
