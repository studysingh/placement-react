import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProblemCard = ({ fileName, problemCount, onViewDetails, updatedAt }) => {
  // Display a shorter version of the file name without .json
  const title = fileName.replace('.json', '');

  // Convert an ISO timestamp to a date-only key (YYYY-MM-DD).
  const dateKeyFromIso = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    if (!isFinite(d)) return null;
    // Use local date part for grouping (consistent for same calendar day)
    // Use toISOString and slice to ensure consistent YYYY-MM-DD regardless of timezone.
    return d.toISOString().slice(0, 10);
  };

  // Map date keys to a fixed palette of 20 friendly colors.
  const PALETTE = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
    '#393b79', '#637939', '#8c6d31', '#843c39', '#7b4173',
    '#5254a3', '#9c9ede', '#8ca252', '#b5cf6b', '#cedb9c'
  ];

  const colorFromDateKey = (key) => {
    if (!key) return '#dee2e6';
    // djb2 hash
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) + hash) + key.charCodeAt(i);
    }
    const idx = Math.abs(hash) % PALETTE.length;
    return PALETTE[idx];
  };

  const dateKey = updatedAt ? dateKeyFromIso(updatedAt) : null;
  const dateColor = dateKey ? colorFromDateKey(dateKey) : '#dee2e6';

  return (
  <Card className="mb-3 shadow-sm" style={{ borderLeft: `6px solid ${dateColor}` }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Total Questions: {problemCount}
        </Card.Text>
        {updatedAt && (
          <Card.Text
            className="text-muted"
            style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span
              aria-hidden
              style={{
                width: 12,
                height: 12,
                backgroundColor: dateColor,
                borderRadius: '50%',
                display: 'inline-block',
                boxShadow: '0 0 0 2px rgba(255,255,255,0.6) inset'
              }}
            />
            <span>Updated: {new Date(updatedAt).toLocaleString()}</span>
          </Card.Text>
        )}
        <Button variant="primary" onClick={onViewDetails}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProblemCard;
