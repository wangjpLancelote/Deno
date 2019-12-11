import router from "./router/index";
import store from "./store/index";

/**
 * 路由守卫
 * 路由进入前的判断。鉴权
 */
router.beforeEach(async (to, from, next) => {
  if (to.path === "/login") {
    next();
    return;
  }

  if (localStorage.token) {
    // const role = store.state.menu
  } else {
    next({
      // path: '/login'
      path: "/"
    });
  }
});
