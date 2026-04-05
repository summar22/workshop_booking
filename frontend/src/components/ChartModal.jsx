import { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartModal({ title, chartData, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 13 },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleFont: { family: 'Inter', size: 13 },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 8,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#64748b',
          font: { family: 'Inter', size: 11 },
          maxRotation: 45,
        },
        grid: {
          color: 'rgba(255,255,255,0.04)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#64748b',
          font: { family: 'Inter', size: 11 },
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255,255,255,0.06)',
        },
      },
    },
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} id="chart-modal-close">
            <span className="material-icons-round">close</span>
          </button>
        </div>
        <div className="modal-body" style={{ height: 400 }}>
          {chartData && chartData.labels && chartData.labels.length > 0 ? (
            <Bar data={chartData} options={options} />
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: '100%', color: 'var(--text-muted)', flexDirection: 'column', gap: 'var(--space-2)'
            }}>
              <span className="material-icons-round" style={{ fontSize: 48, opacity: 0.3 }}>bar_chart</span>
              <p>No chart data available for current filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
