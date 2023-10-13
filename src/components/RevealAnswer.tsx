import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    function makeAnswerVisible() {
        setVisible(true);
    }

    return (
        <span>
            <Button onClick={makeAnswerVisible}>Reveal Answer</Button>
            {visible && <div>42</div>}
        </span>
    );
}
