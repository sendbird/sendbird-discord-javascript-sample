import React , { useState } from "react";
import PropTypes from "prop-types";
import "./add-channel.scss";

export default function AddCommunityChannel({ sdk, userId, setShowingForm }) {
  const [newChannelName, changeNewChannelName] = useState("");
  // var newChannelName = "";
  var imageUrl =
    "https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png";
  var operatorUserIds = [`${userId}`];
  var customType = null;
  var data = null;

  const openChannelFormSubmit = () => {
    sdk.OpenChannel.createChannel(
      newChannelName,
      imageUrl,
      data,
      operatorUserIds,
      customType,
      function (openChannel, error) {
        if (error) {
          // Handle error.
        }
        const channel = openChannel.channelUrl;
      }
    );
    changeNewChannelName("");
  };

  return (
    <div className="bg-modal" style={{'display': 'flex'}}>
      <div className="modal-content">
        <div className="add_suggested_task_close_btn" onClick={() => setShowingForm(false)} >+</div>
        <h3 id="suggestion-task-form-title">Open Channel Name:</h3>
        <form onSubmit={() => openChannelFormSubmit()} >
          <input
            type="text"
            id="channelName"
            name="channelName"
            onChange={(event) => {
              changeNewChannelName(event.target.value);
            }}
          ></input>
          <br></br>
          <button id="add_suggested_task_save_btn">Save</button>
        </form>
      </div>
    </div>
  );
}

AddCommunityChannel.propTypes = {
  sdk: PropTypes.shape({
    getErrorFirstCallback: PropTypes.func,
  }).isRequired,
  disabled: PropTypes.bool,
  userId: PropTypes.string.isRequired,
};

AddCommunityChannel.defaultProps = {
  disabled: false
};
