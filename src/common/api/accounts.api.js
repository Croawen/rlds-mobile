import { api, apiUrl, unauthorizedCatcher } from "./api";

export const getAccounts = async (page = 0, pageSize = 10) =>
  (await api.withAuth())
    .url(`${apiUrl}/accounts?pageNumber=${page}&pageSize=${pageSize}`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).get().json()
    )
    .get()
    .json();

export const createAccount = async ({
  currency,
  groupId,
  name,
  description,
  balance
}) => {
  const data = {
    group: groupId,
    currency: currency,
    name,
    balance,
    description
  };
  return (await api.withAuth())
    .url(`${apiUrl}/accounts`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).post(data).res()
    )
    .post(data)
    .res();
};

export const updateAccount = async (accountId, { name, description }) => {
  const data = {
    name,
    description
  };
  return (await api.withAuth())
    .url(`${apiUrl}/accounts/${accountId}`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).patch(data).res()
    )
    .patch(data)
    .res();
};

export const getAccount = async accountId =>
  (await api.withAuth())
    .url(`${apiUrl}/accounts/${accountId}`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).get().json()
    )
    .get()
    .json();

export const deleteAccount = async accountId =>
  (await api.withAuth())
    .url(`${apiUrl}/accounts/${accountId}`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).delete().res()
    )
    .delete()
    .res();
