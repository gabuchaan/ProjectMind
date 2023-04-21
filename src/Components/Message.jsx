import React from "react";

const Message = (props) => {
  console.log(props.message);
  const date = props.message.created_at.toDate().toLocaleTimeString();

  if (props.message.senderId == props.userId) {
    return (
      <>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={props.user.avatar} />
            </div>
          </div>
          <div className="chat-header">
            {props.user.name}
            <time className="text-xs opacity-50">{date}</time>
          </div>
          <div className="chat-bubble chat-bubble-primary">
            {props.message.message}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={props.user.avatar} />
          </div>
        </div>
        <div className="chat-header">
          {props.user.name}
          <time className="text-xs opacity-50">{date}</time>
        </div>
        <div className="chat-bubble chat-bubble-primary">
          {props.message.message}
        </div>
      </div>
    </>
  );

};

export default Message;
