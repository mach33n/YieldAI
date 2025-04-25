import { useState, createElement } from "react";
import { invoke } from "@tauri-apps/api/core";
import reactLogo from "./assets/react.svg";
import { styled, setup } from "goober";
import "./App.css";

// App.jsx
import '@shoelace-style/shoelace/dist/themes/light.css' with { type: "css" };
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');
setup(createElement);

// Component Imports
import SLTabGroup from '@shoelace-style/shoelace/dist/react/tab-group/index.js';
import SLTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel/index.js';
import SLTab from '@shoelace-style/shoelace/dist/react/tab/index.js';

// Custom Stylings
// TODO: Migrate to css file
const Title = styled("h2")`
  font-weight: bold;
  font-size: 24px;
`;
const TabGroup = styled(SLTabGroup)`
  background-color: white;
`;
const TabPanel = styled(SLTabPanel)`
  color: black;
  height: 600px;
  width: 800px;
  overflow: auto;
`;
const Tab = styled(SLTab)`
  color: black;
`;
const TimerTabGroup = styled(SLTabGroup)`
  background-color: white;
  --indicator-color: rgba(0, 0, 0, 0.0);
  --track-color: rgba(0, 0, 0, 0.0);
  display: flex;
  justify-content: center;
`;
const TimerTabPanel = styled(SLTabPanel)`
  color: black;
  height: 600px;
  overflow: auto;
`;
const TimerTab = styled(SLTab)`
`;

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <div className="header-bar">
        <Title className="header">YieldAI</Title>
        <div className="profile-buttons">
          <button className="profile-button">Profile</button>
          <button className="profile-button">Log Out</button>
        </div>
      </div>
      <TabGroup placement="top">
        <Tab className="profile-tab" slot="nav" panel="timer" active>Timer</Tab>
        <Tab className="profile-tab" slot="nav" panel="analytics">Analytics</Tab>
        <Tab className="profile-tab" slot="nav" panel="tasks">Tasks</Tab>

        <TabPanel name="timer">
          <TimerTabGroup>
            <TimerTab className="timer-profile-tab" slot="nav" panel="break" active>
              <button>Smart Break</button>
            </TimerTab>
            <TimerTab className="timer-profile-tab" slot="nav" panel="guard">
              <button>Focus Guard</button>
            </TimerTab>
            <TimerTab className="timer-profile-tab" slot="nav" panel="chunker">
              <button>Task Chunker</button>
            </TimerTab>
          </TimerTabGroup>
        </TabPanel>
        <TabPanel name="analytics"> This is the Analytics Page </TabPanel>
        <TabPanel name="tasks"> This is the Tasks PAge </TabPanel>
      </TabGroup>
    </main>
  );
}

export default App;
