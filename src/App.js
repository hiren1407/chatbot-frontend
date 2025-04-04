import React, { useState, useEffect } from 'react';
import UrlInput from './Components/UrlInput';
import ChatInterface from './Components/ChatInterface';

function App() {
  const [showChat, setShowChat] = useState(false); // Add state to control UI transition
  const handleUrlSubmitted = () => {
    setShowChat(true); // Transition to the ChatInterface
  };

  // Delete the Pinecone index when the user leaves the page
  useEffect(() => {
    return () => {
      fetch('http://127.0.0.1:5000/delete-index', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        
      })
        .then((response) => {
          if (!response.ok) {
            console.error('Error deleting index:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  }, []);

  return (
    <div className="App">
      {!showChat ? (
        <UrlInput onSubmit={handleUrlSubmitted} />
      ) : (
        <ChatInterface />
      )}
    </div>
  );
}

export default App;