import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Scrollbar } from '@/components/ui/scrollbar';
import { useAuth } from '@/app/AuthContext';
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

  useEffect(() => {
    // Generate a session ID when component mounts
    setSessionId(`session-${Math.random().toString(36).substring(2, 11)}`);

    // Add a welcome message
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! How can I assist you today?',
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    if (!token) {
      setError('Authentication required');
      return;
    }

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`${widthClasses[width]} p-2 flex ${positionClasses[position]}`}>
      <Card className="w-full overflow-hidden" style={{ maxHeight: `${initialHeight}px` }}>
        <CardHeader className="bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 bg-primary">
                <span className="text-xs font-semibold">AI</span>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Active
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 relative" style={{ height: `${initialHeight - 140}px` }}>
          <Scrollbar>
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-center">
                  <div className="max-w-[80%] rounded-lg p-3 bg-destructive/10 text-destructive">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </Scrollbar>
        </CardContent>

        <CardFooter className="p-3 border-t">
          <div className="flex w-full space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading || !token}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !input.trim() || !token}
              size="icon"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIAgentWidget; 