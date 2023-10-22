import React, { useState } from "react";
import { Button } from "react-bootstrap";

function double(dhValue: number, setDhValue: (dhValue: number) => void): void {
    setDhValue(2 * dhValue);
}

// Why the hell it needs to be formatted like this to get around
// the "oh, this isn't actually a function, this is an event" type
// error, I don't know. Still, better than python. Thanks Samson
function Doubler({
    dhValue,
    setDhValue
}: {
    dhValue: number;
    setDhValue: (dhValue: number) => void;
}): JSX.Element {
    return <Button onClick={() => double(dhValue, setDhValue)}>Double</Button>;
}

function half(dhValue: number, setDhValue: (dhValue: number) => void): void {
    setDhValue(0.5 * dhValue);
}

function Halver({
    dhValue,
    setDhValue
}: {
    dhValue: number;
    setDhValue: (dhValue: number) => void;
}): JSX.Element {
    return <Button onClick={() => half(dhValue, setDhValue)}>Halve</Button>;
}

export function DoubleHalf(): JSX.Element {
    const [dhValue, setDhValue] = useState<number>(10);

    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{dhValue}</span>
            </div>
            <Doubler dhValue={dhValue} setDhValue={setDhValue}></Doubler>
            <Halver dhValue={dhValue} setDhValue={setDhValue}></Halver>
        </div>
    );
}
