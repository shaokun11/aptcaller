// const modulesFiles = import.meta.glob("./modules/*.*");
// const modules: any = {};
// for (const key in modulesFiles) {
//   const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, "$2");
//   const value = modulesFiles[key];
//   modules[moduleName] = value;
//   console.log("modules=", modules);
// }

// export default modules;

import { defineStore } from "pinia";

const store = defineStore("userStore", {});

export default store;
