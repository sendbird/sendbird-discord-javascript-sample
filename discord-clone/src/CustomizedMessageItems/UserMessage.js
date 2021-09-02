import React, { useState } from "react";

import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField
} from "@material-ui/core";

export default function UserMessage(props) {
  // props
  const { message, userId, onDeleteMessage, onUpdateMessage } = props;

  // useState
  const [pressedUpdate, setPressedUpdate] = useState(false);
  const [messageText, changeMessageText] = useState(message.message);
  const [messageOptions,setMessageOptions] = useState(false);

  return (
    <div className="user-message">
      <Card>
        <CardHeader
          avatar={
            message.sender ? (
              <Avatar alt="Us" src={message.sender.plainProfileUrl} />
            ) : (
              <Avatar className="user-message__avatar">Us</Avatar>
            )
          }
          title={
            message.sender
              ? message.sender.nickname || message.sender.userId
              : "(No name)"
          }
        />
        <CardContent>
          {!pressedUpdate && (
            <Typography variant="body2" component="p">
              {message.message}
            </Typography>
          )}
          {pressedUpdate && (
            <div className="user-message__text-area">
              <TextField
                label="Edited text"
                multiline
                variant="filled"
                rowsMax={4}
                value={messageText}
                onChange={event => {
                  changeMessageText(event.target.value);
                }}
              />
            </div>
          )}
        </CardContent>
        <button className="user-message__options-btn" onClick={() => setMessageOptions(!messageOptions)}>...</button>    
      {
        messageOptions && (
          <div className="message-options-wrap" >
            <ul className="sendbird_dropdown_menu"> 
                {message.sender && message.sender.userId === userId && (
                  <CardActions>
                      {pressedUpdate && (

                        <li onClick={() => setPressedUpdate(false)}>
                          Cancel
                        {/* <Button
                          size="small"
                          variant="contained"
                          onClick={() => setPressedUpdate(false)}
                        >
                          Cancel
                        </Button> */}

                        </li>

                      )}

                      {!pressedUpdate && (
                        <li onClick={() => {
                          setPressedUpdate(true);
                        }}>Edit
                          
                        {/* <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setPressedUpdate(true);
                          }}
                        >
                          Edit
                        </Button> */}

                        </li>
                      )}

                      {pressedUpdate && (
                        <li onClick={() => onUpdateMessage(message.messageId, messageText)}>
                          Save
                      
                        {/* <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => onUpdateMessage(message.messageId, messageText)}
                        >
                          Save
                        </Button> */}
                        </li>
                      )}

                      {!pressedUpdate && (
                        <li onClick={() => onDeleteMessage(message)}>
                            Delete
                        {/* <Button
                          size="small"
                          variant="contained"
                          onClick={() => onDeleteMessage(message)}
                        >
                          Delete
                        </Button> */}

                        </li>
                      )}

                  </CardActions>
                )}
              </ul>
          </div>
        ) 
        
      }           
      </Card>
    </div>
  );
}
