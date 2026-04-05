import { useState, useEffect, useCallback } from 'react';
import { getWorkshopPublicStats, getWorkshopTypes, getStates } from '../api/statistics';
import ChartModal from '../components/ChartModal';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function WorkshopStatistics() {
  const { user } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, numPages: 1, total: 0 });

  // Filter state
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [workshopTypes, setWorkshopTypes] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showMyWorkshops, setShowMyWorkshops] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalChartData, setModalChartData] = useState(null);

  // Load filter options
  useEffect(() => {
    Promise.all([getWorkshopTypes(), getStates()])
      .then(([types, states]) => {
        setWorkshopTypes(types);
        setStatesList(states);
      })
      .catch(() => {});
  }, []);

  const fetchStats = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, sort: sortBy };
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;
      if (selectedState) params.state = selectedState;
      if (selectedType) params.workshop_type = selectedType;
      if (showMyWorkshops) params.show_workshops = 'true';

      const data = await getWorkshopPublicStats(params);
      setWorkshops(data.workshops);
      setChartData(data.chart_data);
      setPagination({
        page: data.page,
        numPages: data.num_pages,
        total: data.total
      });
    } catch (err) {
      toast.error('Failed to load workshop statistics');
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate, selectedState, selectedType, sortBy, showMyWorkshops]);

  useEffect(() => {
    fetchStats(1);
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchStats(1);
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    setSelectedType('');
    setSelectedState('');
    setSortBy('date');
    setShowMyWorkshops(false);
    // Fetch with defaults
    setTimeout(() => fetchStats(1), 0);
  };

  const openStateChart = () => {
    if (!chartData) return;
    setModalTitle('Workshops Statistics');
    setModalChartData({
      labels: chartData.states,
      datasets: [{
        data: chartData.state_counts,
        label: 'State wise workshops',
        backgroundColor: 'rgba(244, 114, 182, 0.8)',
        borderColor: 'rgb(244, 114, 182)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(244, 114, 182, 1)',
      }]
    });
    setModalOpen(true);
  };

  const openTypeChart = () => {
    if (!chartData) return;
    setModalTitle('Workshops Statistics');
    setModalChartData({
      labels: chartData.types,
      datasets: [{
        data: chartData.type_counts,
        label: 'Type wise workshops',
        backgroundColor: 'rgba(244, 114, 182, 0.8)',
        borderColor: 'rgb(244, 114, 182)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(244, 114, 182, 1)',
      }]
    });
    setModalOpen(true);
  };

  const handleDownload = () => {
    const params = new URLSearchParams();
    if (fromDate) params.set('from_date', fromDate);
    if (toDate) params.set('to_date', toDate);
    if (selectedState) params.set('state', selectedState);
    if (selectedType) params.set('workshop_type', selectedType);
    params.set('sort', sortBy);
    params.set('download', 'download');
    // Use Django's original CSV download endpoint
    window.open(`/statistics/public?${params.toString()}`, '_blank');
  };

  const startIndex = (pagination.page - 1) * 30;

  return (
    <div className="container-fluid stats-page animate-fade-in">
      <div className="stats-layout">
        {/* Filter Panel */}
        <form onSubmit={handleFilter} className="glass-card filter-panel animate-fade-in-up">
          <div className="card-header">
            <h3 className="filter-title">Filters</h3>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleClear}
              id="filter-clear">
              <span className="material-icons-round" style={{ fontSize: 16 }}>close</span>
              Clear
            </button>
          </div>
          <div className="card-body filter-body">
            <div className="form-group">
              <label className="form-label">From date:</label>
              <input type="date" className="form-input" value={fromDate}
                onChange={(e) => setFromDate(e.target.value)} id="filter-from-date" />
            </div>
            <div className="form-group">
              <label className="form-label">To date:</label>
              <input type="date" className="form-input" value={toDate}
                onChange={(e) => setToDate(e.target.value)} id="filter-to-date" />
            </div>
            <div className="form-group">
              <label className="form-label">Workshop:</label>
              <select className="form-select" value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)} id="filter-workshop">
                <option value="">---------</option>
                {workshopTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">State:</label>
              <select className="form-select" value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)} id="filter-state">
                <option value="">---------</option>
                {statesList.map(s => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sort by:</label>
              <select className="form-select" value={sortBy}
                onChange={(e) => setSortBy(e.target.value)} id="filter-sort">
                <option value="date">Oldest</option>
                <option value="-date">Latest</option>
              </select>
            </div>
            {user && (
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="filter-show-mine" checked={showMyWorkshops}
                  onChange={(e) => setShowMyWorkshops(e.target.checked)}
                  style={{ accentColor: 'var(--accent-teal)' }} />
                <label htmlFor="filter-show-mine" className="form-label" style={{ margin: 0 }}>
                  Show my workshops only
                </label>
              </div>
            )}

            <div className="filter-actions">
              <button type="submit" className="btn btn-success" id="filter-view">
                <span className="material-icons-round" style={{ fontSize: 18 }}>visibility</span>
                View
              </button>
              <button type="button" className="btn btn-info" onClick={handleDownload}
                id="filter-download">
                <span className="material-icons-round" style={{ fontSize: 18 }}>download</span>
                Download
              </button>
            </div>
          </div>
        </form>

        {/* Main Content */}
        <div className="animate-fade-in-up animate-delay-1">
          <div className="stats-toolbar">
            <div className="toolbar-left">
              {/* Pagination info */}
              <div className="pagination">
                {Array.from({ length: pagination.numPages }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`page-btn ${p === pagination.page ? 'active' : ''}`}
                    onClick={() => fetchStats(p)} id={`page-${p}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="toolbar-right">
              <button className="btn btn-info" onClick={openStateChart} id="state-chart-btn">
                <span className="material-icons-round" style={{ fontSize: 18 }}>bar_chart</span>
                State chart
              </button>
              <button className="btn btn-info" onClick={openTypeChart} id="type-chart-btn">
                <span className="material-icons-round" style={{ fontSize: 18 }}>bar_chart</span>
                Workshops chart
              </button>
            </div>
          </div>

          {/* Workshops Table */}
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" id="stats-table">
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Coordinator Name</th>
                    <th>Institute Name</th>
                    <th>Instructor Name</th>
                    <th>Workshop Name</th>
                    <th>Workshop Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Skeleton rows
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={`skeleton-${i}`}>
                        {Array.from({ length: 6 }).map((_, j) => (
                          <td key={j}>
                            <div className="skeleton skeleton-text" style={{ width: `${60 + Math.random() * 40}%` }} />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : workshops.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>
                        <span className="material-icons-round" style={{ fontSize: 48, display: 'block', marginBottom: 'var(--space-2)', opacity: 0.3 }}>
                          event_busy
                        </span>
                        No workshops found for the selected filters
                      </td>
                    </tr>
                  ) : (
                    workshops.map((ws, idx) => (
                      <tr key={ws.id || idx}>
                        <td>
                          <span className="badge badge-info">{startIndex + idx + 1}</span>
                        </td>
                        <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {ws.coordinator_name}
                        </td>
                        <td>{ws.coordinator_institute}</td>
                        <td>{ws.instructor_name || '—'}</td>
                        <td>
                          <span style={{ color: 'var(--accent-teal)' }}>{ws.workshop_type_name}</span>
                        </td>
                        <td>{new Date(ws.date).toLocaleDateString('en-IN', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom pagination */}
          {pagination.numPages > 1 && (
            <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'center' }}>
              <div className="pagination">
                <button className="page-btn" disabled={pagination.page <= 1}
                  onClick={() => fetchStats(pagination.page - 1)}>
                  <span className="material-icons-round" style={{ fontSize: 18 }}>chevron_left</span>
                </button>
                <span style={{ padding: '0 var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  Page {pagination.page} of {pagination.numPages}
                </span>
                <button className="page-btn" disabled={pagination.page >= pagination.numPages}
                  onClick={() => fetchStats(pagination.page + 1)}>
                  <span className="material-icons-round" style={{ fontSize: 18 }}>chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart Modal */}
      {modalOpen && (
        <ChartModal
          title={modalTitle}
          chartData={modalChartData}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
