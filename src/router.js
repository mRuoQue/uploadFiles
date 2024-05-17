import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import uploadFile from "./pages/index.vue";
import sourceMap from "./pages/sourceMap.vue";

const routes = [
  {
    path: "/",
    component: uploadFile,
    name: "UploadFile",
  },
  {
    path: "/SourceMap",
    component: sourceMap,
    name: "SourceMap",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
