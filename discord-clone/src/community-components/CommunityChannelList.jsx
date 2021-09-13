import React , { useEffect, useState }  from 'react';
import { withSendBird, sendBirdSelectors } from 'sendbird-uikit';
import './community-channel-list.scss';
import OpenChannelPreview from './OpenChannelPreview.jsx';
import Profile from './Profile';
import AddCommunityChannel from './create-community-channel/AddCommunityChannel';

function CommunityChannelList({
    sdk,
    user,
    userId,
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

      // openChannelListQuery.customTypes = ["SB_COMMUNITY_TYPE"];
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

    };

    return (
      <div className="community-channel-list">
        <div className="community-channel-list__title" >Community Channels</div>
        <button className="community-channel-create-iconbutton" onClick={showForm}>+</button>
        {
          showingForm && (

             <AddCommunityChannel 
                  setShowingForm={setShowingForm}
                  sdk={sdk}
                  userId={userId}
            />
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
  