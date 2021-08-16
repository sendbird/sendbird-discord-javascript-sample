import "sendbird-uikit/dist/index.css";
import React, { useState } from "react";    //useCallback
import {   
    Channel as SBConversation,
    ChannelList as SBChannelList,
    ChannelSettings as SBChannelSettings,
    withSendBird
} from 'sendbird-uikit';
//import CustomizedChannelPreviewItem from "./CustomizedChannelPreviewItem";
import CommunityChannelList from './CommunityChannelList.js';

function CustomizedApp(props) {

    const {
        config: { userId },
        // customizedPreviewItem, 
        appId,
        nickname,
      } = props;
    
    // utilized w/ private channel list
    // const [currentChannelUrl, setCurrentChannelUrl] = useState("");
    
    const [showSettings, setShowSettings] = useState(false);

        //const [currentChannel, setCurrentChannel] = useState<Sendbird.OpenChannel>(null) ;
    const [currentChannel, setCurrentChannel] = useState("") ;

        //const [channels, setChannels] = useState<Array<Sendbird.OpenChannel>>([]);
    const [channels, setChannels] = useState([""]);
    const currentChannelUrl = currentChannel ? currentChannel.url : '';

    return (
      <div className="customized-app">
        <div className="sendbird-app__wrap">
          <div className="sendbird-app__channellist-wrap">
            {/* //List of private chats */}
                        {/* <SBChannelList
                        onChannelSelect={(channel) => {
                            if (channel && channel.url) {
                            setCurrentChannelUrl(channel.url);
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
                        /> */}
                    <div className="channel-list">
                        <CommunityChannelList
                            currentChannelUrl={currentChannelUrl}
                            setCurrentChannel={setCurrentChannel}
                            channels={channels}
                            setChannels={setChannels}
                        />
                    </div> 
          </div>


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

export default withSendBird(CustomizedApp);
//withSendBird ->  higher-order component to access data from SendBirdProvider
