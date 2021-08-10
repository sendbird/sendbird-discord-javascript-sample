import "sendbird-uikit/dist/index.css";
import React, { useState } from "react";    //useCallback
import {   
    Channel as SBConversation,
    ChannelList as SBChannelList,
    ChannelSettings as SBChannelSettings,
    withSendBird 
} from 'sendbird-uikit';

function CustomizedApp(props) {
    // default props
        // const {
        //   stores: { sdkStore, userStore },
        //   config: {
        //     isOnline,
        //     userId,
        //     appId,
        //     accessToken,
        //     theme,
        //     userListQuery,
        //     logger,
        //     pubSub
        //   }
        // } = props;
        // const logDefaultProps = useCallback(() => {}, [
        //   sdkStore.initialized,
        //   sdkStore.sdk,
        //   sdkStore.loading,
        //   sdkStore.error,
        //   userStore.initialized,
        //   userStore.user,
        //   userStore.loading,
        //   isOnline,
        //   userId,
        //   appId,
        //   accessToken,
        //   theme,
        //   userListQuery,
        //   logger,
        //   pubSub
        // ]);
        // logDefaultProps();
  
    // useState since in functional component
    const [showSettings, setShowSettings] = useState(false);
    const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  
    return (
      <div className="customized-app">
        <div className="sendbird-app__wrap">
          <div className="sendbird-app__channellist-wrap">
            <SBChannelList
              onChannelSelect={(channel) => {
                if (channel && channel.url) {
                  setCurrentChannelUrl(channel.url);
                }
              }}
            />
          </div>
          <div className="sendbird-app__conversation-wrap">
            <SBConversation
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
            />
          </div>
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <SBChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
              onChannelModified={(h) => {
                  console.log(h)
              }}
            />
          </div>
        )}
      </div>
    );
  }
  //withSendBird ->  higher-order component to access data from SendBirdProvider
  export default withSendBird(CustomizedApp);
  