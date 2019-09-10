import { api, apiUrl, unauthorizedCatcher } from "./api";

export const getGroups = async () =>
  (await api.withAuth())
    .url(`${apiUrl}/groups`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).get().json()
    )
    .get()
    .json();

export const getGroup = async groupId =>
  (await api.withAuth())
    .url(`${apiUrl}/groups/${groupId}`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).get().json()
    )
    .get()
    .json();

export const createGroup = async ({ name, description }) => {
  const data = { name, description };
  return (await api.withAuth())
    .url(`${apiUrl}/groups`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).post(data).res()
    )
    .post(data)
    .res();
};
