import { api, apiUrl } from "./api";
import store from "../../redux/store";

export const logInUser = async ({ login, password }) =>
  await api
    .noAuth()
    .url(`${apiUrl}/auth/login`)
    .post({ login, password })
    .json();

export const refreshToken = async ({ token }) =>
  await api
    .noAuth()
    .url(`${apiUrl}/auth/refresh`)
    .catcher(460, (err, req) => {
      store.dispatch.currentUser.logOut();
    })
    .post({ token })
    .json();

export const register = async ({ login, password }) =>
  await api
    .noAuth()
    .url(`${apiUrl}/users`)
    .post({
      login,
      password
    })
    .res();
