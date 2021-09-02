import React , { useEffect, useState }  from 'react';
import { withSendBird, sendBirdSelectors } from 'sendbird-uikit';
import './community-channel-list.scss';
import OpenChannelPreview from './OpenChannelPreview.jsx';
import Profile from './Profile';
import {   
  OpenChannel
} from 'sendbird-uikit';

import * as SendBird from "sendbird";

function CommunityChannelList({
    sdk,
    user,
    appId,
    currentChannelUrl,
    setCurrentChannel
  }) {
    const [channels, setChannels] = useState([]);
    useEffect(() => {
      if (!sdk || !sdk.OpenChannel) {
        return;
      }

 //be able to filter the channels in later step     
    //return empty channels
      const openChannelListQuery = sdk.OpenChannel.createOpenChannelListQuery();
      // @ts-ignore: Unreachable code error


    //filtered for specific customType 
        // openChannelListQuery.customTypes = ["SB_COMMUNITY_TYPE"];
//only renders up to 20
      openChannelListQuery.next(function (openChannels, error) {
        if (error) {
          return;
        }
        setChannels(openChannels);
        if (openChannels.length > 0) {
          setCurrentChannel(openChannels[0]);
        }
      });
    }, [sdk]);

    // Initialize a SendBird instance to use APIs in your app.
    var sb = new SendBird({appId: appId});

    //createOpenChannel necessary params -> need to import 'sb'
    var params = new sb.OpenChannelParams();
    params.name = 'CHANNEL NAME 1ST TEST';
    params.coverUrlOrImage = '';
    params.operatorUserIds = ['']; // Or .operators(Array<User>)
    params.data = '';
    params.customType = '';
    params.channelUrl = ''; // For an open channel, you can create a channel by specifying its unique channel URL in a `OpenChannelParams` object.    

    const CustomComponent = (props) => {
        const {
            createOpenChannel
        } = props;
        return (
            <button className="community-channel-create-iconbutton" onClick={() => { createOpenChannel(params).then((params) => { console.log(params); }) }}>
                +
            </button>
        )
    };

    const CustomComponentWithSendBird = withSendBird(CustomComponent, (state) => {
        //using sendBirdSelector to grab getCreateOpenChannel function
            const createOpenChannel = sendBirdSelectors.getCreateOpenChannel(state);
            // (store) => (GroupChannelParams) => Promise<(GroupChannel, error)>    
            return ({
                createOpenChannel
            });
        }); 

//another way to try
      //   var test = sdk.OpenChannel.createChannel("Channel", "img url", "data", "OPERATOR_IDS", "CUSTOM_TYPE", function(openChannel, error) {
      //     if (error) {
      //         // Handle error.
      //     }
      
      //     // An open channel is successfully created.
      //     // Through the "openChannel" parameter of the callback function,
      //     // you can get the open channel's data from the result object that Sendbird server has passed to the callback function.
      //     const channelUrl = openChannel.channelUrl;
         
      // }); 
      
    return (
      <div className="community-channel-list">
        <div className="community-channel-list__title">Community Channels</div>
        <CustomComponentWithSendBird />
        <div className="community-channel-list__list">
          {channels.length === 0 ? (
            "No Channels"
          ) : (
            <div className="community-channel-list__scroll-wrap">
              <div>
                {channels.map((c) => (
                  <OpenChannelPreview
                    key={c.url}
                    channel={c}
                    selected={c.url === currentChannelUrl}
                    onClick={() => {
                      setCurrentChannel(c);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="community-channel-list__footer">
          <Profile user={user} />
        </div>
      </div>
    );
  }
  
  export default withSendBird(CommunityChannelList, (store) => {
    return {
      sdk: sendBirdSelectors.getSdk(store),
      user: store.stores.userStore.user
    };
  });
  