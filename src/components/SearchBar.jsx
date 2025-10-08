import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ keyword, setKeyword }) => (
  <Form>
    <Form.Control
      type="text"
      placeholder="Search by file name..."
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  </Form>
);

export default SearchBar;
