import React from "react";
import { SendBirdProvider as SBProvider} from 'sendbird-uikit'
import "sendbird-uikit/dist/index.css";
import CustomizedApp from './CustomizedApp';
import './App.css';

function App() {

  const APP_ID = '87FFAEDA-9FEF-429D-9C56-F12EC1234049';
  const USER_ID = '1';
  const NICKNAME = 'Michelle';

  const myColorSet = {
    //background color
    '--sendbird-light-background-50':  '#474a50',

    //hover on my own message
    '--sendbird-light-primary-400': '#33353a',

    //selected chat's group name  AND background color of my text?
    '--sendbird-light-primary-300' : '#474a50',
   
    //
    '--sendbird-light-primary-200': 'rgba(0, 0, 0, 0.32)',
    
    //selected chat & EMOJI Background
    '--sendbird-light-primary-100'	:' #55595f',

    //all numbers / dates / names in chat
    '--sendbird-light-onlight-02':' #bdbdbd',

    //incoming msg font color
   '--sendbird-light-onlight-01' : '#FFFFFF',
    
   //incoming msg background color 
   '--sendbird-light-background-100' : '#474a50',

   //
  //  '--sendbird-add-reaction-button-border-hover' : '#33353a',
    //
  //  '--sendbird-tooltip-text-color' : '#33353a',

};

  return (
    <div>
      <SBProvider appId={APP_ID} 
                  userId={USER_ID} 
                  nickname={NICKNAME} 
                  allowProfileEdit={true} 
               
                  colorSet={myColorSet} >
        {/* customizable components inside SB Provider */}
        <CustomizedApp /> 
      </SBProvider>
    </div>
  )
}
export default App;
