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
        { name: 'API', path: '/api' },
        { name: 'Schema Tables', path: '/api/schema/tables' }
      ];
      
      for (const endpoint of endpoints) {
        try {
          let response;
          
          if (useProxy) {
            // Use proxy to avoid CORS issues
            response = await fetch(`/api/proxy?url=${encodeURIComponent(`${apiUrl}${endpoint.path}`)}`);
          } else {
            // Direct request
            response = await fetch(`${apiUrl}${endpoint.path}`);
          }
          
          const statusText = response.status === 200 ? 'OK' : 'Failed';
          let responseText = '';
          
          try {
            const data = await response.text();
            responseText = data.substring(0, 1000); // Limit response size for display
            if (data.length > 1000) responseText += '... (truncated)';
          } catch (error) {
            responseText = 'Could not parse response';
          }
          
          results += `${endpoint.name} (${endpoint.path}): ${response.status} ${statusText}\n`;
          results += `Response: ${responseText}\n\n`;
        } catch (error) {
          results += `${endpoint.name} (${endpoint.path}): ERROR\n`;
          results += `Error: ${error instanceof Error ? error.message : String(error)}\n\n`;
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
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">API Settings</h2>
        <div className="mb-4">
          <label className="block mb-1">API URL:</label>
          <div className="text-sm bg-gray-100 p-2 rounded">{apiUrl}</div>
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useProxy}
              onChange={(e) => setUseProxy(e.target.checked)}
              className="mr-2"
            />
            Use proxy to avoid CORS issues
          </label>
        </div>
        
        <button
          onClick={testApiConnection}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Testing...' : 'Test API Connection'}
        </button>
      </div>
      
      {testResults && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Test Results</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
            {testResults}
          </pre>
        </div>
      )}
      
      <div className="mt-6">
        <button
          onClick={() => router.push('/platform/dashboard')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
} 