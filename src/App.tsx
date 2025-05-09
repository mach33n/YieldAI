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
import SLCard from '@shoelace-style/shoelace/dist/react/card/index.js';
import SLProgressRing from '@shoelace-style/shoelace/dist/react/progress-ring/index.js';

 invoke('call')
 .then((res) =>
   console.log(res)
 )
 .catch((e) => console.error(e))
 
// Custom Stylings
// TODO: Migrate to css file
const Title = styled("h2")`
  font-weight: bold;
  font-size: 24px;
`;
const TimerTabGroup = styled(SLTabGroup)`
  background-color: white;
  --indicator-color: rgba(0, 0, 0, 0.0);
  --track-color: rgba(0, 0, 0, 0.0);
  padding-left: 15%;
  padding-right: 15%;
`;
const TimerTabPanel = styled(SLTabPanel)`
  color: black;
`;
const TimerTab = styled(SLTab)`
  width: 100%;
  pointer-events: none;
  &::part(base) {
    opacity: 1;
    cursor: default;
}
`;
const TimerButton = styled("button")`
  pointer-events: auto;
  background-color: ${props => props.active 
    ? 'rgb(224, 231, 255)' /* indigo-100 */ 
    : 'rgb(243, 244, 246)' /* gray-100 */};
  color: ${props => props.active 
    ? 'rgb(67, 56, 202)' /* indigo-700 */ 
    : 'rgb(75, 85, 99)' /* gray-600 */};
  `;
const TimerCard = styled(SLCard)`
  width: 100%;
  &::part(body) {
    background-color: gray;
  }
`
const TimerProgressRing = styled(SLProgressRing)`

  `;
function App() {
  const [mode, setMode] = useState('smart-break');

  return (
    <main className="container">
      <div className="header-bar">
        <Title className="header">YieldAI</Title>
        <div className="profile-buttons">
          <button className="profile-button">Profile</button>
          <button className="profile-button">Log Out</button>
        </div>
      </div>
      <TimerTabGroup>
        <TimerTab className="timer-profile-tab" slot="nav" panel="smart-break" active={mode === 'smart-break'}>
          <TimerButton active={mode === 'smart-break'} onClick={() => setMode('smart-break')}>Smart Break</TimerButton>
        </TimerTab>
        <TimerTab className="timer-profile-tab" slot="nav" panel="focus-guard" active={mode === 'focus-guard'}>
          <TimerButton active={mode === 'focus-guard'} onClick={() => setMode('focus-guard')}>Focus Guard</TimerButton>
        </TimerTab>
        <TimerTab className="timer-profile-tab" slot="nav" panel="task-chunker" active={mode === 'task-chunker'}>
          <TimerButton active={mode === 'task-chunker'} onClick={() => setMode('task-chunker')}>Task Chunker</TimerButton>
        </TimerTab>

        <TimerTabPanel name="smart-break">
          <TimerCard>
            <TimerProgressRing>
              Blah
            </TimerProgressRing>
          </TimerCard>
          <TimerCard></TimerCard>
        </TimerTabPanel>
        <TimerTabPanel name="focus-guard">Focus Guard Page</TimerTabPanel>
        <TimerTabPanel name="task-chunker">Task Chunker Page</TimerTabPanel>
      </TimerTabGroup>
    </main>
  );
}

export default App;
