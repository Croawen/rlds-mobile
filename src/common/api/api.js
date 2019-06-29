import wretch from "wretch";
import applyTokenAction from "./helpers/apply-token-action";
import store from "../../redux/store";

export const apiUrl = "http://teampusheenapp.hostingasp.pl/api";

export const api = {
  noAuth: () =>
    wretch()
      .content("application/json")
      .catcher(401, (err, req) => {}),

  withAuth: async () =>
    wretch()
      .content("application/json")
      .auth(await applyTokenAction())
      .catcher(440, () => {
        store.dispatch.currentUser.logOut();
      }),

  noContentAuth: () => wretch().auth(applyTokenAction())
};
