// import './App.css';    -> delete if never use
import React from "react";
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import CustomizedApp from "./CustomizedApp.jsx";
import "./index.css";

export default function App() {

  const APP_ID = process.env.REACT_APP_APP_ID
  const USER_ID = process.env.REACT_APP_USER_ID
  const NICKNAME = process.env.REACT_APP_NICKNAME
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN

  const myColorSet ={
    //background color
    '--sendbird-light-background-50':  '#474a50',
      
    //
    '--sendbird-light-primary-500': '#33353a',
    
    //hover on my own message
    '--sendbird-light-primary-400': '#33353a',

    //selected chat's group name AND bg color of my text? AND hover on emoji reaction
    '--sendbird-light-primary-300' : '#474a50',
        
    //
    '--sendbird-light-primary-200': 'rgba(0, 0, 0, 0.32)',
          
    //selected chat & EMOJI Background
    '--sendbird-light-primary-100'	:' #474a50',
      
    //all numbers / dates / names in chat
    '--sendbird-light-onlight-02':' #bdbdbd',

    //incoming msg font color
    '--sendbird-light-onlight-01' : '#FFFFFF',
        
    //incoming msg background color sss
    '--sendbird-light-background-100' : '#474a50'
  };

  const customizedPreviewItem= true;

  return (
      <div  className="app-wrapper">
        <SBProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME} accessToken={ACCESS_TOKEN} colorSet={myColorSet}>
          <CustomizedApp  appId={APP_ID} userId={USER_ID} nickname={NICKNAME} customizedPreviewItem={customizedPreviewItem} />
        </SBProvider>
      </div>
    );
}