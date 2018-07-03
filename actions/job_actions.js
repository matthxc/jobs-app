import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import {
  FAIL_FETCH_JOBS,
  IS_FETCHING_JOBS,
  LOAD_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS,
} from './types';
import fakeData from './fakeData';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript',
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({
    ...JOB_QUERY_PARAMS,
    l: zip,
  });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region) => async (dispatch) => {
  dispatch({
    type: IS_FETCHING_JOBS,
  });
  try {
    const zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    const { data } = await axios.get(url);
    console.log(data);
    await setTimeout(() => false, 500);
    dispatch({
      type: LOAD_JOBS,
      payload: fakeData(region).results,
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: FAIL_FETCH_JOBS,
    });
  }
};

export const likeJob = (job) => ({
  type: LIKE_JOB,
  payload: job,
});

export const clearLikedJobs = () => ({
  type: CLEAR_LIKED_JOBS,
});
