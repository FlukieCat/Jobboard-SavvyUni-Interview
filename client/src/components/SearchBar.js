import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const SearchBar = ({ keywords, setKeywords, onSubmit }) => {
    const onChange = (e) => {
        setKeywords(e.target.value);
    };

    return (
        <Form className="mt-4 mb-4" onSubmit={onSubmit}>
            <Form.Row className="align-items-center">
                <Col>
                    <Form.Label srOnly>Keywords</Form.Label>
                    <Form.Control
                        onChange={onChange}
                        value={keywords}
                        name="keywords"
                        placeholder="Keywords"
                        type="text"
                    ></Form.Control>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" type="submit">
                        Find Jobs
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default SearchBar;
