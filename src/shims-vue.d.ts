/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace NodeJS{
  interface Global {
    rtcEngine: any;
    document: Document;
    window: Window;
    navigator: Navigator;
  }
}
