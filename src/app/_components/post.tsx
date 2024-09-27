"use client";
import axios from "axios";
import { useState } from "react";
export function LatestPost() {
  const [response, setResponse] = useState<string>("");

  const onCallApi = async () => {
    try {
      const result = await axios.post('/api/chat', {
        messages: [
          {
            role: 'user',
            content: '晚上好'
          }
        ]
      });
      
      console.log(result.data.choices[0].message.content)
    } catch (error) {
      console.error('Error calling API:', error);
      setResponse('Failed to call API');
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button onClick={onCallApi} className="text-2xl font-bold text-red-500 border-2 border-red-500 rounded-md p-2 hover:bg-red-500 hover:text-white active:bg-red-700 active:border-red-700 transition-all duration-200 shadow-md hover:shadow-lg active:shadow-inner transform hover:-translate-y-0.5 active:translate-y-0.5">
        call api
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <pre>{response}</pre>
      </div>
    </div>
  );
}
