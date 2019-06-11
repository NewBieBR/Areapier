import fetch from "cross-fetch";
import Area from "../constants/Area";

function myFetch(route, method, { data, headers, done }) {
  fetch(Area.apiEntry + route, {
    method: method,
    body: JSON.stringify(data),
    headers: Object.assign(
      {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      headers
    ),
    credentials: "same-origin"
  }).then(
    res => {
      if (done) {
        try {
          var resdata = JSON.parse(res._bodyText);
          done(Object.assign(res, resdata));
        } catch {
          done(res);
        }
      }
    },
    err => console.error(err)
  );
}

export default {
  get(route, params) {
    myFetch(route, "GET", params);
  },

  post(route, params) {
    myFetch(route, "POST", params);
  },

  put(route, params) {
    myFetch(route, "PUT", params);
  },

  delete(route, params) {
    myFetch(route, "DELETE", params);
  }
};
