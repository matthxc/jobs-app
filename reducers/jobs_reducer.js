import { IS_FETCHING_JOBS, FAIL_FETCH_JOBS, LOAD_JOBS } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_JOBS:
      return { ...INITIAL_STATE, data: action.payload };
    case IS_FETCHING_JOBS:
      return { ...INITIAL_STATE, isLoading: true };
    case FAIL_FETCH_JOBS:
      return { ...INITIAL_STATE, error: true };
    default:
      return state;
  }
};
