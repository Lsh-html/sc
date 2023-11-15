import { isType } from "./util";
import router from "@/router";
import { useTestStore } from "@/store/index";


export function setRouter() {
  // 引入 views 文件夹下所有 vue 文件
  const modules = import.meta.glob("@/views/**/*.vue");
  // const router = useRouter();
  if (!useTestStore().rou) {
    return
  }
  const authority = JSON.parse(useTestStore().rou)
  // console.log(authority);

  authority.forEach((e: any) => {
    // console.log(e);

    if (e.children) {
      e.component = modules["/src/views" + e.component + ".vue"];
      e.children.forEach((item: any) => {
        item.component = modules["/src/views" + item.component + ".vue"];
      });
      router.addRoute(e);
    } else {
      if (e.component && isType(e.component) == "string") {
        e.component = modules["/src/views" + e.component + ".vue"];
      }
      router.addRoute(e);
    }
  });
  // console.log(router.getRoutes());

}