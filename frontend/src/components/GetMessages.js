import React, { useState, useEffect } from 'react';
import MessageCard from './MessageCard';
import Cookies from 'js-cookie'; // Import js-cookie library



const MessagePage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Get the authorization token from the cookie
        const token = Cookies.get('token'); // Retrieve token from cookie

        const response = await fetch('http://localhost:5000/api/lectures/get_message', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8">Messages to Admin</h1>
      <div className="grid grid-cols-3 gap-4">
        {messages.map((message, index) => (
          <MessageCard key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default MessagePage;
