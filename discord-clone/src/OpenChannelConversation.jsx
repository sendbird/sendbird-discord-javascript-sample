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

    const conversationWrap= document.getElementsByClassName('sendbird-app__conversation-wrap')[0]

    const renderSettingsBar =()=>{    
        conversationWrap.style.marginRight= "250px";
    
        // const settingsSidebar = document.getElementsByClassName('sendbird-app__settingspanel-wrap')[0]
        // settingsSidebar.style.width = "250px"
        // console.log(settingsSidebar)
    }
    
    const hideSettingsBar=()=>{
        conversationWrap.style.marginRight= "0px";
    }
   

    return (
        <div className="community-open-channel__conversation-wrap"  >
                <OpenChannel
                    channelUrl={currentChannelUrl}
                    onChatHeaderActionClick={() => {
                        setShowSettings(true);
                        renderSettingsBar();
                    }}
                />
                {showSettings && (
                    <OpenChannelSettings
                        channelUrl={currentChannelUrl}
                        onCloseClick={() => {
                            setShowSettings(false);
                            hideSettingsBar();
                        }}
                    />
                )}
        </div>
    )
}