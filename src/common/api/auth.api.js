import { api, apiUrl } from "./api";

export const logInUser = async ({ login, password }) =>
  await api
    .noAuth()
    .url(`${apiUrl}/v1/users/authenticate`)
    .post({ login, password })
    .json();

export const register = async ({ login, password, email }) =>
  await api
    .noAuth()
    .url(`${apiUrl}/v1/users`)
    .post({
      login,
      password,
      email,
      firstName: "",
      lastName: "",
      avatarPath: ""
    })
    .json();
