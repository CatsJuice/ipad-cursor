import { ViteSSG } from "vite-ssg";
import "virtual:uno.css";
import "./style.css";
import App from "./App.vue";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/base16/darcula.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import vue from 'vue-highlight.js/lib/languages/vue';
import { ipadCursorPlugin } from "../../src/vue";


hljs.registerLanguage("js", javascript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("vue", vue);

// createApp(App).mount('#app')
export const createApp = ViteSSG(
  App,
  {
    routes: [{ path: "/", component: () => import("./pages/index.vue") }],
  },
  (ctx) => {
    ctx.app.use(hljsVuePlugin);
    ctx.app.use(autoAnimatePlugin);
    ctx.app.use(ipadCursorPlugin, {
      enableMouseDownEffect: true,
      enableAutoTextCursor: true,
      enableLighting: true,
      normalStyle: {
        scale: 1,
      },
      blockPadding: "auto",
      blockStyle: {
        radius: "auto",
      },
    })
  }
);
