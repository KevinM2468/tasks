import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [attempts, adjustAttempts] = useState<number>(4);
    const [inProgress, setProgress] = useState<boolean>(false);

    function startClicked() {
        if (attempts < 0) {
            return;
        }
        if (!inProgress) {
            adjustAttempts(attempts - 1);
            setProgress(true);
        }
    }

    function endClicked() {
        if (inProgress) {
            setProgress(false);
        }
    }

    function mullPressed() {
        adjustAttempts(attempts + 1);
    }

    return (
        <span>
            <div>You have {attempts} attempts left.</div>
            {
                <Button
                    onClick={startClicked}
                    disabled={inProgress || attempts == 0}
                >
                    Start Quiz
                </Button>
            }
            {
                <Button onClick={endClicked} disabled={!inProgress}>
                    Stop Quiz
                </Button>
            }
            {
                <Button onClick={mullPressed} disabled={inProgress}>
                    Mulligan
                </Button>
            }
        </span>
    );
}
