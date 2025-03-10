import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Scrollbar } from '@/components/ui/scrollbar';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send } from 'lucide-react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAgentWidgetProps {
  agentId: string;
  title: string;
  description?: string;
  initialHeight?: number;
  position?: 'left' | 'right' | 'center';
  width?: 'full' | 'half' | 'third';
}

const AIAgentWidget: React.FC<AIAgentWidgetProps> = ({
  agentId,
  title,
  description,
  initialHeight = 400,
  position = 'right',
  width = 'third'
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { state } = useAuth();
  const token = state.user?.token;

  // Widget width classes
  const widthClasses = {
    full: 'w-full',
    half: 'w-1/2',
    third: 'w-1/3'
  };

  // Widget position classes
  const positionClasses = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center'
  };

  // Initialize the chat session when the component mounts
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Create a new session
        const response = await axios.post(
          `/api/agents/${agentId}/initialize`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setSessionId(response.data.data.sessionId);
          setIsActive(true);
        } else {
          setError('Failed to initialize chat session');
          setIsActive(false);
        }
      } catch (error) {
        console.error('Error initializing agent session:', error);
        setError('Error initializing chat session');
        setIsActive(false);
      }
    };

    if (token) {
      initializeSession();
    } else {
      setIsActive(false);
    }
  }, [agentId, token]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading || !token) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      // Call the API to execute the agent
      const response = await axios.post(
        `/api/agents/${agentId}/execute`,
        {
          input: userMessage.content,
          sessionId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Add assistant message
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.data.data.output,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setError('Failed to get a response');
      }
    } catch (error) {
      console.error('Error executing agent:', error);
      setError('Error communicating with the AI agent');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`${widthClasses[width]} p-2 flex ${positionClasses[position]}`}>
      <Card className="w-full overflow-hidden shadow-xl border border-gray-200 rounded-xl max-w-4xl">
        <CardHeader className="bg-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 bg-black text-white">
                <span className="text-xs font-semibold">AI</span>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                {description && <p className="text-sm text-gray-600">{description}</p>}
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={`${isActive 
                ? 'bg-green-100 text-green-800 border-green-300' 
                : 'bg-red-100 text-red-800 border-red-300'}`}
            >
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>

        <div className="relative" style={{ height: `${initialHeight - 140}px` }}>
          <div 
            className="h-full overflow-y-auto p-4 bg-gray-50" 
            ref={messagesEndRef}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg text-gray-900">Welcome to Loan Assistant</h3>
                <p className="text-gray-600 text-sm mt-2">Ask me any questions about loans, payments, or applications. I'm here to help!</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-xs">AI</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                    <span className="text-xs text-gray-600">You</span>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-xs">AI</span>
                </div>
                <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <p className="text-sm text-gray-600">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center mb-4">
                <div className="max-w-[80%] rounded-lg p-3 bg-red-50 text-red-600 border border-red-200">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-3 bg-white">
          <div className="flex w-full space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading || !token}
              className="flex-1 border-gray-300 focus:border-black focus:ring-black"
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !input.trim() || !token}
              size="icon"
              className="bg-black hover:bg-gray-800 text-white"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAgentWidget; 