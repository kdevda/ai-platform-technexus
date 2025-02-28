'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ApiTestPage() {
  const [apiUrl, setApiUrl] = useState<string>('');
  const [testResults, setTestResults] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [useProxy, setUseProxy] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Get the API URL from environment variable
    const envApiUrl = process.env.NEXT_PUBLIC_API_URL || 'Not set';
    setApiUrl(envApiUrl);
  }, []);

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResults('Testing API connection...');
    
    try {
      let results = `API URL: ${apiUrl}\n\n`;
      
      // Test endpoints
      const endpoints = [
        { name: 'Health', path: '/health' },
        { name: 'Root', path: '' },
        { name: 'API', path: '/api' }
      ];
      
      for (const endpoint of endpoints) {
        try {
          let response;
          
          if (useProxy) {
            // Use Next.js API route as a proxy to avoid CORS issues
            response = await fetch(`/api/proxy?url=${encodeURIComponent(`${apiUrl}${endpoint.path}`)}`);
          } else {
            // Direct request (may have CORS issues)
            response = await fetch(`${apiUrl}${endpoint.path}`);
          }
          
          const data = await response.text();
          
          results += `${endpoint.name} Endpoint (${apiUrl}${endpoint.path}):\n`;
          results += `Status: ${response.status} ${response.statusText}\n`;
          results += `Content-Type: ${response.headers.get('content-type')}\n`;
          results += `Response: ${data.substring(0, 200)}${data.length > 200 ? '...' : ''}\n\n`;
        } catch (endpointError) {
          results += `${endpoint.name} Endpoint (${apiUrl}${endpoint.path}):\n`;
          results += `Error: ${endpointError instanceof Error ? endpointError.message : String(endpointError)}\n\n`;
        }
      }
      
      setTestResults(results);
    } catch (error) {
      setTestResults(`Error testing API: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="mb-4">
        <p><strong>Environment API URL:</strong> {apiUrl}</p>
        
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={useProxy}
              onChange={() => setUseProxy(!useProxy)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Use server-side proxy (to avoid CORS issues)</span>
          </label>
        </div>
      </div>
      
      <button 
        onClick={testApiConnection}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {isLoading ? 'Testing...' : 'Test API Connection'}
      </button>
      
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Test Results:</h2>
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {testResults || 'No test results yet. Click the button above to test the API connection.'}
        </pre>
      </div>
      
      <button 
        onClick={() => router.push('/login')}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Back to Login
      </button>
    </div>
  );
} 