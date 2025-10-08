import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProblemCard = ({ fileName, problemCount, onViewDetails }) => {
  // Display a shorter version of the file name without .json
  const title = fileName.replace('.json', '');

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Total Questions: {problemCount}
        </Card.Text>
        <Button variant="primary" onClick={onViewDetails}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProblemCard;
