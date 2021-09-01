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
// import {   
//     OpenChannel
// } from 'sendbird-uikit';

// import {
//     withSendBird,
//     sendBirdSelectors,
// } from 'sendbird-uikit';

export default function CustomizedApp({customizedPreviewItem, userId, appId}) {
    // const {
    //     stores: { sdkStore }
    //   } = props;
    //   const { sdk } = sdkStore;
    
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
//on initial render, it will show this 1st since Channel's have not loaded yet (within 1sec)
        // else {
        //     return <WelcomeConversation />
        // }
    }



    // const CustomComponentWithSendBird = withSendBird(CustomComponent, (state) => {
    //     //example  //(store) => (channelUrl) => Promise<(_, error)>
    //     const enterOpenChannel = sendBirdSelectors.getEnterOpenChannel(state);
        

    // //using the sendbird Selector called 'getCreateOpenChannel'
    //     const createOpenChannel = sendBirdSelectors.getCreateOpenChannel(state);
    //     // (store) => (GroupChannelParams) => Promise<(GroupChannel, error)>

    //     return ({
    //         enterOpenChannel,
    //         createOpenChannel
    //     });
    // }); 

    // const CustomComponent = (props) => {
    //     const {
    //         enterOpenChannel,
    //         createOpenChannel
    //     } = props;
    //     return (
    //         <div> 
    //         <button onClick={() => { enterOpenChannel('channelUrl').then((channel) => { console.log(channel); }) }}>
    //             Enter Channel
    //         </button>
    //         {/* how to send argument GroupChannelParams */}
    //         <button onClick={() => { createOpenChannel(params).then((params) => { console.log(params); }) }}>
    //             Create Open Channel
    //         </button>
    //       </div>
    //     )
    // };


    // OpenChannel.createChannel(NAME, COVER_IMAGE_OR_URL, DATA, OPERATOR_IDS, CUSTOM_TYPE, function(openChannel, error) {
    //     if (error) {
    //         // Handle error.
    //     }
    
    //     // An open channel is successfully created.
    //     // Through the "openChannel" parameter of the callback function,
    //     // you can get the open channel's data from the result object that Sendbird server has passed to the callback function.
    //     const channelUrl = openChannel.channelUrl;
        
    // });


//this is a sendbird Selector
    // export const getCreateOpenChannel = (store) => (params) => {
    //     const sdk = getSdk(store);
    //     return new Promise((resolve, reject) => {
    //       if (!sdk) {
    //         reject(new Error('Sdk not found'));
    //       }
    //       sdk.OpenChannel.createChannel(params)
    //         .then((channel) => {
    //           resolve(channel);
    //         })
    //         .catch(reject);
    //     });
    //   };


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


{/* Create Open Channel  */}
    {/* <CustomComponentWithSendBird /> */}


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