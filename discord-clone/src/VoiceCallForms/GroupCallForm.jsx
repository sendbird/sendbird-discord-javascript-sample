import React, { useState } from "react";
import "./group-call.css";
import SendBirdCall from "sendbird-calls";

export default function GroupCallForm(props) {
  const { setShowGroupCallForm, setShowRoomCreated, setPassedRoom, setOnCall } =
    props;
  const [inputtedRoomId, setInputtedRoomId] = useState("");

  const closeVoiceCallForm = () => {
    setShowGroupCallForm(false);
  };

  const createGroupCallRoom = (e) => {
    e.preventDefault();
    const roomParams = {
      roomType: SendBirdCall.RoomType.SMALL_ROOM_FOR_VIDEO,
    };
    var newRoom;
    SendBirdCall.createRoom(roomParams)
      .then((room) => {
        newRoom = room;
        return SendBirdCall.fetchRoomById(room.roomId);
      })
      .then((room) => {
        const enterParams = {
          videoEnabled: true,
          audioEnabled: true,
        };

        return room.enter(enterParams);
      })
      .then(() => {
        const customizedAppDiv =
          document.getElementsByClassName("sendbird-app__wrap")[0];
        customizedAppDiv.style.display = "none";
        const localMediaView = document.getElementById(
          "local_video_element_id"
        );
        newRoom.localParticipant.setMediaView(localMediaView);
        setPassedRoom(newRoom);
        newRoom.on("remoteParticipantStreamStarted", (remoteParticipant) => {
          const remoteMediaview = document.createElement("video");
          remoteMediaview.autoplay = true;
          remoteParticipant.setMediaView(remoteMediaview);
        });
        setShowGroupCallForm(false);
        setOnCall(true);
        setShowRoomCreated(true);
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };

  const enterGroupCallRoom = (e) => {
    e.preventDefault();
    var newRoom;
    SendBirdCall.fetchRoomById(inputtedRoomId)
      .then((room) => {
        const enterParams = {
          videoEnabled: true,
          audioEnabled: true,
        };
        newRoom = room;
        return room.enter(enterParams);
      })
      .then(() => {
        const customizedAppDiv =
          document.getElementsByClassName("sendbird-app__wrap")[0];
        customizedAppDiv.style.display = "none";
        const localMediaView = document.getElementById(
          "local_video_element_id"
        );
        newRoom.localParticipant.setMediaView(localMediaView);
        setPassedRoom(newRoom);
        newRoom.on("remoteParticipantStreamStarted", (remoteParticipant) => {
          const remoteMediaview = document.createElement("video");
          remoteMediaview.autoplay = true;
          remoteParticipant.setMediaView(remoteMediaview);
        });
        setShowGroupCallForm(false);
        setOnCall(true);
        setShowRoomCreated(true);
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };

  return (
    <div className="bg-modal" style={{ display: "flex" }}>
      <div className="modal-content-group-call">
        <div className="group_call_form_close_btn" onClick={closeVoiceCallForm}>
          +
        </div>
        <h3 id="group-call-form-title">Make a group call</h3>
        <div className="group_call_create_room_wrap">
          <form onSubmit={(e) => createGroupCallRoom(e)}>
            <h3>Create a room</h3>
            <h4>
              Start a group call in a room and share the room ID with others
            </h4>
            <button type="submit">Create</button>
          </form>
        </div>
        <div className="group_call_enter_room_wrap">
          <form onSubmit={(e) => enterGroupCallRoom(e)}>
            <h3>Enter with room ID</h3>
            <h4>Enter an existing room to participate in a group call</h4>
            <input
              type="text"
              placeholder="Room ID"
              name="roomId"
              onChange={(event) => {
                setInputtedRoomId(event.target.value);
              }}
            ></input>
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}
