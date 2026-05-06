import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const ChatBot = () => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to PrimeCore AI Assistant.",
    },
  ]);

  const [input, setInput] = useState("");

  const [faqData, setFaqData] = useState([]);

  // LOAD CSV
  useEffect(() => {
    Papa.parse("/data/primecore_chatbot_faq.csv", {
      download: true,
      header: true,

      complete: (results) => {
        setFaqData(results.data);
      },
    });
  }, []);

  // BOT RESPONSE SYSTEM
  const getBotReply = (message) => {
  const text = message.toLowerCase();

  let bestMatch = null;
  let highestScore = 0;

  faqData.forEach((item) => {
    const keywords = item.Keywords
      ?.toLowerCase()
      .split(",");

    let score = 0;

    keywords.forEach((keyword) => {
      const cleanKeyword = keyword.trim();

      // exact keyword match
      if (text.includes(cleanKeyword)) {
        score += 3;
      }

      // partial word similarity
      const words = text.split(" ");

      words.forEach((word) => {
        if (
          cleanKeyword.includes(word) ||
          word.includes(cleanKeyword)
        ) {
          score += 1;
        }
      });
    });

    // choose best response
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  });

  // confidence threshold
  if (bestMatch && highestScore > 0) {
    return bestMatch.Response;
  }

  return "🤖 I couldn't fully understand. Try asking about gaming PCs, RGB setups, repairs, accessories, payments, or upgrades.";
};
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const botMessage = {
      sender: "bot",
      text: getBotReply(input),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        style={styles.floatingBtn}
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <div>
              <h3 style={{ margin: 0 }}>
                PrimeCore AI
              </h3>

              <p style={styles.online}>
                ● Online
              </p>
            </div>

            <button
              style={styles.closeBtn}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* MESSAGES */}
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={styles.suggestions}>
            {[
                "Best gaming PC",
                "RGB setup",
                "Repair booking",
                "Custom PC",
            ].map((item) => (
                <button
                key={item}
                style={styles.suggestionBtn}
                onClick={() => setInput(item)}
                >
                {item}
                </button>
            ))}
          </div>

          {/* INPUT */}
          <div style={styles.inputArea}>
            <input
              type="text"
              placeholder="Ask PrimeCore AI..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              style={styles.input}
            />

            <button
              style={styles.sendBtn}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  floatingBtn: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    border: "none",
    background:
      "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    fontSize: "28px",
    cursor: "pointer",
    zIndex: 9999,
  },

  chatWindow: {
    position: "fixed",
    bottom: "90px",
    right: "25px",
    width: "340px",
    height: "430px",
    maxHeight: "70vh",
    background: "#0f172a",
    borderRadius: "24px",
    overflow: "hidden",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    padding: "18px",
    background:
      "linear-gradient(135deg,#2563eb,#0f172a)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  online: {
    margin: 0,
    color: "#4ade80",
    fontSize: "13px",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  messages: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#020617",
    paddingBottom: "20px",
  },

  userMessage: {
    alignSelf: "flex-end",
    background:
      "linear-gradient(135deg,#2563eb,#38bdf8)",
    padding: "12px",
    borderRadius: "16px 16px 0px 16px",
    maxWidth: "80%",
    color: "white",
  },

  botMessage: {
    alignSelf: "flex-start",
    background: "#111827",
    padding: "12px",
    borderRadius: "16px 16px 16px 0px",
    maxWidth: "80%",
    color: "#e2e8f0",
  },

  inputArea: {
    display: "flex",
    padding: "14px",
    gap: "10px",
    background: "#0f172a",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#111827",
    color: "white",
    outline: "none",
  },

  sendBtn: {
    border: "none",
    padding: "12px 16px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
  },

  suggestions: {
  display: "flex",
  gap: "8px",
  padding: "10px",
  flexWrap: "wrap",
  background: "#020617",
},

suggestionBtn: {
  border: "none",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(37,99,235,0.15)",
  color: "#93c5fd",
  cursor: "pointer",
  fontSize: "12px",
},
};

const suggestions = [
  "Best gaming PC",
  "Budget setup",
  "RGB builds",
  "Repair booking",
];

export default ChatBot;