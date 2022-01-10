import React, { useState } from "react";
import "./voice-call.css";

export default function VoiceCallForm( props ) {
  const { setShowVoiceCallForm, setShowGroupCallForm, setShowDirectCallForm } = props;

  const closeVoiceCallForm = () => {
    setShowVoiceCallForm(false)
  }

  //render next step for direct calls form
  const directCallOption = (e) => {
    e.preventDefault()
    console.log('click direct call')
    setShowVoiceCallForm(false);
    setShowDirectCallForm(true);

  };

  const groupCallOption = (e) => {
    e.preventDefault()
    console.log('click group call')
    setShowVoiceCallForm(false);
    setShowGroupCallForm(true);
  };

  return (
    <div className="bg-modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div
          className="voice_call_form_close_btn"
          onClick={closeVoiceCallForm}
        >
          +
        </div>
        <h3 id="voice-call-form-title">Open Channel Name:</h3>
          <button id="direct_call_form_button" onClick={(e) => directCallOption(e) }>Direct Call</button>
          <button id="group_call_form_button" onClick={(e) => groupCallOption(e) }>Group Call</button>
      </div>
    </div>
  );
}
