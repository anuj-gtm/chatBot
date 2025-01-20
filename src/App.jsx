import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

function App() {
  const qaData = {
    // General Information:
    "What is the hospital's full address?":
      "Full Address: All India Institute of Medical Sciences (AIIMS), Ansari Nagar, New Delhi, India. AIIMS.",
    "What are the hospital's operating hours?":
      "Operating Hours: The hospital operates 24/7, providing round-the-clock emergency and inpatient services. Outpatient Department (OPD) services are available Monday to Saturday, 8:30 AM to 11:00 AM for registration, with clinics running from 9:00 AM to 1:00 PM and 2:00 PM to 5:00 PM.",
    "Is this hospital open on weekends and holidays?":
      "Weekend and Holiday Operations: AIIMS operates continuously, including weekends and holidays, ensuring uninterrupted emergency and inpatient care.",
    "How do I contact the hospital?":
      "Contact Information: For OPD appointment bookings, call 011-26589142 between 8:00 AM and 8:00 PM on all working days.",
    "What is the hospital's phone number for emergencies?":
      "Emergency Services: For emergency information, contact the Control Room at 011-26596428.",
    "Is there a map or directions to the hospital?":
      "Map and Directions: AIIMS is located at Ansari Nagar, New Delhi, near the intersection of Ring Road and Aurobindo Marg. The main entrance is on Aurobindo Marg.",

    // Appointments:
    "How can I book an appointment?":
      "Booking an Appointment: Appointments can be booked online through the Online Registration System (ORS). New patients can register and schedule appointments via this portal.",
    "Can I schedule an appointment with a specific doctor?":
      "Scheduling with a Specific Doctor: While booking an appointment, you can select the desired department. Specific doctor availability may vary, and it's advisable to check the department's schedule.",
    "How do I cancel or reschedule an appointment?":
      "Cancelling or Rescheduling: Appointments can be managed through the ORS portal, where you can cancel or reschedule as needed.",
    "Can I book an appointment online or through a mobile app?":
      "Online or Mobile App Booking: Appointments can be booked online via the ORS portal. AIIMS also offers a mobile app for appointment management.",
    "How far in advance can I book an appointment?":
      "Advance Booking: Appointments for new cases are available for one month, depending on the availability of OPD slots. Follow-up appointments are available for three months.",

    // Medical Services:
    "What specialties are available at the hospital?":
      "Specialties Available: AIIMS offers a wide range of specialties, including cardiology, neurology, oncology, ophthalmology, and dental services.",
    "Does the hospital provide diagnostic services?":
      "Diagnostic Services: Comprehensive diagnostic services are available, including imaging, laboratory tests, and specialized diagnostic procedures.",
    "Is there a maternity ward?":
      "Maternity Ward: AIIMS provides maternity services, including prenatal and postnatal care, as well as delivery services.",
    "Does the hospital have pediatric services?":
      "Pediatric Services: Dedicated pediatric services are available, catering to the healthcare needs of children.",
    "Can I get a second opinion from a specialist?":
      "Second Opinion: Patients can seek second opinions from specialists within AIIMS by scheduling an appointment with the relevant department.",
    "Are there rehabilitation or physiotherapy services?":
      "Rehabilitation and Physiotherapy: Rehabilitation and physiotherapy services are available to support recovery and rehabilitation.",

    // Emergency and Urgent Care:
    "Does the hospital have an emergency room?":
      "Emergency Room: AIIMS has a dedicated emergency department providing 24/7 emergency services.",
    "What should I do in case of a medical emergency?":
      "Medical Emergency Procedures: In case of a medical emergency, visit the emergency department or call the emergency services number.",
    "Can I call an ambulance through the hospital?":
      "Ambulance Services: AIIMS provides ambulance services for patient transport. Contact the hospital for more information.",
    "How long is the typical waiting time in the emergency room?":
      "Emergency Room Waiting Time: Waiting times in the emergency room can vary based on the severity of cases. Critical cases are prioritized.",
    "Are there specific procedures for trauma cases?":
      "Trauma Cases Procedures: AIIMS has specialized trauma care services, including the JPNA Trauma Center, equipped to handle severe trauma cases.",

    // Billing and Insurance:
    "What are the payment options available at the hospital?":
      "Payment Options: AIIMS accepts various payment methods, including cash, credit/debit cards, and online payments.",
    "Does the hospital accept my insurance?":
      "Insurance Acceptance: AIIMS accepts various insurance providers. It's advisable to check with the hospital's billing department for specific details.",
    "How can I request an itemized bill?":
      "Itemized Bill Request: Patients can request an itemized bill through the hospital's billing department.",
    "Are there payment plans for large medical bills?":
      "Payment Plans: Information regarding payment plans can be obtained from the billing department.",
    "Can I pay online or via a mobile app?":
      "Online or Mobile App Payments: Online payment options are available through the hospital's official website and mobile app.",

    // Facilities:
    "Is there a pharmacy in the hospital?":
      "Pharmacy: AIIMS has an in-house pharmacy providing medications to patients.",
    "Does the hospital have parking facilities?":
      "Parking Facilities: Parking is available for visitors and patients. Details regarding parking fees and availability can be obtained from the hospital.",
    "Are there cafeteria services available?":
      "Cafeteria Services: Cafeteria services are available for visitors and patients.",
    "Does the hospital provide Wi-Fi for visitors?":
      "Wi-Fi for Visitors: Wi-Fi services are available in certain areas of the hospital.",
    "Are there private rooms available for patients?":
      "Private Rooms: Private rooms are available for patients, subject to availability and additional charges.",
    "Can I arrange for an interpreter or translation services?":
      "Interpreter Services: Interpreter services can be arranged for patients requiring assistance in communication.",

    // Visiting Policies:
    "What are the visiting hours?":
      "Visiting Hours: Visiting hours are typically from 4:00 PM to 7:00 PM. Specific departments may have different visiting hours.",
    "Are visitors allowed in the ICU?":
      "ICU Visits: Visiting in the ICU is generally restricted to immediate family members and may have specific hours.",
    "Can children visit patients?":
      "Children Visiting: Children may be allowed depending on the department's specific policies.",

    // Health Records:

    "What is the procedure for accessing medical records?":
      "You can access your medical records by visiting the hospital's Health Records Department or through the hospital's online portal (if available).",

    "Can I request a copy of my test results online?":
      "Yes, AIIMS allows patients to request copies of their test results through their online portal or by contacting the relevant department directly.",

    "How do I update my personal information in the hospital's records?":
      "You can update your personal information by visiting the hospital’s Health Records Department or submitting an update request via the online portal.",

    "How long does it take to get medical records after a request?":
      "It typically takes 3-5 business days to process and provide medical records after a request has been submitted, depending on the complexity of the records requested.",

    // Wellness Programs and Camps:

    "Does the hospital offer vaccination drives?":
      "Yes, AIIMS conducts regular vaccination drives for both adults and children. You can check the hospital's official website or contact them for details on upcoming drives.",

    "Are there any health awareness or check-up camps?":
      "AIIMS organizes various health awareness and check-up camps. These programs are announced on the hospital's website and social media platforms.",

    "What wellness programs do you offer?":
      "AIIMS offers wellness programs that include preventive health check-ups, health awareness workshops, and various community health initiatives.",

    // Surgeries and Procedures:

    "How can I get pre-surgery consultation details?":
      "Pre-surgery consultations can be arranged by booking an appointment with the relevant department through the online registration system or by contacting the hospital’s OPD.",

    "What are the preparations required for surgery?":
      "Surgery preparations include fasting for a certain period before the procedure, necessary pre-operative tests, and consultations with your surgeon. Specific instructions will be provided to you during the pre-surgery consultation.",

    "Are family members allowed during the procedure?":
      "Family members are generally not allowed in the operating room during procedures, but they may be allowed to accompany the patient during pre- and post-operative stages, depending on hospital policies.",

    "How can I schedule follow-up care after surgery?":
      "Follow-up care can be scheduled by contacting the relevant department or scheduling through the hospital’s online system. The surgeon or specialist will provide a follow-up plan during the surgery consultation.",

    // Feedback and Complaints:

    "How can I provide feedback about my experience?":
      "You can provide feedback by visiting the hospital's official website or filling out the feedback forms available at the hospital. You may also share your experience with the hospital's customer service.",

    "Who do I contact for complaints or unresolved issues?":
      "For complaints or unresolved issues, you can contact the hospital’s grievance redressal cell or customer service department. Contact details are available on the hospital’s website.",

    "Can I leave a review for a specific doctor or department?":
      "Yes, you can leave reviews for specific doctors or departments via the hospital's online portal or patient feedback forms available at the hospital.",

    // Technical Support:

    "I'm facing issues with the hospital's mobile app. What should I do?":
      "If you're facing issues with the hospital's mobile app, you can contact the technical support team at the hospital for assistance.",

    "How do I reset my password for the online portal?":
      "To reset your password, visit the hospital’s online portal and follow the 'Forgot Password' option. You will be guided through the process.",

    "Who can I contact for help with technical issues?":
      "For technical support, you can contact the hospital’s IT department or use the customer support number available on the hospital's official website.",
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
          { text: "🤖 :- " + qaData[matchedQuestion], user: false },
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
              "🤖 :- " +
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
          <h2>Hospital Queries Chatbot</h2>
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
