import React from "react";
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import CustomizedApp from "./CustomizedApp.jsx";
import "./index.css";
import SendBirdCall from "sendbird-calls";

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

  // //https://github.com/sendbird/sendbird-calls-javascript
  // //initialize call instance
  // SendBirdCall.init(APP_ID);

  // //function to retrieve a list of available media devices or to retrieve any actual media streams
  // //SendBirdCall.useMedia();
  // const authOption = { userId: USER_ID, accessToken: ACCESS_TOKEN };
  // SendBirdCall.authenticate(authOption, (result, error) => {
  //   if (error) {
  //   } else {
  //     // user has been successfully authenticated & is connected to Sendbird server
  //     // establish websocket connection
  //     SendBirdCall.connectWebSocket()
  //       .then(/* Succeeded to connect */)
  //       .catch(/* Failed to connect */);
  //   }
  // });


  // //Register event handlers: device-specific listener; 
  //   //event handler for client app to respond to diff events
  // //UNIQUE_HANDLER_ID is any unique string value such as UUID
  // SendBirdCall.addListener(UNIQUE_HANDLER_ID, {
  //   onRinging: (call) => {},
  //   onAudioInputDeviceChanged: (currentDevice, availableDevices) => {},
  //   onAudioOutputDeviceChanged: (currentDevice, availableDevices) => {},
  //   onVideoInputDeviceChanged: (currentDevice, availableDevices) => {},
  // });


  // //Make a call -> dialParams to initiate a call
  // const dialParams = {
  //   //CALLEE_ID = USER_ID thats inputted to make the call to other user; grab from input field
  //   userId: CALLEE_ID,
  //   isVideoCall: true,
  //   //to set call's initial configuration
  //   callOption: {
  //     localMediaView: document.getElementById("local_video_element_id"),
  //     remoteMediaView: document.getElementById("remote_video_element_id"),
  //     audioEnabled: true,
  //     videoEnabled: true,
  //   },
  // };

  // //dial method to start making a call
  // const call = SendBirdCall.dial(dialParams, (call, error) => {
  //   if (error) {
  //   }
  //   //dial succeeded
  // });

  // call.onEstablished = (call) => {};

  // call.onConnected = (call) => {};

  // call.onEnded = (call) => {};

  // call.onRemoteAudioSettingsChanged = (call) => {};

  // call.onRemoteVideoSettingsChanged = (call) => {};

  // //remoteMediaView is required for remote media stream to be displayed ->
  // let remoteElement = dialParams.callOption.remoteMediaView;
  // call.setRemoteMediaView(remoteElement);
  // let localElement = dialParams.callOption.localMediaView;
  // call.setLocalMediaView(localElement);


  // //Receiving a call -> register a listener to receive incoming calls
  // //UNIQUE_HANDLER_ID ??
  // SendBirdCall.addListener(UNIQUE_HANDLER_ID, {
  //   onRinging: (call) => {
  //     //these listeners enable reacting to in-call events w/ callbacks methods
  //     call.onEstablished = (call) => {};

  //     call.onConnected = (call) => {};

  //     call.onEnded = (call) => {};

  //     call.onRemoteAudioSettingsChanged = (call) => {};

  //     call.onRemoteVideoSettingsChanged = (call) => {};

  //     const acceptParams = {
  //       callOption: {
  //         localMediaView: document.getElementById("local_video_element_id"),
  //         remoteMediaView: document.getElementById("remote_video_element_id"),
  //         audioEnabled: true,
  //         videoEnabled: true,
  //       },
  //     };
  //     //accept incoming call -> if call accepted, media session's automatically established
  //     call.accept(acceptParams);

  //     //decline incoming call
  //     call.end();
  //   },
  // });


  // //Handling current call
  // call.muteMicrophone();
  // call.unmuteMicrophone();

  // // start to show video
  // call.startVideo();
  // // stops showing video
  // call.stopVideo();

  // // receives the audio event (if callee changes their audio setting, caller is notified)
  // call.onRemoteAudioSettingsChanged = (call) => {
  //   if (call.isRemoteAudioEnabled) {
  //     // the peer has been unmuted
  //     // Consider displaying a muted icon
  //   } else {
  //     // the peer has been muted.
  //     // Consider displaying an unmuted icon.
  //   }
  // };

  // // receives the video event (if callee changes their video settings, caller is notified)
  // call.onRemoteVideoSettingsChanged = (call) => {
  //   if (call.isRemoteVideoEnabled) {
  //     // The peer has started the video
  //   } else {
  //     // The peer has stopped the video
  //   }
  // };


  // // End a call
  // call.end();

  // // receives the event
  // call.onEnded = (call) => {
  //   // Ccnsider releasing or destroying call-related view from here.
  // };

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
