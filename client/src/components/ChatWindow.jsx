import { useState, useRef, useEffect } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputValue, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate API call to your backend
    try {
      const botResponse = await simulateBotResponse(inputValue);
      const botMessage = { id: Date.now() + 1, text: botResponse, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble responding.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Replace this with your actual API call
  const simulateBotResponse = async (userInput) => {
    const response = await fetch("http://localhost:5000/api/chatbot/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userInput }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.text;
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>My Chatbot</h2>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.isBot ? "bot-message" : "user-message"
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" />
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
