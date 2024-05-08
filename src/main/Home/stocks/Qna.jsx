 import React, { useState } from "react";
   import axios from "axios";
   import "./Qna.css"; // Import CSS file for styling
   
   const FinanceQnAPage = () => {
     const [question, setQuestion] = useState("");
     const [answer, setAnswer] = useState("");
     const [error, setError] = useState("");
   
     const handleQuestionChange = (event) => {
       setQuestion(event.target.value);
     };
   
     const handleAskQuestion = async () => {
       if (!question.trim()) {
         setError("Please enter a question.");
         return;
       }
   
       const Api_key = "AIzaSyAoRFF_11eZJNLiN6KWwCQjKWR0ELMCAXk";
   
   
       try {
         const response = await axios.post(
           `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent${Api_key}`,
           {
             contents: [
               {
                 parts: [
                   {
                     text: question,
                   },
                 ],
               },
             ],
           },
           {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Api_key}`,
                'Access-Control-Allow-Origin': "*"

              },
              
           }
         );
         console.log(response, "responseresponse");
         setAnswer(response.data.choices[0].text.trim());
         setError("");
       } catch (error) {
         setError("Error fetching answer. Please try again.");
       }
     };
   
     // Mock integration for OPTIONS method
     axios.interceptors.request.use((config) => {
       if (config.method === "options") {
         return {
           ...config,
           method: "get",
         };
       }
       return config;
     });
   
     // Adding response headers for CORS
     axios.interceptors.response.use((response) => {
       if (response.config.method === "options") {
         response.headers["Access-Control-Allow-Headers"] = "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token";
         response.headers["Access-Control-Allow-Methods"] = "*";
         response.headers["Access-Control-Allow-Origin"] = "*";
       }
       return response;
     });
   
     return (
       <div className="qna-container">
         <h1 className="qna-title">Ask a Finance Question</h1>
         <div className="qna-input">
           <textarea
             placeholder="Enter your finance-related question here..."
             value={question}
             onChange={handleQuestionChange}
             className="qna-textarea"
           />
           <button onClick={handleAskQuestion} className="qna-button">
             Ask
           </button>
         </div>
         {error && <p className="qna-error">{error}</p>}
         {answer && (
           <div className="qna-answer">
             <h2 className="qna-answer-title">Answer:</h2>
             <p className="qna-answer-text">{answer}</p>
           </div>
         )}
       </div>
     );
   };
   
   export default FinanceQnAPage;
   