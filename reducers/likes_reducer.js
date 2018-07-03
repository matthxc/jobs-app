import { uniqBy } from 'lodash';
import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case CLEAR_LIKED_JOBS:
      return [];
    case LIKE_JOB:
      return uniqBy([action.payload, ...state], 'jobkey');
    default:
      return state;
  }
};
