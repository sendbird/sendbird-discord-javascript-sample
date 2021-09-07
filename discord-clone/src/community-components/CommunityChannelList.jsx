import React , { useEffect, useState }  from 'react';
import { withSendBird, sendBirdSelectors } from 'sendbird-uikit';
import './community-channel-list.scss';
import OpenChannelPreview from './OpenChannelPreview.jsx';
import Profile from './Profile';
import * as SendBird from "sendbird";

function CommunityChannelList({
    sdk,
    user,
    userId,
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

    const [showingForm, setShowingForm] = useState(false);
    const showForm=()=>{
      setShowingForm(!showingForm);
    }

    var newChannelName = '';

    const openChannelFormSubmit = (event) => {
      newChannelName= event.target.channelName.value;
      CreatingNewChannel();
    }

    const CreatingNewChannel =()=> {
      sdk.OpenChannel.createChannel(newChannelName, "imageUrl", "data", "OPERATOR_IDS", "CUSTOM_TYPE", function(openChannel, error) {
        if (error) {
          // Handle error.
        }
      
        // An open channel is successfully created.
        // Through the "openChannel" parameter of the callback function,
        // you can get the open channel's data from the result object that Sendbird server has passed to the callback function.
        const channelUrl = openChannel.channelUrl;
      }); 
    } 

    return (
      <div className="community-channel-list">
        <div className="community-channel-list__title" >Community Channels</div>
        <button className="community-channel-create-iconbutton" onClick={showForm}>+</button>
        {
          showingForm && (
            <form onSubmit={(e) => openChannelFormSubmit(e)}>
              <label htmlFor="channelName">Channel name:</label>
              <input type="text" id="channelName" name="channelName"/><br></br>
              <input type="submit" value="submit" />
            </form>
          )
        }
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
  