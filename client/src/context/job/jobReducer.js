import {
    GET_JOBS,
    UPDATE_JOB,
    DELETE_JOB,
    JOB_ERROR,
    MAKE_REQUEST,
} from '../types';

export default (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_JOBS:
            return {
                ...state,
                jobs: [...payload.jobs],
                hasNextPage: payload.hasNextPage,
                loading: false,
            };
        case UPDATE_JOB:
            return {
                ...state,
                jobs: state.jobs.map((job) =>
                    job._id === payload._id ? payload : job
                ),
                loading: false,
            };
        case DELETE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter((job) => job._id !== payload._id),
                loading: false,
            };
        case JOB_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};
