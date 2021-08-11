import React from "react";
import { SendBirdProvider as SBProvider} from 'sendbird-uikit'
import "sendbird-uikit/dist/index.css";
import CustomizedApp from './CustomizedApp';
import './App.css';

function App() {

  const APP_ID = '87FFAEDA-9FEF-429D-9C56-F12EC1234049';
  const USER_ID = '1';

  const NICKNAME = 'Mich';

  const myColorSet = {
    //background color
    '--sendbird-light-background-50':  'rgba(0, 0, 0, 0.55)',
    //hover 
    '--sendbird-light-background-100' : 'rgba(0, 0, 0, 0.32)',
    //not sure -light red
    '--sendbird-light-ondark-04': '#f66161',

    //hover on my own message
    '--sendbird-light-primary-400': '#bdbdbd',

    //selected chat w/ persons name AND background color of my text?
    '--sendbird-light-primary-300' : '#eeeeee',
    //
    '--sendbird-light-primary-200': 'rgba(0, 0, 0, 0.32)',
    //selected chat
    '--sendbird-light-primary-100'	:'rgba(0, 0, 0, 0.32)',
    //all numbers / dates
    '--sendbird-light-onlight-02':' #bdbdbd'
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
