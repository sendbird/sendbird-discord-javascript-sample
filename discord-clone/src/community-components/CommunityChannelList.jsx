import React, { useEffect, useState } from "react";
import { withSendBird, sendBirdSelectors } from "sendbird-uikit";
import "./community-channel-list.scss";
import OpenChannelPreview from "./OpenChannelPreview.jsx";
import AddCommunityChannel from "./create-community-channel/AddCommunityChannel";

function CommunityChannelList({
  sdk,
  userId,
  currentChannelUrl,
  setCurrentChannel,
}) {
  const [channels, setChannels] = useState([]);
  const [showingForm, setShowingForm] = useState(false);
  useEffect(() => {
    if (!sdk || !sdk.OpenChannel) {
      return;
    }

    const openChannelListQuery = sdk.OpenChannel.createOpenChannelListQuery();
    // @ts-ignore: Unreachable code error

    openChannelListQuery.next(function (openChannels, error) {
      if (error) {
        return;
      }
      setChannels(openChannels);
      if (openChannels.length > 0) {
        setCurrentChannel(openChannels[0]);
      }
    });
  }, [sdk,setCurrentChannel]);

  const showForm = () => {
    setShowingForm(!showingForm);
  };

  return (
    <div className="community-channel-list">
      <div className="community-channel-list__title">Text Channels</div>
      <button
        className="community-channel-create-iconbutton"
        onClick={showForm}
      >
        +
      </button>
      {showingForm && (
        <AddCommunityChannel
          setShowingForm={setShowingForm}
          sdk={sdk}
          userId={userId}
        />
      )}
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
    </div>
  );
}

export default withSendBird(CommunityChannelList, (store) => {
  return {
    sdk: sendBirdSelectors.getSdk(store)
  };
});
