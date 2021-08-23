import "sendbird-uikit/dist/index.css";
import React, { useState } from "react";    //useCallback
import { ChannelList as SBChannelList} from 'sendbird-uikit';
import CustomizedChannelPreviewItem from "./CustomizedChannelPreviewItem";
import CommunityChannelList from './community-components/CommunityChannelList.jsx';
import "./community.css";
import "./index.css";
import GroupChannelConversation from "./GroupChannelConversation";
import OpenChannelConversation from './OpenChannelConversation';
import WelcomeConversation from "./WelcomeConversation";

export default function CustomizedApp({customizedPreviewItem}) {
    const [showSettings, setShowSettings] = useState(false);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [channels, setChannels] = useState([""]);
    const currentChannelUrl = currentChannel ? currentChannel.url : "";
   
    const conversationChatWindow = () => {
        if(currentChannel && currentChannel.url.includes('group_channel')){ 
            return <GroupChannelConversation
                        currentChannelUrl={currentChannelUrl}
                        setShowSettings={setShowSettings}
                        showSettings={showSettings}
                    />
        } else if (currentChannel && currentChannel.url.includes('open_channel') ){
            return <OpenChannelConversation 
                        currentChannelUrl={currentChannelUrl}
                        setShowSettings={setShowSettings}
                        showSettings={showSettings}
                    />
        } 
//on initial render, it will show this 1st since Channel's have not loaded yet (within 1sec)
        // else {
        //     return <WelcomeConversation />
        // }
    }

    return (
      <div className="customized-app">
        <div className="sendbird-app__wrap">
            <div className="sendbird-app__channellist-wrap">
                <div className="private-channel-list">
                    <div className="private-channel-list__title">PRIVATE CHANNELS</div>
                        <SBChannelList
                            onChannelSelect={(channel) => {
                                if (channel && channel.url) {
                                    // setCurrentChannelUrl(channel.url);
                                    setCurrentChannel(channel);                        
                                } 
                            }}                           
                            renderChannelPreview={                               
                                customizedPreviewItem
                                ? ({ channel, onLeaveChannel }) => (
                                    <CustomizedChannelPreviewItem
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