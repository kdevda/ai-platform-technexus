// Types for chart data
export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
  }[];
}

export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[] | string;
    borderColor?: string[] | string;
    borderWidth?: number;
  }[];
}

export interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

export interface ChartData {
  lineChartData: LineChartData;
  barChartData: BarChartData;
  pieChartData: PieChartData;
}

/**
 * Generates mock chart data for dashboard visualizations
 * @param type Optional parameter to specify which type of chart data to return
 * @returns Object containing data for line, bar, and pie charts
 */
export function getChartData(type?: 'line' | 'bar' | 'pie'): ChartData {
  // Line chart data - loan amounts over time
  const lineChartData: LineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Loan Amounts',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 35000, 32000, 40000, 42000, 38000, 45000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3
      },
      {
        label: 'Payments Received',
        data: [8000, 15000, 12000, 20000, 18000, 25000, 28000, 27000, 32000, 35000, 30000, 38000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3
      }
    ]
  };

  // Bar chart data - loan categories
  const barChartData: BarChartData = {
    labels: ['Personal', 'Business', 'Education', 'Home', 'Vehicle', 'Medical'],
    datasets: [
      {
        label: 'Number of Loans',
        data: [65, 59, 80, 81, 56, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };

  // Pie chart data - loan status distribution
  const pieChartData: PieChartData = {
    labels: ['Active', 'Completed', 'Pending', 'Defaulted'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }
    ]
  };

  // Return specific chart data if requested
  if (type === 'line') return { lineChartData, barChartData: {} as BarChartData, pieChartData: {} as PieChartData };
  if (type === 'bar') return { lineChartData: {} as LineChartData, barChartData, pieChartData: {} as PieChartData };
  if (type === 'pie') return { lineChartData: {} as LineChartData, barChartData: {} as BarChartData, pieChartData };

  // Return all chart data by default
  return { lineChartData, barChartData, pieChartData };
} 