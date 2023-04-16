import React from "react";

const Message = ({ mensaje }) => {
  return (
    <>
      <div className="chat">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={mensaje.imagen} />
          </div>
        </div>
        <div className="chat-header">
          {mensaje.usuario}
          <time className="text-xs opacity-50">{mensaje.hora}</time>
        </div>
        <div className="chat-bubble chat-bubble-primary">
          {mensaje.mensaje}
        </div>
      </div>
    </>
  );
};

export default Message;
