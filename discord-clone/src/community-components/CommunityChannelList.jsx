import React, { useEffect, useState } from "react";
import { useSendbirdStateContext, sendbirdSelectors } from "@sendbird/uikit-react";
import "./community-channel-list.scss";
import OpenChannelPreview from "./OpenChannelPreview.jsx";
import AddCommunityChannel from "./create-community-channel/AddCommunityChannel";

export default function CommunityChannelList({
  userId,
  currentChannelUrl,
  setCurrentChannel,
}) {
  const context = useSendbirdStateContext();
  const sdk = sendbirdSelectors.getSdk(context);

  const [channels, setChannels] = useState([]);
  const [showingForm, setShowingForm] = useState(false);
  useEffect(() => {
    if (!sdk || !sdk.openChannel) {
      return;
    }

    const openChannelListQuery = sdk.openChannel.createOpenChannelListQuery();
    openChannelListQuery.next().then((openChannels) => {
      setChannels(openChannels);
      if (openChannels.length > 0) {
        setCurrentChannel(openChannels[0]);
      }
    });
  }, [sdk, setCurrentChannel]);

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
