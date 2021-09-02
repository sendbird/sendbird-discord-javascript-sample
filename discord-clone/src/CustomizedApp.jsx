import "sendbird-uikit/dist/index.css";
import React, { useState } from "react";    //useCallback
import { ChannelList as SBChannelList} from 'sendbird-uikit';
import CustomizedChannelPreviewItem from "./CustomizedChannelPreviewItem";
import CommunityChannelList from './community-components/CommunityChannelList.jsx';
import "./community.css";
import "./index.css";
import GroupChannelConversation from "./GroupChannelConversation";
import OpenChannelConversation from './OpenChannelConversation';
import { NICKNAME, USER_ID } from "./const";

export default function CustomizedApp({customizedPreviewItem, userId, appId}) {    
    const [showSettings, setShowSettings] = useState(false);
    const [currentChannel, setCurrentChannel] = useState(null);
    // const [channels, setChannels] = useState([""]);
    
    //changed from currentChannelUrl - Used only in private channel SBChannelList
    // const [currentPrivateChannelUrl, setCurrentPrivateChannelUrl] = useState("");
    const currentChannelUrl = currentChannel ? currentChannel.url : "";

    const serverName = `${NICKNAME}'s server`;
    const lowerCaseServerName = serverName.toLowerCase();

    const conversationChatWindow = () => {
        if(currentChannel && currentChannel.url.includes('group_channel')){ 
            return <GroupChannelConversation
                        currentChannelUrl={currentChannelUrl}
                        setShowSettings={setShowSettings}
                        showSettings={showSettings}
                        userId={USER_ID}
                    />
        } else if (currentChannel && currentChannel.url.includes('open_channel') ){
            return <OpenChannelConversation 
                        currentChannelUrl={currentChannelUrl}
                        setShowSettings={setShowSettings}
                        showSettings={showSettings}
                    />
        } 
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
                                    // setCurrentPrivateChannelUrl(currentPrivateChannelUrl);
                                    //gives errors
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
                            appId={appId}
                            currentChannelUrl={currentChannelUrl}
                            setCurrentChannel={setCurrentChannel}
                        /> 
                    </div>
                </div>
            </div>
            <div className="sendbird-app__conversation-wrap">
                {conversationChatWindow()}
            </div> 
      </div>
    </div>
  );
}