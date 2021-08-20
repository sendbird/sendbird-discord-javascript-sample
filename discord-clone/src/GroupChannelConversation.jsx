import React from 'react'
import {   
    Channel as SBConversation,
    ChannelSettings as SBChannelSettings,
} from 'sendbird-uikit';
import "sendbird-uikit/dist/index.css";
import "./index.css";
import "./community.css";

export default function GroupChannelConversation(props){
    const {currentChannelUrl, setShowSettings, showSettings} = props;
    return (
        <div className="group-channel__conversation-wrap" >
                                <SBConversation
                                    channelUrl={currentChannelUrl}
                                        onChatHeaderActionClick={() => {
                                        setShowSettings(true);
                                    }}

                                />
                          
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
    )
}