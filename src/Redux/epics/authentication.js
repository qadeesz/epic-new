import {
  loginFailed,
  loginSuccess,
  loginLoading
} from "../actions/authentication";
import { baseUrl, verifyToken } from "../../shared";
import store from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const loginEpic = creds => dispatch => {
  dispatch(loginLoading());
  fetch(baseUrl + "users/login", {
    method: "POST",
    body: JSON.stringify(creds),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 401) {
        const err = new Error("Invalid Username Or Password");
        throw err;
      }
      const err = new Error(res.status + " : " + res.statusText);
      throw err;
    })
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.token);
      dispatch(loginSuccess(verifyToken(res.token)));
    })
    .catch(err => {
      toast.error(err.message, { position: toast.po });
      dispatch(loginFailed(err.message));
    });
};

export const signupEpic = info => {
  fetch(baseUrl + "users/signup", {
    method: "POST",
    body: JSON.stringify(info),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      const err = new Error(res.status + " : " + res.statusText);
      throw err;
    })
    .then(res => {
      console.log(res.token);
      localStorage.setItem("token", res.token);
      store.dispatch(dis => dis(loginSuccess(verifyToken(res.token))));
    })
    .catch(err => console.log(err) || alert(err.message));
};
