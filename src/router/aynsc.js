//
const dept = {
  path: "/system/dept",
  component: () => import("@/views/system/dept"),
  meta: { title: "机构管理", father: "系统管理" },
};
const user = {
  path: "/system/user",
  component: () => import("@/views/system/user"),
  meta: { title: "用户管理", father: "系统管理" },

};
const permission = {
  path: "/system/permission",
  component: () => import("@/views/system/permission"),
};
const roles = {
  path: "/system/roles",
  component: () => import("@/views/system/roles"),
};
const white = {
  path: "/system/white",
  component: () => import("@/views/system/white"),
};
//
const params = {
  path: "/assess/params",
  component: () => import("@/views/assess/params"),
};
const type = {
  path: "/assess/type",
  component: () => import("@/views/assess/type"),
};
const score = {
  path: "/assess/score",
  component: () => import("@/views/assess/score"),
};
//
const NotFound = { path: "*", component: () => import("@/views/404") };
//
const deptP = {
  path: "/police/dept",
  component: () => import("@/views/police/dept"),
};
const scoreP = {
  path: "/police/score",
  component: () => import("@/views/police/score"),
};
const msg = {
  path: "/police/msg",
  component: () => import("@/views/police/msg"),
};
//
const task = {
  path: "/assessment/task",
  component: () => import("@/views/assessment/task"),
};
const update = {
  path: "/assessment/update",
  component: () => import("@/views/assessment/update"),
};
const details = {
  path: "/assessment/details",
  component: () => import("@/views/assessment/details"),
};
const scoreA = {
  path: "/assessment/score",
  component: () => import("@/views/assessment/score"),
};
//
const control = {
  path: "/notice/control",
  component: () => import("@/views/notice/control"),
};
const updateN = {
  path: "/notice/update",
  component: () => import("@/views/notice/update"),
};
//
const detailsR = {
  path: "/ranking/details",
  component: () => import("@/views/ranking/details"),
};
const controlR = {
  path: "/ranking/control",
  component: () => import("@/views/ranking/control"),
};
const meanscore = {
  path: "/ranking/meanscore",
  component: () => import("@/views/ranking/meanscore"),
};
const scorerank = {
  path: "/ranking/scorerank",
  component: () => import("@/views/ranking/scorerank"),
};

const asyncRouetr = {
  "/system/dept": dept,
  "/system/user": user,
  "/system/permission": permission,
  "/system/roles": roles,
  "/system/white": white,
  "*": NotFound,
  "/assess/params": params,
  "/assess/type": type,
  "/assess/score": score,
  "/police/dept": deptP,
  "/police/score": scoreP,
  "/police/msg": msg,
  "/assessment/task": task,
  "/assessment/update": update,
  "/assessment/details": details,
  "/assessment/score": scoreA,
  "/notice/control": control,
  "/notice/update": updateN,
  "/ranking/details": detailsR,
  "/ranking/control": controlR,
  "/ranking/meanscore": meanscore,
  "/ranking/scorerank": scorerank,
};

export default asyncRouetr;
