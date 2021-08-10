import React from "react";
import { SendBirdProvider as SBProvider} from 'sendbird-uikit'
import "sendbird-uikit/dist/index.css";
import CustomizedApp from './CustomizedApp';
import './App.css';

function App() {

  const APP_ID = '87FFAEDA-9FEF-429D-9C56-F12EC1234049';
  const USER_ID = '1';
  const THEME = 'dark';
  const NICKNAME = 'Mich';
  const myColorSet = {
    '--sendbird-add-reaction-button-border-hover' : '#69c085',
    '--sendbird-selected-reaction-button-border-hover' : '#69c085',
    '--sendbird-dark-information-100': '#adc9ff',

    '--sendbird-light-primary-500': '#adc9ff',
    '--sendbird-light-primary-400': '#adc9ff',
    '--sendbird-light-primary-300': '#adc9ff',
    '--sendbird-light-primary-200': '#adc9ff',
};

  return (
    <div>
      <SBProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME} allowProfileEdit={true} theme={THEME} colorSet={myColorSet} >
        <CustomizedApp />
      </SBProvider>
    </div>
  )
}
export default App;
