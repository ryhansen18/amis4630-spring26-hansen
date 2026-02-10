import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // New state for personalized greeting
  const [nameInput, setNameInput] = useState<string>('');
  const [personalizedMessage, setPersonalizedMessage] = useState<string>('');

  // Load initial hello message
  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to connect to .NET API');
        setLoading(false);
      });
  }, []);

  // Handle form submission
  const handleGetPersonalized = async () => {
    if (!nameInput.trim()) {
      alert('Please enter a name');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/hello/personalized?name=${encodeURIComponent(nameInput)}`
      );
      const data = await response.json();
      setPersonalizedMessage(data.message);
    } catch (err) {
      alert('Failed to fetch personalized greeting');
      console.error(err);
    }
  };

  if (loading) return <div className="app">Loading...</div>;
  if (error) return <div className="app error">{error}</div>;

  return (
    <div className="app">
      <h1>🚀 Full-Stack Hello World</h1>

      {/* Original message */}
      <div className="card">
        <h2>Message from .NET:</h2>
        <p className="message">{message}</p>
      </div>

      {/* Interactive form */}
      <div className="card">
        <h2>Get Personalized Greeting:</h2>
        <div className="form">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name"
            onKeyPress={(e) => e.key === 'Enter' && handleGetPersonalized()}
          />
          <button onClick={handleGetPersonalized}>
            Get Greeting
          </button>
        </div>

        {personalizedMessage && (
          <div className="result">
            <p className="message">{personalizedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;