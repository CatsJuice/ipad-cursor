import { ViteSSG } from "vite-ssg";
import "virtual:uno.css";
import "./style.css";
import App from "./App.vue";

// createApp(App).mount('#app')
export const createApp = ViteSSG(App, {
  routes: [
    { path: "/", component: () => import("./pages/index.vue") },
  ]
});
