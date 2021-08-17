import React , { useEffect, useState }  from 'react';
import { withSendBird, sendBirdSelectors } from 'sendbird-uikit';
import './community-channel-list.scss';
import OpenChannelPreview from './OpenChannelPreview.jsx';
import Profile from './Profile';

function CommunityChannelList({
    sdk,
    user,
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

    return (
      <div className="community-channel-list">
        <div className="community-channel-list__title">Community Channels</div>
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
  