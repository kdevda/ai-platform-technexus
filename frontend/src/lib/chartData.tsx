// Chart Data Utilities
export interface ChartData {
  labels: string[];
  values: number[];
}

/**
 * Generate chart data for the dashboard
 * @param dataType Type of data to generate
 * @param period Period for the data (e.g., 'week', 'month', 'year')
 * @param count Number of data points to generate
 * @returns Generated chart data
 */
export function getChartData(
  dataType: 'loans' | 'payments' | 'applications' | 'revenue', 
  period: 'week' | 'month' | 'year' = 'month', 
  count: number = 7
): ChartData {
  const labels: string[] = [];
  const values: number[] = [];
  
  // Generate period labels
  switch (period) {
    case 'week':
      for (let i = 0; i < count; i++) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        labels.unshift(day.toLocaleString('en-US', { weekday: 'short' }));
      }
      break;
    case 'month':
      for (let i = 0; i < count; i++) {
        const day = new Date();
        day.setDate(day.getDate() - (i * 4)); // Approximate weekly in a month
        labels.unshift(day.toLocaleString('en-US', { month: 'short', day: 'numeric' }));
      }
      break;
    case 'year':
      for (let i = 0; i < count; i++) {
        const month = new Date();
        month.setMonth(month.getMonth() - i);
        labels.unshift(month.toLocaleString('en-US', { month: 'short' }));
      }
      break;
  }
  
  // Generate data values based on type
  switch (dataType) {
    case 'loans':
      for (let i = 0; i < count; i++) {
        values.push(Math.floor(Math.random() * 10) + 5); // 5-15 loans
      }
      break;
    case 'payments':
      for (let i = 0; i < count; i++) {
        values.push(Math.floor(Math.random() * 20) + 10); // 10-30 payments
      }
      break;
    case 'applications':
      for (let i = 0; i < count; i++) {
        values.push(Math.floor(Math.random() * 15) + 5); // 5-20 applications
      }
      break;
    case 'revenue':
      for (let i = 0; i < count; i++) {
        values.push(Math.floor(Math.random() * 50000) + 25000); // $25k-$75k revenue
      }
      break;
  }
  
  return { labels, values };
}

/**
 * Generate pie chart data for loan statuses
 */
export function getLoanStatusData(): ChartData {
  return {
    labels: ['Active', 'Pending', 'Closed', 'Rejected'],
    values: [42, 18, 25, 15]
  };
}

/**
 * Generate bar chart data for loan types
 */
export function getLoanTypeData(): ChartData {
  return {
    labels: ['Personal', 'Business', 'Education', 'Home', 'Vehicle'],
    values: [35, 30, 15, 12, 8]
  };
}

/**
 * Generate line chart data for monthly revenue
 */
export function getRevenueData(): ChartData {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [43000, 36000, 41000, 52000, 48000, 62000]
  };
}

/**
 * Generate random color for charts
 */
export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
} 