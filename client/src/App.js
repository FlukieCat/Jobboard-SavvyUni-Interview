import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import JobState from './context/job/JobState';
import AuthState from './context/auth/AuthState';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Login from './components/Login';

import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
function App() {
    return (
        <AuthState>
            <JobState>
                <Router>
                    <Fragment>
                        <Navigation />
                        <Container>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route
                                    exact
                                    path="/register"
                                    component={Register}
                                />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </Container>
                    </Fragment>
                </Router>
            </JobState>
        </AuthState>
    );
}

export default App;
