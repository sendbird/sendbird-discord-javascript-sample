import React from "react";
import "./voice-call.css";

export default function DirectCallForm(props) {
  const { setShowDirectCallForm } = props;

  const closeVoiceCallForm = () => {
    setShowDirectCallForm(false);
  };

  const videoCall = (e) => {
    e.preventDefault();
    console.log("vid");
  };

  const audioCall = (e) => {
    e.preventDefault();
    console.log("audio");
  };

  return (
    <div className="bg-modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="voice_call_form_close_btn" onClick={closeVoiceCallForm}>
          +
        </div>
        <h3 id="voice-call-form-title">Make a call</h3>
        <div className="direct_call_form_wrap">
          <form>
            <input type="text" placeholder="Enter user ID"></input>
            <button type="submit" onClick={(e) => videoCall(e)}>
              Video Call
            </button>
            <button type="submit" onClick={(e) => audioCall(e)}>
              Audio Call
            </button>
          </form>
        </div>
        {/* <div>
          <form>
            <h3>Enter with room ID</h3>
            <h4>Enter an existing room to participate in a group call</h4>
            <input type="text" placeholder="Room ID"></input>
            <button type="submit">Enter</button>
          </form>
        </div> */}
      </div>
    </div>
  );
}
