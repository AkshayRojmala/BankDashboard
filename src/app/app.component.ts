import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('balanceChartCanvas') balanceChartCanvas!: ElementRef<HTMLCanvasElement>;
  balanceChart: any;
  primaryChart: any;
  secondaryChart: any;
  secondaryAccountChart: any;

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true }
    },
    layout: {
      padding: 24
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  };
  primaryAccountChart: any;

  ngAfterViewInit() {
    this.initializeChart('12 months'); // Default Chart
    this.initializePrimaryChart();     // Primary account chart
    this.initializeSecondaryChart();   // Secondary account chart
  }

  initializeChart(filter: string) {
    const chartData = this.getChartData(filter);

    // Destroy existing chart if it exists
    if (this.balanceChart) {
      this.balanceChart.destroy();
    }

    // Create new chart using the canvas reference
    const ctx = this.balanceChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.balanceChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: this.chartOptions
      });
    }
  }

  getChartData(filter: string) {
    switch (filter) {
      case '30 days':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            { label: 'Low Balance', data: [2500, 3000, 2800, 3200], backgroundColor: '#6a5acd' },
            { label: 'Medium Balance', data: [1800, 2000, 1900, 2100], backgroundColor: '#9370db' },
            { label: 'High Balance', data: [1200, 1500, 1300, 1600], backgroundColor: '#dcdcdc' }
          ]
        };

      case '7 days':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            { label: 'Low Balance', data: [2000, 1800, 2200, 2400, 2100, 2300, 2500], backgroundColor: '#6a5acd' },
            { label: 'Medium Balance', data: [1500, 1400, 1600, 1700, 1550, 1650, 1750], backgroundColor: '#9370db' },
            { label: 'High Balance', data: [1000, 1100, 1200, 1300, 1250, 1350, 1400], backgroundColor: '#dcdcdc' }
          ]
        };

      case '24 hours':
        return {
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          datasets: [
            { label: 'Low Balance', data: Array(24).fill(0).map(() => Math.floor(Math.random() * 2000 + 1000)), backgroundColor: '#6a5acd' },
            { label: 'Medium Balance', data: Array(24).fill(0).map(() => Math.floor(Math.random() * 1500 + 800)), backgroundColor: '#9370db' },
            { label: 'High Balance', data: Array(24).fill(0).map(() => Math.floor(Math.random() * 1000 + 500)), backgroundColor: '#dcdcdc' }
          ]
        };

      default: // '12 months'
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            { label: 'Low Balance', data: [2000, 3000, 2500, 2700, 3000, 3500, 2800, 2600, 2900, 3100, 3700, 3400], backgroundColor: '#6a5acd' },
            { label: 'Medium Balance', data: [1500, 2000, 1800, 1900, 2200, 2500, 2300, 2100, 2400, 2600, 2900, 2700], backgroundColor: '#9370db' },
            { label: 'High Balance', data: [1000, 1500, 1200, 1400, 1800, 2000, 1700, 1500, 1600, 1900, 2100, 2000], backgroundColor: '#dcdcdc' }
          ]
        };
    }
  }

  onFilterClick(filter: string) {
    this.initializeChart(filter);
  }
  initializePrimaryChart() {
    new Chart("primaryAccountChart", {
      type: 'doughnut',
      data: {
        labels: ["Spent", "Remaining"],
        datasets: [{ 
          data: [70, 30], 
          backgroundColor: ["#6a5acd", "#ddd"] 
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  initializeSecondaryChart() {
    new Chart("secondaryAccountChart", {
      type: 'doughnut',
      data: {
        labels: ["Spent", "Remaining"],
        datasets: [{ 
          data: [50, 50], 
          backgroundColor: ["#333", "#ddd"] 
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

}