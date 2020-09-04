import React, { useReducer } from 'react';
import axios from 'axios';
import JobContext from './jobContext';
import jobReducer from './jobReducer';
import {
    GET_JOBS,
    UPDATE_JOB,
    JOB_ERROR,
    MAKE_REQUEST,
    DELETE_JOB,
} from '../types';

const JobState = (props) => {
    const initialState = {
        jobs: [],
        hasNextPage: true,
        loading: true,
        error: null,
    };
    const [state, dispatch] = useReducer(jobReducer, initialState);

    // Get jobs
    const getJobs = async (keywords, page, limit) => {
        let query = '?';
        if (keywords) query = query + `keywords=${keywords}&`;
        if (page) query = query + `page=${page}&`;
        if (limit) query = query + `limit=${limit}&`;
        query = query.slice(0, -1);
        try {
            dispatch({ type: MAKE_REQUEST });
            const res = await axios.get(`/api/jobs${query}`);
            dispatch({ type: GET_JOBS, payload: res.data });
        } catch (error) {
            dispatch({ type: JOB_ERROR, payload: error.response.msg });
        }
    };

    // Update a job
    const updateJob = async (jobInfo) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            dispatch({ type: MAKE_REQUEST });
            const res = await axios.put(
                `/api/jobs/${jobInfo._id}`,
                jobInfo,
                config
            );
            dispatch({ type: UPDATE_JOB, payload: res.data });
        } catch (error) {
            dispatch({ type: JOB_ERROR, payload: error.response.msg });
        }
    };

    // Delete a job
    const deleteJob = async (jobId) => {
        try {
            const res = await axios.put(`/api/jobs/delete/${jobId}`);
            dispatch({
                type: DELETE_JOB,
                payload: res.data,
            });
        } catch (error) {
            dispatch({ type: JOB_ERROR, payload: error.response.msg });
        }
    };

    return (
        <JobContext.Provider
            value={{
                jobs: state.jobs,
                hasNextPage: state.hasNextPage,
                loading: state.loading,
                error: state.error,
                getJobs,
                updateJob,
                deleteJob,
            }}
        >
            {props.children}
        </JobContext.Provider>
    );
};

export default JobState;
