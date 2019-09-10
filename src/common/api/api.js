import wretch from "wretch";
import store from "../../redux/store";
import applyTokenAction from "./helpers/apply-token-action";
import refreshTokenAction from "./helpers/refresh-token-action";

export const apiUrl = "http://rlds-api.herokuapp.com";

export const unauthorizedCatcher = async (err, originalRequest) => {
  const newAuthData = await refreshTokenAction();

  if (!newAuthData) {
    store.dispatch.currentUser.logOut();
    throw err;
  }

  return originalRequest
    .auth(newAuthData.token)
    .catcher(401, (err, req) => store.dispatch.currentUser.logOut());
};

export const api = {
  noAuth: () =>
    wretch()
      .content("application/json")
      .catcher(401, (err, req) => {}),

  withAuth: async () =>
    wretch()
      .content("application/json")
      .auth(await applyTokenAction()),

  noContentAuth: () => wretch().auth(applyTokenAction())
};
