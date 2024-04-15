import { App, defineAsyncComponent } from "vue";
export default {
  install(app: App) {
    const components = import.meta.glob("./*/*.vue");
    console.group("global component name");

    for (const [key, value] of Object.entries(components)) {
      const componentName = "GB-" + key.replace("./", "").split("/")[0];
      console.log("componentName-", componentName);
      app.component(componentName, defineAsyncComponent(value as any));
    }
    console.groupEnd();
  },
};
