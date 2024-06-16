'use client'
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/text', { news: text });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Fake News Detector</h1>
      </header>
      <div className="flex-grow flex flex-col justify-end p-4">
        <div className="w-full max-w-xl mx-auto flex items-center space-x-2">
          <textarea
            className="flex-grow p-3 border border-gray-300 rounded-lg resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            placeholder="Enter text here..."
            value={text}
            onChange={handleChange}
            style={{ height: 'auto' }}
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 flex-shrink-0"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
