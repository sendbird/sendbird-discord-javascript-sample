import React, { useState, useEffect} from "react";
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import CustomizedApp from "./CustomizedApp.jsx";
import "./index.css";
import SendBirdCall from "sendbird-calls";
import useSbCalls from './OnCall/GroupCall/SbCalls/SbCallsContext/useSbCalls'
import GroupCall from "./OnCall/GroupCall/GroupCall.js";
import RoomCreated from "./OnCall/GroupCall/RoomCreated.js";

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
  const sbCalls = useSbCalls();
  const { rooms } = sbCalls;
  const [showRoomCreated, setShowRoomCreated] = useState(false);
  const [passedRoom , setPassedRoom] = useState({});
  const [onCall, setOnCall] = useState(false);
  SendBirdCall.init(APP_ID);

  const authOption = { userId: USER_ID, accessToken: ACCESS_TOKEN };
  SendBirdCall.authenticate(authOption, (result, error) => {
    if (error) {
    } else {
      SendBirdCall.connectWebSocket()
    }
  });
  
  useEffect(() => {
    const room = rooms[rooms.length - 1];
  }, [rooms]);

  return (
    <div className="app-wrapper">
      {onCall && (
        <>
        <GroupCall room={passedRoom} />
        <RoomCreated
         isOpen={showRoomCreated}
         room={passedRoom}
         close={() => setShowRoomCreated(false)}

        />
        </>
      )}
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

          setShowRoomCreated={setShowRoomCreated}
          setPassedRoom={setPassedRoom}
          setOnCall={setOnCall}
        />
      </SBProvider>
    </div>
  );
}
