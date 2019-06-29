import { api, apiUrl } from "./api";

export const getTransactions = async (page = 1) =>
  (await api.withAuth())
    .url(`${apiUrl}/v1/transactions/?PageNumber=` + page)
    .get()
    .json();

export const getFilteredTransactions = async (page = 1, filter) => {
  const filterString = createFilterString(filter);
  return (await api.withAuth())
    .url(`${apiUrl}/v1/transactions/?PageNumber=` + page + filterString)
    .get()
    .json();
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const addFilter = (filter, key) => {
  return filter[key] ? `&${capitalizeFirstLetter(key)}=${filter[key]}` : null;
};

const createFilterString = filter => {
  return [
    "sourceAccountId",
    "targetAccountId",
    "minAmount",
    "maxAmount",
    "categoryId",
    "description",
    "transactionStatusId"
  ]
    .filter(e => filter[e])
    .map(e => addFilter(filter, e))
    .join("");
};
