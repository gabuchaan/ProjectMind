import React, { useState, useEffect } from 'react'

const Message = (props) => {

  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    if (props.message.created_at) {
      setDateTime(props.message.created_at.toDate().toLocaleTimeString());
    }
  }, [])

  // const date = props.message.created_at.toDate().toLocaleTimeString();

  if (props.message.senderId == props.userId) {
    return (
      <>
        <div className="chat chat-end mr-2">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full ring-2 ring-blue-600 dark:ring-blue-400">
              <img src={props.user.avatar} />
            </div>
          </div>
          <div className="chat-header">
            <div className='dark:text-white text-black'>
              {props.user.name}
            </div>
          </div>
          <div className="chat-bubble chat-bubble-primary">
            {props.message.message}
          </div>
          <time className="text-gray-700 dark:text-gray-400 text-xs opacity-50 mt-1">{dateTime}</time>

        </div>
      </>
    );
  }

  return (
    <>
      <div className="chat chat-start ml-2">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full ring-2 ring-gray-500 dark:ring-gray-200">
            <img src={props.user.avatar} />
          </div>
        </div>
        <div className="chat-header">
          <div className='dark:text-white text-black'>
            {props.user.name}
          </div>

        </div>
        <div className="chat-bubble chat-bubble-accent">
          {props.message.message}
        </div>
      </div>
      <time className="dark:text-gray-400 text-gray-700 text-xs opacity-50 ml-14">{dateTime}</time>

    </>
  );

};

export default Message;
