import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

function App() {
  const qaData = {
    "What types of motorcycles does Yamaha offer?":
      "Yamaha offers a wide range of motorcycles, including sportbikes (YZF-R series), cruisers (Star Venture, V Star), adventure touring bikes (Ténéré), dual-sport bikes (WR series), scooters (Vino, Zuma), and more.",
    "Where can I find a Yamaha dealer near me?":
      "You can use the Yamaha dealer locator on our official website (yamahamotorsports.com) to find a dealer in your area. Just enter your zip code or city.",
    "How can I contact Yamaha customer service?":
      "You can contact Yamaha customer service by phone at [Phone Number], or through the contact form on our website.",
    "Where can I find owner's manuals for my Yamaha motorcycle?":
      "Owner's manuals are available for download on the Yamaha Motorsports website in the support section.",
    "What is the warranty on Yamaha motorcycles?":
      "Yamaha motorcycles typically come with a [Duration] limited factory warranty. Specific warranty details can be found in your owner's manual or on our website.",
    "Does Yamaha offer financing options?":
      "Yes, Yamaha offers financing options through Yamaha Motor Finance Corporation (YMFC). You can learn more on our website or at your local dealer.",
    "Where can I find information about Yamaha events and promotions?":
      "Check the news and events section on the Yamaha Motorsports website for the latest updates on events, promotions, and special offers.",

    // Specific Models (Examples - Expand as needed)
    "What is the engine size of the Yamaha R1?":
      "The Yamaha R1 has a 998cc, liquid-cooled, inline 4-cylinder engine.",
    "What are the key features of the Yamaha Ténéré 700?":
      "The Ténéré 700 is known for its lightweight chassis, torquey CP2 engine, long-travel suspension, and rally-inspired design, making it ideal for adventure touring.",
    "What is the price of the Yamaha MT-07?":
      "Pricing varies by location and options. Please check with your local Yamaha dealer or visit our website for the most up-to-date pricing information.",
    "What is the difference between the R3 and the R7?":
      "The R3 is a lightweight entry-level sportbike with a 321cc twin-cylinder engine, while the R7 is a middleweight sportbike with a 689cc twin-cylinder engine offering more performance and advanced features.",
    "What are the color options for the Yamaha Zuma 125?":
      "The Yamaha Zuma 125 comes in a variety of colors that change by model year. Check the Yamaha website for current color options.",

    // Parts and Service
    "Where can I buy Yamaha genuine parts?":
      "Yamaha genuine parts can be purchased through authorized Yamaha dealers or online at [Yamaha Parts Website].",
    "How do I find a Yamaha certified service center?":
      "Use the dealer locator on the Yamaha Motorsports website to find certified service centers in your area.",
    "What is the recommended maintenance schedule for my Yamaha motorcycle?":
      "The recommended maintenance schedule is outlined in your owner's manual. Following this schedule will ensure the longevity and performance of your motorcycle.",
    "How can I find the part number for a specific Yamaha part?":
      "You can find part numbers using the online parts catalog on the Yamaha Motorsports website or by consulting with your local Yamaha dealer.",

    // Accessories and Apparel
    "Does Yamaha sell motorcycle accessories?":
      "Yes, Yamaha offers a wide range of accessories for its motorcycles, including luggage, windscreens, performance parts, and more.",
    "Where can I buy Yamaha riding gear and apparel?":
      "Yamaha riding gear and apparel are available at authorized Yamaha dealers and on the Yamaha website.",

    //Off-Road Vehicles
    "Does Yamaha make ATVs?":
      "Yes, Yamaha manufactures a line of ATVs, including sport, utility, and youth models.",
    "Does Yamaha make side-by-sides?":
      "Yes, Yamaha produces side-by-side vehicles, also known as UTVs, for recreational and utility use.",
    "Where can I find information about Yamaha off-road events?":
      "Information about Yamaha off-road events can usually be found on the Yamaha Motorsports website or through local Yamaha dealers.",

    // Electric Vehicles
    "Does Yamaha make electric motorcycles or scooters?":
      "Yamaha is developing and releasing electric models. Please check our website for the latest information on electric vehicles.",

    // Company Information
    "Where is Yamaha Motor Corporation located?":
      "Yamaha Motor Corporation is headquartered in Iwata, Shizuoka, Japan.",

    // Safety
    "Where can I find motorcycle safety tips?":
      "Yamaha encourages safe riding practices. You can find safety tips and resources on the Motorcycle Safety Foundation (MSF) website or through Yamaha's own safety programs.",

    // Common Misspellings/Alternative Phrasing
    "Where to buy Yamaha parts?":
      "Yamaha genuine parts can be purchased through authorized Yamaha dealers or online at [Yamaha Parts Website].",
    "How much does a Yamaha R1 cost?":
      "Pricing varies by location and options. Please check with your local Yamaha dealer or visit our website for the most up-to-date pricing information.",
    "Yamaha contact number":
      "You can contact Yamaha customer service by phone at [Phone Number], or through the contact form on our website.",
    "Where is the Yamaha shop?":
      "You can use the Yamaha dealer locator on our official website (yamahamotorsports.com) to find a dealer in your area. Just enter your zip code or city.",
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const findMatchingQuestion = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    for (const question in qaData) {
      if (
        question.toLowerCase().includes(lowerInput) ||
        lowerInput.includes(question.toLowerCase())
      ) {
        return question;
      }
    }
    return null; // No match found
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, user: true }]);

    const matchedQuestion = findMatchingQuestion(input);

    setTimeout(() => {
      if (matchedQuestion) {
        setMessages([
          ...messages,
          { text: "👤 :- " + input, user: true },
          { text: "🤖 :-" + qaData[matchedQuestion], user: false },
        ]);
      } else if (
        input.toLowerCase() === "hi" ||
        input.toLowerCase() === "hello"
      ) {
        // Corrected condition
        setMessages([
          ...messages,
          { text: "👤 :- " + input, user: true },
          {
            text:
              "🤖 :- " +
              "Hello Sir! Welcome in Yamaha Moters. How can I help you today?",
            user: false,
          },
        ]);
      } else {
        setMessages([
          ...messages,
          { text: "👤 :-" + input, user: true },
          {
            text:
              "🤖 :-" +
              "I'm sorry, I don't have an answer for that question. Please try again or contact us directly.",
            user: false,
          },
        ]);
      }
    }, 500);

    setInput("");
  };

  return (
    <div className="body1">
      <div className="chatbot-container">
        <div className="chat-header">
          <h2>Yamaha moters Chatbot</h2>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.user ? "user-message" : "bot-message"
              }`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* For scrolling to bottom */}
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="chatbot-container">
        <div className="chat-header">
          <h2>Asked Questions</h2>
        </div>
        <div className="scrollable-cont">
          {Object.keys(qaData).map((question, index) => (
            <li key={index}>
              <a onClick={() => setInput(question)}>{question}</a>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
