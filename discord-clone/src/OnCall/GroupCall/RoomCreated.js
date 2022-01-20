import { InfoLabel, InputWithCopyButton, InputWithCopyIcon } from "./Info";
import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { normal } from "./fonts";

const Text = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: var(--navy-900);
  margin-bottom: 10px;
`;

const RoomCreated = (props) => {
  return (
    <Modal
      title="Room information"
      content={
        <React.Fragment>
          <InputWithCopyButton text={props.room.roomId} title="Room ID" />
          <div style={{ marginTop: 24 }}>
            <InfoLabel>Created by</InfoLabel>
            <CreatedByText>User ID : {props.room.createdBy}</CreatedByText>
          </div>
        </React.Fragment>
        
      }
      footer={{
        confirm: {
          label: "OK",
          onClick: () => {
            props.close();
          },
        },
      }}
      {...props}
    />
  );
};

const CreatedByText = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: var(--navy-900);
  margin-top: 10px;
`;

export const RoomInfo = (props) => {
  return (
    <Modal
      title="Room information"
      content={
        <React.Fragment>
          <InputWithCopyIcon title="Room ID" text={props.room.roomId} />
          <div style={{ marginTop: 24 }}>
            <InfoLabel>Created by</InfoLabel>
            <CreatedByText>User ID : {props.room.createdBy}</CreatedByText>
          </div>
        </React.Fragment>
      }
      footer={{
        confirm: {
          label: "OK",
          onClick: () => {
            props.close();
          },
        },
      }}
      {...props}
    />
  );
};

export default RoomCreated;
