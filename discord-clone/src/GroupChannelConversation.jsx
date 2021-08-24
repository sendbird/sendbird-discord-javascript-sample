import React from "react"; 
import {   
    Channel as SBConversation,
    ChannelSettings as SBChannelSettings,
} from 'sendbird-uikit';
import "sendbird-uikit/dist/index.css";
import "./index.css";
import "./community.css";

export default function GroupChannelConversation(props){
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
        <div className="group-channel__conversation-wrap" >
                                <SBConversation
                                    channelUrl={currentChannelUrl}
                                    onChatHeaderActionClick={() => {
                                        setShowSettings(true);
                                        renderSettingsBar();
                                    }}                             
                                />
                          
                            {showSettings && (
                                <div className="sendbird-app__settingspanel-wrap">
                                    <SBChannelSettings
                                        channelUrl={currentChannelUrl}
                                        onCloseClick={() => {
                                            setShowSettings(false);
                                            hideSettingsBar();
                                        }}
                                    />
                                </div>
                            )}    
        </div>
    )
}