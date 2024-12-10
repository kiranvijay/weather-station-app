import { ChartOptions } from "chart.js";

export const chart_options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 18,
            family: 'Nunito'
          }
        },
      },


    },

    scales: {
      x: {
        title: {
          display: true,
          color: 'white',
        },

        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        title: {
          display: true,
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        beginAtZero: false,
      },
    },
  };