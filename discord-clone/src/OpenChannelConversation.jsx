import React from 'react'
import {   
    OpenChannel,
    OpenChannelSettings
} from 'sendbird-uikit';
import "sendbird-uikit/dist/index.css";
import "./index.css";
import "./community.css";

export default function communityOpenChannelConversation(props){
    const {currentChannelUrl, setShowSettings, showSettings} = props;
    console.log("in GroupChannelConversation")
    return (
        <div className="community-open-channel__conversation-wrap"  >
                <OpenChannel
                    channelUrl={currentChannelUrl}
                    onChatHeaderActionClick={() => {
                        setShowSettings(true);
                    }}
                />
                {showSettings && (
                    <OpenChannelSettings
                        channelUrl={currentChannelUrl}
                        onCloseClick={() => {
                            setShowSettings(false);
                        }}
                    />
                )}
        </div>
    )
}