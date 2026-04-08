import React, { useEffect, useState } from "react";
import { useSendbirdStateContext, sendbirdSelectors } from "@sendbird/uikit-react";

import "./streaming-channel-list.scss";
import OpenChannelPreview from "./OpenChannelPreview";
import Profile from "./Profile";

export default function StreamingChannelList({
  currentChannelUrl,
  setCurrentChannel,
}) {
  const context = useSendbirdStateContext();
  const sdk = sendbirdSelectors.getSdk(context);
  const user = context?.stores?.userStore?.user;

  const [channels, setChannels] = useState([]);
  useEffect(() => {
    if (!sdk || !sdk.openChannel) {
      return;
    }
    const openChannelListQuery = sdk.openChannel.createOpenChannelListQuery();
    openChannelListQuery.customTypes = ["SB_LIVE_TYPE"];
    openChannelListQuery.next().then((openChannels) => {
      setChannels(openChannels);
      if (openChannels.length > 0) {
        setCurrentChannel(openChannels[0]);
      }
    });
  }, [sdk]);

  return (
    <div className="streaming-channel-list">
      <div className="streaming-channel-list__title">Live streaming</div>
      <div className="streaming-channel-list__list">
        {channels.length === 0 ? (
          "No Channels"
        ) : (
          <div className="streaming-channel-list__scroll-wrap">
            <div>
              {channels.map((c) => (
                <OpenChannelPreview
                  isStreaming
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
        <p className="streaming-channel-list__placeholder">
          Preset channels developed by UI Kit
        </p>
      </div>
      <div className="streaming-channel-list__footer">
        <Profile user={user} />
      </div>
    </div>
  );
}
