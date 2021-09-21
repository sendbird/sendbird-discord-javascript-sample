import { M as Modal } from 'sendbird-uikit/index-bd743b97';
import React from 'react';
import PropTypes from 'prop-types';
import './add-channel.scss';

export default function AddCommunityChannel({
  sdk,
  userId,
  setShowingForm
}) {
  var newChannelName = '';
  var imageUrl= 'https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png';
  var operatorUserIds=[`${userId}`];
  var customType = null;
  var data = null;

  const openChannelFormSubmit = (event) => {
    newChannelName = event.target.channelName.value;
    sdk.OpenChannel.createChannel(newChannelName, imageUrl, data, operatorUserIds, customType , function(openChannel, error) {
      if (error) {
        // Handle error.
      }
      const channelUrl = openChannel.channelUrl;
    }); 
  };

  return (
    <>
      <Modal
        titleText="New channel"
        hideFooter
        onCancel={() => { setShowingForm(false); }}
        onSubmit={()=>{}}
      >
        <div className="sendbird-add-channel__rectangle-wrap" >
          <div
            className="sendbird-add-channel__rectangle"
            role="button"
            tabIndex={0}
            style={{"height": "140px"}}
          >
            <form className="sendbird-add-channel__form" onSubmit={(e) => openChannelFormSubmit(e)} >
              <label htmlFor="channelName">Channel name:</label>
              <input type="text" id="channelName" name="channelName" style={{"width": "100%"}}/><br></br>
              <input type="submit" value="Save" id="sendbird-icon__form-submit"/>
            </form>   
          </div>
        </div>
      </Modal>
    </>
  );
}

AddCommunityChannel.propTypes = {
  sdk: PropTypes.shape({
    getErrorFirstCallback: PropTypes.func
  }).isRequired,
  disabled: PropTypes.bool,
  userId: PropTypes.string.isRequired
};

AddCommunityChannel.defaultProps = {
  disabled: false
};