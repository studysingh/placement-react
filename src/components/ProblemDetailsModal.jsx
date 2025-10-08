import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProblemDetailsModal = ({ show, handleClose, file }) => {
  if (!file) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"          // extra large
      scrollable         // allow scrolling if content overflows
      centered           // vertically centered
      fullscreen="lg-down" // full screen on small & medium devices
    >
      <Modal.Header closeButton>
        <Modal.Title>{file.fileName.replace('.json', '')} - All Problems</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {file.problems.map(p => (
          <div key={p.id} className="mb-4 p-3 border rounded bg-light">
            <h5>{p.title}</h5>
            <div dangerouslySetInnerHTML={{ __html: p.problem_statement }} />
            {p.google_doc_link && (
              <p>
                <a href={p.google_doc_link} target="_blank" rel="noreferrer">
                  Google Doc Link
                </a>
              </p>
            )}
            <hr />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProblemDetailsModal;
