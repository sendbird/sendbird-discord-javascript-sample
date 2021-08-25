import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  Button,
  Link,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
}));

export default function FileMessage(props) {
  const classes = useStyles();
  // props
  const { message, userId, onDeleteMessage } = props;

  return (
    <div className="file-message">
      <Card>
        <CardHeader
          avatar={
            message.sender ? (
              <Avatar alt="Fi" src={message.sender.profileUrl} />
            ) : (
              <Avatar className="file-message__avatar">Fi</Avatar>
            )
          }
          title={
            message.sender
              ? message.sender.nickname || message.sender.userId
              : "(No name)"
          }
          subheader="File Message"
        />
        <CardContent>
          <CardMedia
            className={classes.media}
            title="File thumbnail"
            image={message.thumbnails[0] || message.url}
          />
          <Link href={message.url}>
            <Typography>Download</Typography>
          </Link>
        </CardContent>
        {message.sender && message.sender.userId === userId && (
          <CardActions>
            <Button
              variant="contained"
              size="small"
              onClick={() => onDeleteMessage(message)}
            >
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
}
