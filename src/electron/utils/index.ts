import { session, CookiesSetDetails } from "electron";

export const Cookie = {
  get(param = {}) {
    return session.defaultSession.cookies.get(param).catch(error => {
      console.log(error);
    });
  },
  set(cookie: CookiesSetDetails | CookiesSetDetails[]) {
    if(Array.isArray(cookie)) {
        if(!cookie.length) {
          return Promise.resolve([])
        }
        const request: Promise<any>[] = []
        cookie.forEach(req => {
            request.push(session.defaultSession.cookies.set(req))
        })
        return Promise.allSettled(request)
    } 
    // Promise.allSettled 处理多个请求
    return session.defaultSession.cookies.set(cookie).catch(error => {
      console.log(error);
    });
  }
};

export default {
  Cookie
};
