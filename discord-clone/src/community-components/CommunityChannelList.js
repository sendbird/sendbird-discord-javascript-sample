// import React, { ReactElement, useEffect, useState } from 'react';
// import withSendBird from '../../../lib/SendbirdSdkContext';
// import sendBirdSelectors from '../../../lib/selectors';
import React , { useEffect, useState }  from 'react';
import { withSendBird, sendBirdSelectors } from 'sendbird-uikit';
import './community-channel-list.scss';
import OpenChannelPreview from './OpenChannelPreview';
import Profile from './Profile';

// interface Props {
//   sdk: SendBird.SendBirdInstance;
//   user: SendBird.User;
//   currentChannelUrl: string;
//   setCurrentChannel(channel: SendBird.OpenChannel): void;
//   channels: Array<SendBird.OpenChannel>;
//   setChannels(channels: Array<SendBird.OpenChannel>): void;
// }


// function CommunityChannelList(props){

    // const [channelSource, setChannelSource] = useState<SendBird.OpenChannelListQuery>(null);

    // useEffect(() => {
    //     if (!sdk || !sdk.OpenChannel) {
    //     return;
    //     }
    // })

//     const openChannelListQuery = sdk.OpenChannel.createOpenChannelListQuery();
//     // @ts-ignore: Unreachable code error
//     openChannelListQuery.customTypes = ['SB_COMMUNITY_TYPE'];
//     setChannelSource(openChannelListQuery);
//     openChannelListQuery.next((openChannels, error) => {
//       if (error) {
//         return;
//       }
//       setChannels(openChannels);
//       if (openChannels.length > 0) {
//         setCurrentChannel(openChannels[0]);
//       }
//     });

//   }, [sdk]);

// console.log(props.channels , "channels")


//   return (
//     <div className="community-channel-list">
//       <div className="community-channel-list__title">
//         Open Channels
//       </div>
//       {/* <div
//         className="community-channel-list__list"
//         onScroll={(e: React.FormEvent<HTMLDivElement> ) => {
//           const target = e.target as HTMLDivElement;
//           const fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;
//           if (fetchMore && channelSource.hasNext) {
//             channelSource.next((openChannels, error) => {
//               if (error) {
//                 return;
//               }
//               setChannels([...channels, ...openChannels]);
//             });
//           }
//         }}
//       > */}
//         {
//           props.channels.length === 0
//           ? (
//             "No Channels"
//           )
//           : (
//             <div className="community-channel-list__scroll-wrap">
//               <div>
//                 {

// // props.channels -> returning empty array
//                   props.channels.map(c => (
//                     <OpenChannelPreview
//                       key={c.url}
//                       channel={c}
//                       selected={c.url === props.currentChannelUrl}
//                       onClick={
//                         () => {props.setCurrentChannel(c)}
//                       }
//                     />
//                   ))
//                 }
//               </div>
//             </div>
//           )
//         }
//       </div>

 
//   )
// }



// export default withSendBird(CommunityChannelList);









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
      const openChannelListQuery = sdk.OpenChannel.createOpenChannelListQuery();
      // @ts-ignore: Unreachable code error
      openChannelListQuery.customTypes = ["SB_COMMUNITY_TYPE"];
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
          <p className="community-channel-list__placeholder">
            Preset channels developed by UI Kit
          </p>
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
  