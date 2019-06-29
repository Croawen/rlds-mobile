import { api, apiUrl } from "./api";

export const getGroups = async () =>
  (await api.withAuth())
    .url(`${apiUrl}/v1/groups/`)
    .get()
    .json();

export const getGroup = async groupId =>
  (await api.withAuth())
    .url(`${apiUrl}/v1/groups/${groupId}`)
    .get()
    .json();
