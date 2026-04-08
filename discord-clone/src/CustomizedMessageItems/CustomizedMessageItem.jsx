import React, { useMemo } from "react";
import AdminMessage from "./AdminMessage";
import FileMessage from "./FileMessage";
import UserMessage from "./UserMessage";

export default function CustomizedMessageItem(props) {
  const { message, userId } = props;

  const MessageHOC = useMemo(() => {
    if (message.isAdminMessage && message.isAdminMessage()) {
      return () => <AdminMessage message={message} />;
    } else if (message.isFileMessage && message.isFileMessage()) {
      return () => (
        <FileMessage
          message={message}
          userId={userId}
        />
      );
    } else if (message.isUserMessage && message.isUserMessage()) {
      return () => (
        <UserMessage
          message={message}
          userId={userId}
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
