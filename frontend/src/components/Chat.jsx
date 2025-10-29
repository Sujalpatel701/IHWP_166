import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply(""); // Clear previous reply
    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      console.error("Error:", error);
      setReply("⚠️ Something went wrong while connecting to VedaBalance AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simple-chat">
      <h2>💬 Ask VedaBalance AI</h2>

      {loading ? (
        <div className="ai-loading">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <p>VedaBalance is thinking...</p>
        </div>
      ) : reply ? (
        <div className="ai-reply">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{reply}</ReactMarkdown>
        </div>
      ) : (
        <p className="ai-placeholder">
          🌿 Namaste! I’m your Ayurvedic guide. Ask me anything about Prakriti,
          diet, or wellness balance.
        </p>
      )}

      <div className="chat-input-row">
        <input
          type="text"
          placeholder="Ask about Ayurveda or your Prakriti..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
