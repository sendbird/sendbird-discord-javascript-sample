import "sendbird-uikit/dist/index.css";
import React, { useEffect, useState } from "react";    //useCallback
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
import { ContactSupportOutlined } from "@material-ui/icons";

export default function CustomizedApp({customizedPreviewItem}) {
    const [showSettings, setShowSettings] = useState(false);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [channels, setChannels] = useState([""]);
    const currentChannelUrl = currentChannel ? currentChannel.url : "";
    const communityOpenChannelConversation = document.getElementsByClassName("community-open-channel__conversation-wrap");
    const groupChannelConversation = document.getElementsByClassName("group-channel__conversation-wrap");
    //replacing avatar img with # in private channels
    const privateChannelAvatarBox = document.getElementsByClassName('MuiAvatar-root MuiAvatar-circular');
    Array.from(privateChannelAvatarBox).forEach( (iconBox) => {
        iconBox.innerText='#'
        iconBox.style.fontWeight="bold";
    })

    //removing img tag from channel-preview__avatar div
    const communityChannelAvatarBox = document.getElementsByClassName('channel-preview__avatar')
    Array.from(communityChannelAvatarBox).forEach( (iconBox) => {
        iconBox.innerHTML=`
            <div class="community-channel-preview__avatar" style="font-weight: bold;">#</div>
        `;
    })

    //Channel icon in chat's header changed to #
    const chatHeaderIcon = document.getElementsByClassName('sendbird-openchannel-conversation-header__left__cover-image sendbird-avatar');
    Array.from(chatHeaderIcon).forEach( (iconBox) => {
        console.log(iconBox, "icon box")
        // iconBox.style=""
        iconBox.innerHTML=`
            <div class="community-channel-preview__avatar" style="font-weight: bold; padding:0px 5px;">#</div>
        `;
    })

//only runs when currentChannel is changed
    useEffect( () => {
        if(currentChannel && currentChannel.url.includes('group_channel')){
            console.log("INCLUDES GROUP_CHANNEL")
            communityOpenChannelConversation[0].style.display="none";
            groupChannelConversation[0].style.display="";
        } else if (currentChannel && currentChannel.url.includes('open_channel') ){
            console.log("INCLUDES OPEN CHANNEL")
            groupChannelConversation[0].style.display="none";
            communityOpenChannelConversation[0].style.display="";
        }     
    }, [currentChannel])
   
    return (
      <div className="customized-app">
        <div className="sendbird-app__wrap">
            <div className="sendbird-app__channellist-wrap">
                <div className="private-channel-list">
                    <div className="private-channel-list__title">PRIVATE CHANNELS</div>
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
                <div className="community-open-channel__conversation-wrap" >
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
                <div className="group-channel__conversation-wrap" >
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
    </div>
  );
}