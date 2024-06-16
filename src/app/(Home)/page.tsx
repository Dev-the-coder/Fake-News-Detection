"use client"
import { useState } from 'react';

const Page = () => {
  const [activeTab, setActiveTab] = useState<'Link' | 'Text' | null>(null);

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className='flex justify-center item-center font-bold font-sans text-blue-400 '>Fake News Detection</h1>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'Link' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Link')}
        >
          Link
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'Text' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Text')}
        >
          Font
        </button>
      </div>

      {activeTab === 'Link' && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Paste your link"
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        </div>
      )}

      {activeTab === 'Text' && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Paste your Text"
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        </div>
      )}
    </div>
  );
};

export default Page;
