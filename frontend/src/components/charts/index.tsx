import React, { useEffect, useRef } from 'react';

interface ChartProps {
  data: number[];
  labels?: string[];
  height?: number;
  width?: number;
  title?: string;
  className?: string;
}

export const LineChart: React.FC<ChartProps> = ({ 
  data, 
  labels = [], 
  height = 200, 
  width = 400,
  title = '',
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw chart
      const padding = 40;
      const chartWidth = width - (padding * 2);
      const chartHeight = height - (padding * 2);
      
      // Check if data is valid
      if (!data || !Array.isArray(data) || data.length === 0) {
        // Draw "No data available" message
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.fillText('No data available', width / 2, height / 2);
        return;
      }
      
      // Calculate max value for scaling
      const maxValue = Math.max(...data, 0);
      const scale = chartHeight / (maxValue || 1); // Avoid division by zero

      // Draw axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.strokeStyle = '#ccc';
      ctx.stroke();

      // Plot data
      if (data.length > 1) {
        ctx.beginPath();
        const pointSpacing = chartWidth / (data.length - 1);
        
        data.forEach((value, index) => {
          const x = padding + (index * pointSpacing);
          const y = height - padding - (value * scale);
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw points
        data.forEach((value, index) => {
          const x = padding + (index * pointSpacing);
          const y = height - padding - (value * scale);
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#4f46e5';
          ctx.fill();
        });
      }

      // Draw labels
      if (labels.length > 0) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Arial';
        
        const labelSpacing = chartWidth / (labels.length - 1 || 1);
        labels.forEach((label, index) => {
          const x = padding + (index * labelSpacing);
          ctx.fillText(label, x, height - padding + 15);
        });
      }

      // Draw title
      if (title) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#111827';
        ctx.font = '14px Arial';
        ctx.fillText(title, width / 2, 20);
      }
    }
  }, [data, labels, height, width, title]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  );
};

export const BarChart: React.FC<ChartProps> = ({ 
  data, 
  labels = [], 
  height = 200, 
  width = 400,
  title = '',
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw chart
      const padding = 40;
      const chartWidth = width - (padding * 2);
      const chartHeight = height - (padding * 2);
      
      // Check if data is valid
      if (!data || !Array.isArray(data) || data.length === 0) {
        // Draw "No data available" message
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.fillText('No data available', width / 2, height / 2);
        return;
      }
      
      // Calculate max value for scaling
      const maxValue = Math.max(...data, 0);
      const scale = chartHeight / (maxValue || 1); // Avoid division by zero

      // Draw axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.strokeStyle = '#ccc';
      ctx.stroke();

      // Plot data
      const barWidth = (chartWidth / data.length) * 0.8;
      const barSpacing = chartWidth / data.length;
      
      data.forEach((value, index) => {
        const barHeight = value * scale;
        const x = padding + (index * barSpacing) + (barSpacing - barWidth) / 2;
        const y = height - padding - barHeight;
        
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(x, y, barWidth, barHeight);
      });

      // Draw labels
      if (labels.length > 0) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Arial';
        
        labels.forEach((label, index) => {
          const x = padding + (index * barSpacing) + barSpacing / 2;
          ctx.fillText(label, x, height - padding + 15);
        });
      }

      // Draw title
      if (title) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#111827';
        ctx.font = '14px Arial';
        ctx.fillText(title, width / 2, 20);
      }
    }
  }, [data, labels, height, width, title]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  );
};

export const PieChart: React.FC<ChartProps> = ({ 
  data, 
  labels = [], 
  height = 200, 
  width = 200,
  title = '',
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw chart
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 20;
      
      // Check if data is valid
      if (!data || !Array.isArray(data) || data.length === 0) {
        // Draw "No data available" message
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.fillText('No data available', width / 2, height / 2);
        return;
      }
      
      // Calculate total value
      const total = data.reduce((sum, value) => sum + value, 0);
      
      // If total is zero, display message
      if (total === 0) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.fillText('No data available', width / 2, height / 2);
        return;
      }
      
      // Colors
      const colors = [
        '#4f46e5', '#3b82f6', '#ec4899', '#f59e0b', '#10b981',
        '#6366f1', '#8b5cf6', '#ef4444', '#84cc16', '#06b6d4'
      ];

      // Draw slices
      let startAngle = 0;
      
      data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        startAngle += sliceAngle;
      });

      // Draw title
      if (title) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#111827';
        ctx.font = '14px Arial';
        ctx.fillText(title, width / 2, 20);
      }

      // Draw legend
      if (labels.length > 0) {
        const legendX = centerX - radius;
        let legendY = height - 30;
        
        labels.forEach((label, index) => {
          const color = colors[index % colors.length];
          
          ctx.fillStyle = color;
          ctx.fillRect(legendX - 20, legendY - 10, 15, 15);
          
          ctx.textAlign = 'left';
          ctx.fillStyle = '#6b7280';
          ctx.font = '12px Arial';
          ctx.fillText(label, legendX, legendY);
          
          legendY -= 20;
        });
      }
    }
  }, [data, labels, height, width, title]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  );
}; 