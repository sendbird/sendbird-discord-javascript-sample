import React, { useMemo } from "react";
import AdminMessage from "./AdminMessage";
import FileMessage from "./FileMessage";
import UserMessage from "./UserMessage";

export default function CustomizedMessageItem(props) {
  const { message, emojiContainer, onDeleteMessage, onUpdateMessage, userId } = props;

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
          emojiContainer={emojiContainer}
          onDeleteMessage={onDeleteMessage}
          onUpdateMessage={onUpdateMessage}
        />
      );
    }
    return () => <div />;
  }, [message, emojiContainer, userId, onDeleteMessage, onUpdateMessage]);

  return (
    
    <div id={message.messageId} className="customized-message-item">
      <MessageHOC />
      <br />
    </div>
  );
}
