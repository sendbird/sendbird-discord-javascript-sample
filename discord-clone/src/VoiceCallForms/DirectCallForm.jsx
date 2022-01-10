import React, { useState } from "react";
import "./voice-call.css";

export default function DirectCallForm(props) {
  const { setShowDirectCallForm } = props;

  const closeVoiceCallForm = () => {
    setShowDirectCallForm(false);
  };

  //render next step for direct calls form
  //   const directCallOption = (e) => {
  //     e.preventDefault();

  //     console.log('click direct call')
  //   };

  //   const groupCallOption = (e) => {
  //     e.preventDefault();

  //     console.log('click group call')
  //   };

  return (
    <div className="bg-modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="voice_call_form_close_btn" onClick={closeVoiceCallForm}>
          +
        </div>
        <h3 id="voice-call-form-title">Make a group call</h3>
        <div className="direct_call_form_wrap">
          <form>
            <h3>Create a room</h3>
            <h4>
              Start a group call in a room and share the room ID with others
            </h4>
            <button type="submit">Create</button>
          </form>
        </div>
        <div>
          <form>
            <h3>Enter with room ID</h3>
            <h4>Enter an existing room to participate in a group call</h4>
            <input type="text" placeholder="Room ID"></input>
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}
