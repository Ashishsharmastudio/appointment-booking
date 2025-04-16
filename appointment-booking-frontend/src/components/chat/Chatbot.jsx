import { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log("Sending request with data:", { question: inputMessage });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/chat/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: inputMessage,
          }),
        }
      );

      console.log("Raw response:", response);
      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries([...response.headers])
      );

      const responseText = await response.text();
      console.log("Response text:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed response data:", data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        throw new Error("Invalid JSON response");
      }

      if (data.success) {
        console.log("Bot answer:", data.data.answer);
        const botMessage = {
          type: "bot",
          content: data.data.answer,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error("API returned error:", data);
        throw new Error(data.error || "API returned an error");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const botMessage = {
        type: "bot",
        content:
          "I'm having trouble connecting to the service. Please try again later.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
      setInputMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              isOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            }
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg">
            <h3 className="font-semibold">Chat Assistant</h3>
          </div>

          <div className="h-96 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 my-4">
                Ask me about our smart home solutions!
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
