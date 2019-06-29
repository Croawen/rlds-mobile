import { api, apiUrl } from "./api";

export const getCategories = async () =>
  await api
    .withAuth()
    .url(`${apiUrl}/v1/categories/`)
    .get()
    .json();
