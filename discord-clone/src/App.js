// import './App.css';    -> delete if never use
import React from "react";
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import CustomizedApp from "./CustomizedApp.jsx";
import "./index.css";

export default function App() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const USER_ID = process.env.REACT_APP_USER_ID;
  const NICKNAME = process.env.REACT_APP_NICKNAME;
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  const myColorSet = {
    "--sendbird-light-background-50": "#474a50",
    "--sendbird-light-primary-500": "#33353a",
    "--sendbird-light-primary-400": "#33353a",
    "--sendbird-light-primary-300": "#474a50",
    "--sendbird-light-primary-200": "rgba(0, 0, 0, 0.32)",
    "--sendbird-light-primary-100": " #474a50",
    "--sendbird-light-onlight-02": " #bdbdbd",
    "--sendbird-light-onlight-01": "#FFFFFF",
    "--sendbird-light-background-100": "#474a50",
  };

  const customizedPreviewItem = true;

  return (
    <div className="app-wrapper">
      <SBProvider
        appId={APP_ID}
        userId={USER_ID}
        nickname={NICKNAME}
        accessToken={ACCESS_TOKEN}
        colorSet={myColorSet}
      >
        <CustomizedApp
          appId={APP_ID}
          userId={USER_ID}
          nickname={NICKNAME}
          customizedPreviewItem={customizedPreviewItem}
        />
      </SBProvider>
    </div>
  );
}
