import config from '../config';
import TokenService from './token-service';

const LevelApiService = {
  getLevel() {
    return fetch(`${config.API_ENDPOINT}/levels/random`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
};

export default LevelApiService;
