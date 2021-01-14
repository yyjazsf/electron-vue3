import { session, CookiesSetDetails } from "electron";

export const Cookie = {
  get(param = {}) {
    return session.defaultSession.cookies.get(param).catch(error => {
      console.log(error);
    });
  },
  set(cookie: CookiesSetDetails) {
    return session.defaultSession.cookies.set(cookie).catch(error => {
      console.log(error);
    });
  }
};

export default {
  Cookie
};
