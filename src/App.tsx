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

const TabGroup = styled(SLTabGroup)`
  background-color: white;
  height: 100%;
`;
const TabPanel = styled(SLTabPanel)`
  color: black;
  height: 100%;
  width: 100%;
`;
const Tab = styled(SLTab)`
  color: black;
`;
const Title = styled("h2")`
  font-weight: bold;
  font-size: 24px;
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
        <Tab slot="nav" panel="timer" active>Timer</Tab>
        <Tab slot="nav" panel="analytics">Analytics</Tab>
        <Tab slot="nav" panel="tasks">Tasks</Tab>

        <TabPanel name="timer"> This is the Timer Page</TabPanel>
        <TabPanel name="analytics"> This is the Analytics Page </TabPanel>
        <TabPanel name="tasks"> This is the Tasks PAge </TabPanel>
      </TabGroup>
    </main>
  );
}

export default App;
