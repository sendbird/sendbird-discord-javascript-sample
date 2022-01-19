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
import GroupCallForm from "./VoiceCallForms/GroupCallForm";

function CustomizedApp({
  user,
  customizedPreviewItem,
  userId,
  appId,
  nickname,
  setShowRoomCreated,
  setPassedRoom,
  setOnCall,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showGroupCallForm, setShowGroupCallForm] = useState(false);
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

  const renderGroupCallForm = () => {
    setShowGroupCallForm(true);
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
              onClick={renderGroupCallForm}
            >
              Group Call
            </div>
            {showGroupCallForm && (
              <GroupCallForm
                setShowGroupCallForm={setShowGroupCallForm}
                setShowRoomCreated={setShowRoomCreated}
                setPassedRoom={setPassedRoom}
                setOnCall={setOnCall}
              />
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
