import React, { useState } from 'react';

function UrlInput({ onSubmit }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/embed-and-store', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      console.log(response)
      if (response.status === 200) {
        console.log("hello")
        const data = await response.json();
        console.log('Response:', data);
        setResponseMessage(data.message);
        onSubmit();
      } else {
        setResponseMessage('Error: Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error: Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="urlinput">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Building Index...' : 'Submit'}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default UrlInput;