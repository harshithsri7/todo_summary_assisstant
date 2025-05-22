import React, { useState } from 'react';
import axios from 'axios';

function TodoSummary() {
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/summarize');
      console.log('API response:', response.data);
      setSummary(response.data.summary || 'No summary returned');
    } catch (err) {
      setError('Failed to get summary');
      console.error(err);
    }
    setLoading(false);
  };

  console.log('Current summary state:', summary);

  return (
    <div>
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Get Todo Summary'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', border: '1px solid #ddd', padding: '1rem' }}>
          <h3>Todo Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default TodoSummary;
