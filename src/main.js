import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import "./css/tailwind.css";
import "./css/cards.css";
import "./css/main.css";

const app = createApp(App);
app.use(store);
app.mount("#app");
