import React, { useState } from 'react'
import '../styles/chat.scss'

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello 👋", sender: "other" },
    { id: 2, text: "Hi, how are you?", sender: "me" },
    { id: 3, text: "I'm good, what about you?", sender: "other" }
  ])

  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: "me"
    }

    setMessages([...messages, newMsg])
    setInput("")
  }

  return (
    <div className="chat">

      {/* Messages */}
      <div className="chat__messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`chat__bubble ${msg.sender === "me" ? "me" : "other"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat__inputBox">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleSend}>Send</button>
      </div>

    </div>
  )
}

export default Chat