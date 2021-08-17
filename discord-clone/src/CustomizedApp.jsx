import "sendbird-uikit/dist/index.css";
import React, { useState } from "react";    //useCallback
import {   
    Channel as SBConversation,
    ChannelList as SBChannelList,
    ChannelSettings as SBChannelSettings,
    OpenChannel,
    OpenChannelSettings
} from 'sendbird-uikit';
import CustomizedChannelPreviewItem from "./CustomizedChannelPreviewItem";
import CommunityChannelList from './community-components/CommunityChannelList.jsx';
import "./community.scss";
import GroupChannelConversation from "./GroupChannelConversation";

export default function CustomizedApp({ appId, userId, nickname, accessToken,customizedPreviewItem }) {
    
    const [showSettings, setShowSettings] = useState(false);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [channels, setChannels] = useState([""]);

//for private channels
    // const [currentChannelUrl, setCurrentChannelUrl] = useState("");

//for Community Channels
    const currentChannelUrl = currentChannel ? currentChannel.url : "";


    if(currentChannel && currentChannel.url.includes('group_channel')){
        console.log("INCLUDES GROUP_CHANNEL")
        //render conversation for Group/private channels to open
            // <GroupChannelConversation />
    } else if (currentChannel && currentChannel.url.includes('open_channel') ){
        console.log("INCLUDES OPEN CHANNEL")
        //render conversation for Open channels to open
    } else { 

    }

console.log('CURRENT CHANNEL URL', currentChannelUrl)

    return (
      <div className="customized-app">
        <div className="sendbird-app__wrap">
          <div className="sendbird-app__channellist-wrap">
            <div className="private-channel-list">
                {/* <div class="private-channel-list__title">Private Channels</div> */}
               <SBChannelList
                    onChannelSelect={(channel) => {
                        if (channel && channel.url) {
                            //setCurrentChannelUrl(channel.url);
                            setCurrentChannel(channel)
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
                <div className="channel-list">
                     <CommunityChannelList
                        currentChannelUrl={currentChannelUrl}
                        setCurrentChannel={setCurrentChannel}
                        userId={userId}
                    /> 
                </div>
             </div>

        </div>


{/* chat conversation for Open Channel */}
<div className="community-open-channel">
                        <OpenChannel
                            channelUrl={currentChannelUrl}
                            onChatHeaderActionClick={() => {
                                setShowSettings(true);
                            }}
                        />
                    </div>


                    {showSettings && (
                    <OpenChannelSettings
                        channelUrl={currentChannelUrl}
                        onCloseClick={() => {
                            setShowSettings(false);
                        }}
                    />
                    )}



                
{/* chat conversation for Private Channel */}
         <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
            {showSettings && (
            <div className="sendbird-app__settingspanel-wrap">
                <SBChannelSettings
                channelUrl={currentChannelUrl}
                onCloseClick={() => {
                    setShowSettings(false);
                }}
                />
            </div>
            )} 
            
      </div>
    </div>
  );
}

// export default withSendBird(CustomizedApp);
//withSendBird ->  higher-order component to access data from SendBirdProvider
