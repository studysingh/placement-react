import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ProblemCard from '../components/ProblemCard';
import ProblemDetailsModal from '../components/ProblemDetailsModal';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const basePath = process.env.PUBLIC_URL + '/data';
  // Load all JSON files
  useEffect(() => {
    fetch(`${basePath}/files_index.json`)
      .then(res => res.json())
      .then(fileNames => {
        Promise.all(
          fileNames.map(file =>
            fetch(`${basePath}/${file}`, { method: 'GET' })
              .then(res => {
                const lastModified = res.headers.get('last-modified');
                return res.json().then(problems => ({
                  fileName: file,
                  problemCount: problems.length,
                  problems: problems,
                  updatedAt: lastModified ? new Date(lastModified).toISOString() : null
                }));
              })
              .catch(err => { console.error(file, err); return null; })
          )
        ).then(data => {
          const validData = data.filter(d => d !== null);
          // derive numeric id from filename prefix (e.g. "100_Zeta.json" -> 100)
          const parseIdFromFile = (f) => {
            if (!f || !f.fileName) return Number.NEGATIVE_INFINITY;
            const m = /^(\d+)/.exec(f.fileName);
            return m ? Number(m[1]) : Number.NEGATIVE_INFINITY;
          };

          const sortedByIdDesc = [...validData].sort((a, b) => parseIdFromFile(b) - parseIdFromFile(a));
          setFiles(sortedByIdDesc);
        });
      })
      .catch(err => console.error('Error loading files_index.json', err));
  }, []);

  // Filter files by keyword
  useEffect(() => {
    const keywordLower = keyword.toLowerCase();
    setFilteredFiles(
      files.filter(f => f.fileName.toLowerCase().includes(keywordLower))
    );
  }, [keyword, files]);

  const handleViewDetails = (file) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  return (
    <Container>
      <h1 className="text-center my-4">Problem Search</h1>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />

      <Row className="mt-4">
        {filteredFiles.map(file => (
          <Col key={file.fileName} xs={12} md={6} lg={4}>
            <ProblemCard
              fileName={file.fileName}
              problemCount={file.problemCount}
              updatedAt={file.updatedAt}
              onViewDetails={() => handleViewDetails(file)}
            />
          </Col>
        ))}
      </Row>

      <ProblemDetailsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        file={selectedFile}
      />
    </Container>
  );
};

export default Home;
