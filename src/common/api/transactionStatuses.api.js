import { api, apiUrl } from "./api";

export const getTransactionStatuses = async () => {
  try {
    return await api
      .withAuth()
      .url(`${apiUrl}/v1/transactionstatuses/`)
      .get()
      .json();
  } catch (e) {
    console.log("getTransactionStatuses error:", e);
  }
};
