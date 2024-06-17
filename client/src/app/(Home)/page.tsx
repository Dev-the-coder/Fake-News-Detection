"use client"
import { useState } from 'react';
import axios from 'axios';
import AnalysisComponent from './analysis-component';
import Loader from './loader';

const Home = () => {
  const [analysisHistory, setAnalysisHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newsText = event.target.newsText.value.trim();
    event.target.newsText.value = '';
    if (newsText !== "") {
      setLoading(true); 
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/text', { news: newsText });
        console.log(response.data)
        setAnalysisHistory([...analysisHistory, {...response.data, "userText": newsText}]);
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <header className="bg-blue-800 fixed top-0 left-0 right-0 text-white py-3 shadow-lg pl-20 font-sf z-50">
        <h1 className="text-2xl font-extrabold">Fake News Detector</h1>
      </header>
      <div style={{height: "10vh"}}></div>
      {loading ? <Loader/> :(
        <>
        <div className="flex-grow overflow-y-auto p-4 font-sans z-10"> 
        {analysisHistory.map((news, index) => (
          <AnalysisComponent key={index} news={news}/>
        ))}
      </div>
      </>)}
      
      <div style={{height: "10vh"}}></div>
      <form className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-between gap-4 z-50" onSubmit={event => handleSubmit(event)}>
        <textarea
          className="flex-grow p-3 border border-gray-700 rounded-full resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-750 bg-gray-700 text-white font-sans"
          placeholder="Enter text here..."
          name="newsText"
          style={{ height: '3.5rem' }} 
        />
        <button
          type="submit"
          className={`bg-blue-800 text-white py-2 px-6 rounded-full hover:bg-blue-700 flex-shrink-0 transition-all font-sans font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Home;
