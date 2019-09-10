import { api, apiUrl, unauthorizedCatcher } from "./api";

export const getTransactions = async (pageNumber = 0, pageSize = 10) =>
  (await api.withAuth())
    .url(`${apiUrl}/transactions?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).get().json()
    )
    .get()
    .json();

export const createTransaction = async data =>
  (await api.withAuth())
    .url(`${apiUrl}/transactions`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest))
        .post(
          ({
            sourceAccount,
            targetAccount,
            title,
            type,
            category,
            amount
          } = data)
        )
        .res()
    )
    .post(
      ({ sourceAccount, targetAccount, title, type, category, amount } = data)
    )
    .res();

export const getCategories = async () =>
  (await api.withAuth())
    .url(`${apiUrl}/transactions/categories`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).get().json()
    )
    .get()
    .json();

export const getTransaction = async transactionId =>
  (await api.withAuth())
    .url(`${apiUrl}/transactions/${transactionId}`)
    .catcher(401, async (err, originalRequest) =>
      (await unauthorizedCatcher(err, originalRequest)).get().json()
    )
    .get()
    .json();
