import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGreeting = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.message || JSON.stringify(result));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGreeting();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <header className="header">
          <span className="logo-badge">⚛️ React + Node.js Express</span>
          <h1>Full-Stack Demo</h1>
          <p className="subtitle">
            Frontend fetching data from <code>GET /api</code> endpoint
          </p>
        </header>

        <section className="response-section">
          {loading && (
            <div className="status-box loading">
              <span className="spinner">⏳</span> Fetching message from <code>/api</code>...
            </div>
          )}

          {error && (
            <div className="status-box error">
              <span className="icon">⚠️</span>
              <div>
                <strong>Error fetching from backend:</strong>
                <p>{error}</p>
                <small>Ensure the Node-Express backend is running on port 3000.</small>
              </div>
            </div>
          )}

          {data && !loading && (
            <div className="status-box success">
              <span className="tag">Backend Response</span>
              <h2 className="greeting-text">{data}</h2>
            </div>
          )}
        </section>

        <footer className="card-footer">
          <button className="refresh-btn" onClick={fetchGreeting} disabled={loading}>
            {loading ? 'Refreshing...' : '🔄 Refresh /api'}
          </button>
        </footer>
      </div>
    </div>
  );
}
