import React, { useMemo } from "react";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context";
import { useSendbirdStateContext } from "@sendbird/uikit-react";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import AdminMessage from "./AdminMessage";
import FileMessage from "./FileMessage";
import UserMessage from "./UserMessage";

export default function CustomizedMessageItem(props) {
  const { message, userId } = props;
  const { currentGroupChannel } = useChannelContext();
  const globalStore = useSendbirdStateContext();

  const onDeleteMessage = (msg) => {
    const deleteMessage = sendbirdSelectors.getDeleteMessage(globalStore);
    deleteMessage(currentGroupChannel, msg);
  };

  const onUpdateMessage = (messageId, text) => {
    const updateMessage = sendbirdSelectors.getUpdateUserMessage(globalStore);
    updateMessage(currentGroupChannel, messageId, { message: text });
  };

  const MessageHOC = useMemo(() => {
    if (message.isAdminMessage && message.isAdminMessage()) {
      return () => <AdminMessage message={message} />;
    } else if (message.isFileMessage && message.isFileMessage()) {
      return () => (
        <FileMessage
          message={message}
          userId={userId}
          onDeleteMessage={onDeleteMessage}
        />
      );
    } else if (message.isUserMessage && message.isUserMessage()) {
      return () => (
        <UserMessage
          message={message}
          userId={userId}
          onDeleteMessage={onDeleteMessage}
          onUpdateMessage={onUpdateMessage}
        />
      );
    }
    return () => <div />;
  }, [message, userId]);

  return (
    <div id={message.messageId} className="customized-message-item">
      <MessageHOC />
      <br />
    </div>
  );
}
