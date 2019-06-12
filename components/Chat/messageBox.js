import React from "react";
import MessageBubble from "./messageBubble";

//들어와야 하는 props목록
//1. 메시지내용(chatMessage)
//2. 보낸시간(time)
//3. 발신인인지 수신인인지 여부
//4. 발신인 팀이름
//5. 발신인 사진

const MessageBox = ({ text, teamId, teamName, createdAt, img }) => {
  return <MessageBubble teamId={teamId} text={text} />;
};
export default MessageBox;
