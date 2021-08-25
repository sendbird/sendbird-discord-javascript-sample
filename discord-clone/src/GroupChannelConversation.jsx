import React from "react"; 
import {   
    Channel as SBConversation,
    ChannelSettings as SBChannelSettings,
} from 'sendbird-uikit';
import "sendbird-uikit/dist/index.css";
import "./index.css";
import "./community.css";

//testing this 
import CustomizedMessageItem from "./CustomizedMessageItems/CustomizedMessageItem";


export default function GroupChannelConversation(props){
    const {currentChannelUrl, setShowSettings, showSettings, userId} = props;
    const conversationWrap= document.getElementsByClassName('sendbird-app__conversation-wrap')[0];
    const renderSettingsBar =()=>{    
        conversationWrap.style.marginRight= "250px";
    };
    const hideSettingsBar=()=>{
        conversationWrap.style.marginRight= "0px";
    };

    return (
        <div className="group-channel__conversation-wrap" >
                                <SBConversation
                                    channelUrl={currentChannelUrl}
                                    onChatHeaderActionClick={() => {
                                        setShowSettings(true);
                                        renderSettingsBar();
                                    }}     
                                    renderChatItem={({
                                        message
                                        // ,
                                        // onDeleteMessage,
                                        // onUpdateMessage
                                        // onResendMessage
                                        // emojiContainer
                                      }) => (
                                        <CustomizedMessageItem
                                          message={message}
                                        //   onDeleteMessage={onDeleteMessage}
                                        //   onUpdateMessage={onUpdateMessage}
                                          userId={userId}
                                        />
                                      )}                                     
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