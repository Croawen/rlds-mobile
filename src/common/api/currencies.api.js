import { api, apiUrl } from "./api";

export const getCurrencies = async () =>
  (await api.withAuth())
    .url(`${apiUrl}/v1/currencies/`)
    .get()
    .json();
