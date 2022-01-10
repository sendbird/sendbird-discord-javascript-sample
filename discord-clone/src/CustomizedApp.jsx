import "sendbird-uikit/dist/index.css";
import React, { useState } from "react";
import { ChannelList as SBChannelList, withSendBird } from "sendbird-uikit";
import CustomizedChannelPreviewItem from "./CustomizedChannelPreviewItem";
import CommunityChannelList from "./community-components/CommunityChannelList.jsx";
import "./community.css";
import "./index.css";
import GroupChannelConversation from "./GroupChannelConversation";
import OpenChannelConversation from "./OpenChannelConversation";
import Profile from "./community-components/Profile";
import VoiceCallForm from "./VoiceCallForms/VoiceCallForm";
import DirectCallForm from "./VoiceCallForms/DirectCallForm";
import GroupCallForm from "./VoiceCallForms/GroupCallForm";
// import SendBirdCall from "sendbird-calls";

function CustomizedApp({
  user,
  customizedPreviewItem,
  userId,
  appId,
  nickname,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showGroupCallForm, setShowGroupCallForm] = useState(false);
  const [showDirectCallForm, setShowDirectCallForm] = useState(false);
  const [showVoiceCallForm, setShowVoiceCallForm] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  const serverName = `${nickname}'s server`;
  const lowerCaseServerName = serverName.toLowerCase();

  const conversationChatWindow = () => {
    if (currentChannel && currentChannel.url.includes("group_channel")) {
      return (
        <GroupChannelConversation
          currentChannelUrl={currentChannelUrl}
          setShowSettings={setShowSettings}
          showSettings={showSettings}
          userId={userId}
        />
      );
    } else if (currentChannel && currentChannel.url.includes("open_channel")) {
      return (
        <OpenChannelConversation
          currentChannelUrl={currentChannelUrl}
          setShowSettings={setShowSettings}
          showSettings={showSettings}
        />
      );
    }
  };

  //sendbird calls:   https://www.youtube.com/watch?v=eBbDY8axkDA
  //Make a call
  //dial method ->set dial parameters :
  //callee's user_id to specify user you want to call
  //isVideoCall = true/false - specify if audio or video call
  // SendbirdCall.dial()

  //call options :
  //local media view, remote media view , autoEnabled = t/f, videoEnabled = t/f

  //Recieve a call
  //Add SendbirdCallListener / SendBirdCallDelegate to listen for call events
  //Listen for DirectCall by adding onRinging listener -> choose call.accept OR call.decline
  //Add DirectCallListener/DirectCallDelegate to listen for call-specific events
  //once the call comes thru, these funcs start to fire:
  // func didEstablish(_call:DirectCall)
  // func didConnect(_call:DirectCall)
  // func didRemoteAudioSettingsChange(_call:DirectCall) -> is audio on
  // func didRemoteVideoSettingsChange(_call:DirectCall) -> is video on
  // func didEnd(_call:DirectCall) -> signals to either party if the call ends
  // Hang up -> whoever wants to initiate to hang up can -> using: call.end()
  //DirectCallListener/DirectCallDelegate fires an event
  // onEnded(DirectCall call)
  //release or destroy call view

  const renderVoiceCallForm = () => {
    setShowVoiceCallForm(!showVoiceCallForm);
    // setShowGroupCallForm(!showGroupCallForm);
    // setShowDirectCallForm(!showDirectCallForm);
  };

  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <h1 className="server-headline">{lowerCaseServerName}</h1>
          <div className="private-channel-list">
            <SBChannelList
              onChannelSelect={(channel) => {
                if (channel && channel.url) {
                  setCurrentChannel(channel);
                }
              }}
              renderChannelPreview={
                customizedPreviewItem
                  ? ({ channel, onLeaveChannel }) => (
                      <CustomizedChannelPreviewItem
                        userId={userId}
                        channel={channel}
                        onLeaveChannel={onLeaveChannel}
                        currentChannelUrl={currentChannelUrl}
                      />
                    )
                  : null
              }
            />
          </div>
          <div className="community-app">
            <div className="community-channel-list">
              <CommunityChannelList
                userId={userId}
                appId={appId}
                currentChannelUrl={currentChannelUrl}
                setCurrentChannel={setCurrentChannel}
              />
            </div>
          </div>
          <div className="voice-channel-list">
            <div
              className="voice-channel-list__title"
              onClick={renderVoiceCallForm}
            >
              Voice Call
            </div>
            {showVoiceCallForm && (
              <VoiceCallForm
                setShowVoiceCallForm={setShowVoiceCallForm}
                setShowGroupCallForm={setShowGroupCallForm}
                setShowDirectCallForm={setShowDirectCallForm}
              />
            )}

            {showDirectCallForm && (
              <DirectCallForm setShowDirectCallForm={setShowDirectCallForm} />
            )}

            {showGroupCallForm && (
              <GroupCallForm setShowGroupCallForm={setShowGroupCallForm} />
            )}
          </div>
          <div className="channel-list__footer">
            <Profile user={user} />
          </div>
        </div>
        <div className="sendbird-app__conversation-wrap">
          {conversationChatWindow()}
        </div>
      </div>
    </div>
  );
}

export default withSendBird(CustomizedApp, (store) => {
  return {
    user: store.stores.userStore.user,
  };
});
