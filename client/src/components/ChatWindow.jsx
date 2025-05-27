import React, { useState, useEffect } from 'react';
import { Launcher } from 'react-chat-window';
import axios from 'axios';

const ChatWindow = () => {
  const [messageList, setMessageList] = useState([]);

  const handleSendMessage = async (message) => {
    const userMessage = {
      author: 'them',
      type: 'text',
      data: { text: message }
    };
    
    setMessageList([...messageList, userMessage]);
    
    try {
      const response = await axios.post('http://localhost:5000/api/chatbot/message', {
        text: message
      });
      
      const botMessage = {
        author: 'me',
        type: 'text',
        data: { text: response.data.text }
      };
      
      setMessageList(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: 'My Chatbot',
          imageUrl: 'https://example.com/chatbot-icon.png'
        }}
        onMessageWasSent={handleSendMessage}
        messageList={messageList}
        showEmoji
      />
    </div>
  );
};

export default ChatWindow;