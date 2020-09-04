import React, { useContext, useEffect, Fragment, useState } from 'react';
import AuthContext from '../context/auth/authContext';
import JobContext from '../context/job/jobContext';
import Job from './Job';
import SearchBar from './SearchBar';
import JobsPagination from './JobsPagination';

const Home = () => {
    const authContext = useContext(AuthContext);
    const jobContext = useContext(JobContext);

    const { jobs, getJobs, hasNextPage } = jobContext;
    const { isAuthenticated, user } = authContext;

    const [keywords, setKeywords] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

    const onSearch = (e) => {
        e.preventDefault();
        getJobs(keywords, page, limit);
    };

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getJobs(keywords, page, limit);
        // eslint-disable-next-line
    }, [page, keywords, limit]);

    return (
        <Fragment>
            <SearchBar
                keywords={keywords}
                setKeywords={setKeywords}
                onSubmit={onSearch}
            />
            <JobsPagination
                page={page}
                setPage={setPage}
                hasNextPage={hasNextPage}
            />
            <div className="jobboard">
                {isAuthenticated &&
                    jobs
                        .filter(
                            (job) =>
                                job.dislikes
                                    .map((dis) => dis.user)
                                    .includes(user._id) === false
                        )
                        .map((job) => {
                            return <Job key={job._id} job={job} />;
                        })}
                {!isAuthenticated &&
                    jobs.map((job) => {
                        return <Job key={job._id} job={job} />;
                    })}
            </div>
            <JobsPagination page={page} setPage={setPage} />
        </Fragment>
    );
};

export default Home;
