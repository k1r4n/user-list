import axios from 'axios';
import Promise from 'bluebird';
Promise.config({
  // Enable cancellation
  cancellation: true,
});

export default function() {
  return new Promise((resolve, reject, onCancel) => {
    const h = {};
    h['Content-Type'] = 'application/json';
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    onCancel(() => {
      source.cancel('Operation canceled by the user.');
    });
    axios({
      method: 'GET',
      headers: h,
      url: 'https://randomuser.me/api/?results=100',
      cancelToken: source.token,
    }).then((response) => {
      resolve(response.data);
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.warn(e.message); // eslint-disable-line no-console
      } else {
        if (e.response) {
          if (e.response.status === 500) {
            window.location.href = 'http://localhost:7000/login';
          }
        }
        reject(e);
      }
    });
  });
}
