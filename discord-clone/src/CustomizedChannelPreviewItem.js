import React, { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Fade,
  Paper,
  Popper,
  Typography,
  IconButton as MIconButton
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/styles";

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid white`
  }
}))(Avatar);
const useStyles = makeStyles(theme => ({
  selected: {
    backgroundColor: "rgba(25, 118, 210, 0.2)"
  }
}));

export default function CustomizedChannelPreviewItem(props) {
  const classes = useStyles();
  const popperId = "popper-id";

  // props
  const { userId, channel, onLeaveChannel, currentChannelUrl } = props;
  const { name } = channel;
  const channelName = name;
  const { lastMessage } = channel;

  //useState
  const [openLeaveChannel, setOpenLeaveChannel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // useMemo
  const isCurrentChannel = useMemo(() => {
    return channel.url === currentChannelUrl;
  }, [currentChannelUrl, channel.url]);

  const channelAvatar = useMemo(() => {
    if (channel.coverUrl) {
      return <Avatar src={channel.coverUrl} />;
    }
    const { members } = channel;
    const membersExcludingMe = members.filter(
      member => member.userId !== userId
    );
    const [firstMember, secondMember] = membersExcludingMe;
    return (
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        badgeContent={
          membersExcludingMe.length > 1 && (
            <SmallAvatar
              alt="second member"
              src={secondMember && secondMember.profileUrl}
            />
          )
        }
      >
        <Avatar src={firstMember && firstMember.profileUrl} />
      </Badge>
    );
  }, [userId, channel]);

  const channelTitle = useMemo(() => {
    if (channelName) {
      return channelName;
    }
    const membersNamesExcludingMe = channel.members
      .filter(member => member.userId !== userId)
      .map(member => member.nickname || member.userId)
      .join(", ");
    return membersNamesExcludingMe.length < 30
      ? membersNamesExcludingMe.length === 0
        ? "(No members)"
        : membersNamesExcludingMe
      : `${membersNamesExcludingMe.slice(0, 30)}...`;
  }, [userId, channel, channelName]);

  // channel type filter    
  if (
    channel.isOpenChannel() ||
    channel.isFrozen ||
    channel.isEphemeral ||
    channel.isSuper ||
    channel.isBroadcast
  ) {
    return null;
  }

  // event handlers
  const handleClickChannelPreviewMenu = event => {
    setAnchorEl(event.currentTarget);
    setOpenLeaveChannel(!openLeaveChannel);
    event.stopPropagation();
  };

  const handleBlurChannelPreviewItem = event => {
    setOpenLeaveChannel(false);
  };

  const handleClickLeaveChannel = event => {
    onLeaveChannel(channel);
  };

  return (
    <div className="customized-channelpreview-item" >
      <Popper
        transition
        id={popperId}
        open={openLeaveChannel}
        anchorEl={anchorEl}
        placement="right-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Button onClick={handleClickLeaveChannel}>Leave Channel</Button>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Card className={isCurrentChannel ? classes.selected : ""} square>
        <CardHeader
          avatar={channelAvatar}
          action={
            <MIconButton
              aria-describedby={popperId}
              aria-label="settings"
              size="small"
              onClick={handleClickChannelPreviewMenu}
              onBlur={handleBlurChannelPreviewItem}
            >
              <MoreVertIcon />
            </MIconButton>
          }
          title={channelTitle}
          subheader={
            lastMessage && (
              <Typography variant="caption" color="textSecondary">
                {(lastMessage.messageType === "admin" ||
                  lastMessage.messageType === "user") &&
                  (lastMessage.message.length < 60
                    ? lastMessage.message
                    : `${lastMessage.message.slice(0, 60)}...`)}
                {lastMessage.messageType === "file" &&
                  (lastMessage.url.length < 30
                    ? lastMessage.url
                    : `${lastMessage.url.slice(0, 30)}...`)}
              </Typography>
            )
          }
        />
      </Card>
    </div>
  );
}