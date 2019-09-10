import produce from "immer";
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser
} from "../common/storage";
import { logInUser } from "../common/api/auth.api";
export const currentUserModel = {
  state: {
    authData: null
  },

  reducers: {
    setCurrentUserAuthData(state, payload) {
      return produce(state, draft => {
        draft.authData = payload;
      });
    },

    clearUser(state, payload) {
      return produce(state, draft => {
        draft.authData = null;
      });
    }
  },

  effects: dispatch => ({
    async logIn({ login, password }) {
      const res = await logInUser({ login, password });
      if (res) {
        await setCurrentUser(res);
        this.setCurrentUserAuthData(res);
      }

      return res;
    },

    async logOut() {
      this.clearUser();
      await clearCurrentUser();
    }
  })
};
