import { api, apiUrl } from "./api";

export const getAccounts = async (page = 1, pageSize = 100) =>
  (await api.withAuth())
    .url(`${apiUrl}/v1/accounts/?PageNumber=${page}&PageSize=${pageSize}`)
    .get()
    .json();

export const createAccount = async ({
  currencyId,
  groupId,
  name,
  startAmount
}) =>
  (await api.withAuth())
    .url(`${apiUrl}/v1/accounts`)
    .post({
      group: { groupId },
      currency: { currencyId },
      name,
      startAmount
    })
    .res();

export const getAccount = async accountId =>
  (await api.withAuth())
    .url(`${apiUrl}/v1/accounts/${accountId}`)
    .get()
    .json();
