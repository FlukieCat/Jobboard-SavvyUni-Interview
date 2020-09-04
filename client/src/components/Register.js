import React, { useState, useContext, useEffect, Fragment } from 'react';
import AuthContext from '../context/auth/authContext';
import { Form, Button } from 'react-bootstrap';

const Register = (props) => {
    const authContext = useContext(AuthContext);

    const { register, error, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            // redirect to the home page after registration
            props.history.push('/');
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        password: '',
        password2: '',
    });

    const { name, password, password2 } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        register({
            name,
            password,
        });
    };

    return (
        <Fragment>
            <div className="h1">Account Register</div>
            <Form className="mt-3" onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="name"
                        placeholder="Username"
                        type="text"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Fragment>
    );
};

export default Register;
