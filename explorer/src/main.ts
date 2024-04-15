// Import the createApp function from Vue
import { createApp } from "vue";
// Import the main App component
import App from "./App.vue";

// Import the createPinia function from pinia for state management
import { createPinia } from "pinia";

// Import filters from the utils directory
import filters from "@/utils/filters";

// Import the router configuration
import router from "@/router";

// import JsonViewer from "vue3-json-viewer";
// import "vue3-json-viewer/dist/index.css"; // 

import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";


// Create a new Vue application instance
const app = createApp(App);

app.use(JsonViewer)

// Use the router in the application
app.use(router);

// Import the VueClipboard plugin for clipboard functionality
import VueClipboard from "vue3-clipboard";
// Use the VueClipboard plugin in the application
app.use(VueClipboard, {
  autoSetContainer: true, // Automatically set the container for the clipboard
  appendToBody: true, // Append the clipboard to the body of the document
});

// Import a mixin from the utils directory
import mixin from "@/utils/mixin";

// Use the mixin in the application
app.mixin(mixin);

// Import a custom component from the components directory
import myComponent from "@/components/index";
// Use the custom component in the application
app.use(myComponent);

// Attach the filters to the global properties of the application
// This makes them available in all components
app.config.globalProperties.$filters = filters;

// Create a new pinia instance for state management
const pinia = createPinia();
// Use the pinia instance in the application
app.use(pinia);

// Import the API
import api from "@/api";
// Attach the API to the global properties of the application
app.config.globalProperties.$api = api;

// Import Ant Design Vue and its styles
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "@/styles/index.scss";
// Use Ant Design Vue in the application
app.use(Antd);

// Mount the application to the HTML element with the id "app"
app.mount("#app");