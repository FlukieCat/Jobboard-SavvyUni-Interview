import React, { useState, Fragment, useContext } from 'react';
import { Card, Badge, Button, Form, Col } from 'react-bootstrap';
import JobContext from '../context/job/jobContext';
import AuthContext from '../context/auth/authContext';

const Job = ({ job }) => {
    const jobContext = useContext(JobContext);
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    const { updateJob, deleteJob } = jobContext;
    const [onEdit, setOnEdit] = useState(false);
    const [newtag, setNewtag] = useState('');
    const [jobInfo, setJobInfo] = useState({ ...job });
    const onChange = (e) => {
        setJobInfo({ ...jobInfo, [e.target.name]: e.target.value });
    };
    const onAddingTag = () => {
        setJobInfo({ ...jobInfo, tags: [...jobInfo.tags, newtag] });
        setNewtag('');
    };
    const onSubmit = (e) => {
        e.preventDefault();
        updateJob(jobInfo);
    };

    const onDelete = () => {
        deleteJob(job._id);
    };

    const editing = (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                onChange={onChange}
                                value={jobInfo.title}
                                name="title"
                                placeholder="Title"
                                type="text"
                            ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                onChange={onChange}
                                value={jobInfo.company}
                                name="company"
                                placeholder="Company"
                                type="text"
                            ></Form.Control>
                        </Col>
                        <Col xs="auto">
                            <Form.Control
                                onChange={onChange}
                                value={jobInfo.location}
                                name="location"
                                placeholder="Location"
                                type="text"
                            ></Form.Control>
                        </Col>
                    </Form.Row>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    <Form.Row>
                        <Col xs="auto">
                            <Form.Control
                                onChange={(e) => {
                                    setNewtag(e.target.value);
                                }}
                                value={newtag}
                                name="tag"
                                placeholder="New tag"
                                type="text"
                            ></Form.Control>
                        </Col>
                        <Col xs="auto">
                            <Button variant="secondary" onClick={onAddingTag}>
                                Add a tag
                            </Button>
                        </Col>
                    </Form.Row>
                </Card.Subtitle>
                {jobInfo.tags.map((tag, index) => (
                    <Badge
                        key={index}
                        variant="warning"
                        className="mr-2"
                        onClick={() => {
                            setJobInfo({
                                ...jobInfo,
                                tags: jobInfo.tags.map((t) =>
                                    t === tag ? null : t
                                ),
                            });
                        }}
                    >
                        {tag}
                    </Badge>
                ))}
                <Form.Text id="passwordHelpBlock" muted>
                    {' '}
                    Click a tag to delete it
                </Form.Text>
                <Card.Text>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        onChange={onChange}
                        value={jobInfo.description}
                        name="description"
                        placeholder="Description"
                        type="text"
                    ></Form.Control>
                </Card.Text>
                <a
                    className="btn btn-info mr-2 btn-sm"
                    href={jobInfo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Details
                </a>
                <Button
                    size="sm"
                    variant="dark mr-2"
                    onClick={(e) => {
                        setOnEdit((prevState) => !prevState);
                        onSubmit(e);
                    }}
                >
                    Save
                </Button>
                <Button size="sm" variant="outline-danger" onClick={onDelete}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );

    const card = (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>
                    {job.title} -{' '}
                    <span className="text-muted font-weight-light">
                        {job.company}
                    </span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    {job.location}
                </Card.Subtitle>
                {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="mr-2">
                        {tag}
                    </Badge>
                ))}
                <Card.Text>{job.description}</Card.Text>
                <a
                    className="btn btn-info mr-2 btn-sm"
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Details
                </a>

                {isAuthenticated && (
                    <Button
                        size="sm"
                        variant="dark mr-2"
                        onClick={() => setOnEdit((prevState) => !prevState)}
                    >
                        Edit
                    </Button>
                )}
                {isAuthenticated && (
                    <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
    return (
        <Fragment>
            {onEdit ? (isAuthenticated ? editing : card) : card}
        </Fragment>
    );
};

export default Job;
