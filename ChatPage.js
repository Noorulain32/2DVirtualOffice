import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./ChatPage.css";

const socket = io("http://127.0.0.1:5000", {
  transports: ["websocket", "polling"],
  reconnection: true,
});

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("Noor ul ain");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = { username, text: inputMessage };
      socket.emit("message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    }
  };

  const handleLogout = () => {
    socket.disconnect();
    navigate("/login"); // Ensure this route exists in your app
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h3>{username}</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="chat-section">
        <div className="sidebar">
          <input
            type="text"
            placeholder="Search Chats"
            className="search-bar"
          />
          <div className="chat-list">
            <p>{username}</p>
          </div>
        </div>

        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.username === username ? "sent" : "received"
                }`}
              >
                <strong>{msg.username}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
