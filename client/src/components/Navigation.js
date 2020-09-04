import React, { useContext, Fragment } from 'react';
import AuthContext from '../context/auth/authContext';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Job Board</Navbar.Brand>
            <Nav className="ml-auto">
                {user && (
                    <Navbar.Text className="text-light">
                        {user.name}
                    </Navbar.Text>
                )}
                <Nav.Link href="#" onClick={onLogout}>
                    Log Out
                </Nav.Link>
            </Nav>
        </Navbar>
    );

    const guestLinks = (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Job Board</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        </Navbar>
    );
    return <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>;
};

export default Navigation;
