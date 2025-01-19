import ProgressBar from 'react-bootstrap/ProgressBar';

function ContextualExample() {
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <ProgressBar variant="success" now={40} style={{ height: '20px',}} />
      <ProgressBar variant="info" now={20} style={{ height: '20px', marginTop: '10px' }} />
      <ProgressBar variant="warning" now={60} style={{ height: '20px', marginTop: '10px' }} />
      <ProgressBar variant="danger" now={80} style={{ height: '20px', marginTop: '10px' }} />
    </div>
  );
}

export default ContextualExample;