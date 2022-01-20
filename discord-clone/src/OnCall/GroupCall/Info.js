import { toast } from "react-toastify";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import { demi, normal, small, heavy } from "./fonts";
import { flexCenter } from "./mixins.js";
import { SuccessMessage } from "./Toast";

const RoomIdWrapper = styled.div`
  & > div {
    margin-top: 6px;
    display: flex;
    width: 100%;
  }
`;

export const InfoLabel = styled.label`
  ${small};
  ${heavy};
  color: black;
`;

export const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: var(--navy-80);
  border-radius: 4px;
  margin-top: 6px;
  background-color: rgba(158, 158, 167, 0.767);
  color: black;
  padding: 0;
  padding-left: 10px;
  height: 40px;
  bottom: 0;
  align-items: center;
  margin-top: 0;
`;

export const InfoInputText = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: black;
`;

export const InfoInputIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(/icons/ic-copy.svg);
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

export const CopyButton = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  background-color: rgba(158, 158, 167, 0.767);
  ${flexCenter};
  ${normal};
  cursor: pointer;
  ${demi};
  margin-left: 8px;
  margin-top: 6px;
  color: black;
  padding: 0;
  bottom: 0;
  align-items: center;
  margin-top: 0;
`;

export const InputWithCopyButton = ({ text, title }) => {
  return (
    <RoomIdWrapper>
      <InfoLabel>{title}</InfoLabel>
      <div>
        <InfoInput>
          <InfoInputText>{text}</InfoInputText>
        </InfoInput>
        <CopyButton
          onClick={() => {
            copy(text);
            toast.success(<SuccessMessage message={"Room ID copied."} />, {
              autoClose: 2000,
            });
          }}
        >
          Copy
        </CopyButton>
      </div>
    </RoomIdWrapper>
  );
};

export const InputWithCopyIcon = ({ title, text, icon = true }) => {
  return (
    <RoomIdWrapper>
      <InfoLabel>{title}</InfoLabel>
      <InfoInput>
        <InfoInputText>{text}</InfoInputText>
        {icon && (
          <InfoInputIcon
            onClick={() => {
              copy(text);
              toast.success(<SuccessMessage message={"Room ID copied."} />, {
                autoClose: 2000,
              });
            }}
          />
        )}
      </InfoInput>
    </RoomIdWrapper>
  );
};

const RoomCreatorWrapper = styled.div``;
export const RoomCreatorInfo = ({ room }) => {
  return (
    <RoomCreatorWrapper>
      <label>Created by</label>
      <div>
        <img src={room.createdBy} alt="" />
      </div>
    </RoomCreatorWrapper>
  );
};
