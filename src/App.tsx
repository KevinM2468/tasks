import React from "react";
import "./App.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ChangeType } from "./components/ChangeType";
import { RevealAnswer } from "./components/RevealAnswer";
import { StartAttempt } from "./components/StartAttempt";
import { TwoDice } from "./components/TwoDice";
import { CycleHoliday } from "./components/CycleHoliday";
import { Counter } from "./components/Counter";
import { DoubleHalf } from "./bad-components/DoubleHalf";
import { ColoredBox } from "./bad-components/ColoredBox";
import { ShoveBox } from "./bad-components/ShoveBox";
import { ChooseTeam } from "./bad-components/ChooseTeam";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UM COS420 with React Hooks and TypeScript
            </header>
            <div>
                <h1>What is happening</h1>
                <h2>This is a thing to introduce web work</h2>
                <p>
                    Edit <code>src/App.tsx</code> and save. This page will
                    automatically reload.
                </p>
                <p>Hello World! This is my page.</p>
                <p>Edited by: Kevin Menenello</p>
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <p>
                                    As of writing this line, I have three things
                                    left to do
                                </p>
                                <ol>
                                    <li>
                                        A button to log &quot;hello world&quot;
                                    </li>
                                    <li>A two column layout</li>
                                    <li>Put red rectangles in each column</li>
                                    <div
                                        style={{
                                            backgroundColor: "red",
                                            width: "50px",
                                            height: "100px"
                                        }}
                                    />
                                </ol>
                            </Col>
                            <Col>
                                <p>This is the button I was talking about</p>
                                <Button
                                    onClick={() => console.log("Hello World!")}
                                >
                                    Log Hello World
                                </Button>
                                <div
                                    style={{
                                        backgroundColor: "red",
                                        width: "225px",
                                        height: "75px"
                                    }}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <hr></hr>
            <DoubleHalf></DoubleHalf>
            <hr></hr>
            <ChooseTeam></ChooseTeam>
            <hr></hr>
            <ColoredBox></ColoredBox>
            <hr></hr>
            <ShoveBox></ShoveBox>
            <hr></hr>
            <Counter></Counter>
            <hr />
            <RevealAnswer></RevealAnswer>
            <hr />
            <StartAttempt></StartAttempt>
            <hr />
            <TwoDice></TwoDice>
            <hr />
            <ChangeType></ChangeType>
            <hr />
            <CycleHoliday></CycleHoliday>
            <hr />
            <div>
                <p>Here, take this cool Windows wallpaper</p>
                <img
                    src={require("./assets/images/LockScreen_533edc733b885d0e1188f320562b68b577c84658b6bcd3b33b729493209ae815.jpg")}
                    alt="A Windows Wallpaper of waterside houses that looks nice. attempt 15"
                />
            </div>
        </div>
    );
}

export default App;
