import React, { useState } from "react";
import { Button } from "react-bootstrap";

// New Years Day, Earth Day, Thanksgiving, Christmas, New Years Eve
type Holiday = "🎊" | "🌎" | "🦃" | "🎄" | "🎉";

const YEAR_TRANSITIONS: Record<Holiday, Holiday> = {
    "🎊": "🌎",
    "🌎": "🦃",
    "🦃": "🎄",
    "🎄": "🎉",
    "🎉": "🎊"
};

const ALPHA_TRANSITIONS: Record<Holiday, Holiday> = {
    "🎊": "🎉",
    "🌎": "🎊",
    "🦃": "🎄",
    "🎄": "🌎",
    "🎉": "🦃"
};

export function CycleHoliday(): JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("🎊");

    function forwardMonth() {
        setHoliday(YEAR_TRANSITIONS[holiday]);
    }

    function forwardAlpha() {
        setHoliday(ALPHA_TRANSITIONS[holiday]);
    }

    return (
        <span>
            <div>Holiday: {holiday}</div>
            <Button onClick={forwardMonth}>Advance by Year</Button>
            <Button onClick={forwardAlpha}>Advance by Alphabet</Button>
        </span>
    );
}
