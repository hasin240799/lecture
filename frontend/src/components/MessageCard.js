import React from 'react';

const MessageCard = ({ message }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Message from: {message.sender}</div>
        <p className="text-gray-700 text-base">
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
